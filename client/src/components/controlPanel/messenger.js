import React, { useState, useContext } from 'react';
import PlayersContext from '../../context';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { io } from 'socket.io-client';

import styled from 'styled-components';
import { Container } from '../../styles';

/*    STYING    */

const UpdatedContainer = styled(Container)`
  height: 50%;
  margin: 15px;
  background-color: #202021
`;


const StyledInput = styled.input`
  width: 250px;
`;

export default function Messenger() {
  const { players } = useContext(PlayersContext);
  const [inputValue, setInputValue] = useState('Hello world');
  const [checked, setChecked] = useState(Object.keys(players).map(() => false));
  
  /*    CHECKBOXES    */

  const handleChangeParent = (event) => { // Handle the "All Players" select/unselect all feature
    setChecked(Object.keys(players).map(() => event.target.checked));
  };

  const handleChangeChild = (e, index) => { // Handle the individual player checkboxes
    let localChecked = checked.slice(0);
    localChecked[index] = !checked[index];
    setChecked(localChecked);    
  };

  const generateChildren = Object.values(players).map((player, index) => 
  <FormControlLabel
      label={player}
      key={player + 'FormControlLabel'}
      control={<Checkbox 
          key={player + 'Checkbox'} 
          id={index + 'Checkbox'} 
          checked={checked[index]} 
          onChange={(e) => handleChangeChild(e, index)} />}
  />
)

  const MessengerCheckboxes = (
    <div>
      <FormControlLabel
        label="All Players"
        control={
          <Checkbox
            checked={ checked.indexOf(false) === -1 }
            indeterminate={ checked.indexOf(true) !== -1 && checked.indexOf(false) !== -1 }
            onChange={handleChangeParent}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {generateChildren}
      </Box>
    </div>
  );

  /*    REST OF MESSENGER COMPONENT    */

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

    if (event.code === "Enter" || event.code === "NumpadEnter" || event.key === "Enter" || event.keyCode === "13") {
      document.getElementById("submit-button").click();
    }
  }

  const sendMessage = (event) => {
    const playerNumbers = checked.reduce((acc, el, i) => (el ? [...acc, i + 1] : acc), []);

    if (playerNumbers.length > 0) {
      console.log('Submitted: "' + inputValue + '" -> Player(s): ' + playerNumbers);

      const socket = io.connect('http://localhost:3100/');
  
      socket.emit("displayBasicText", JSON.stringify({
        contentType: 'message',
        content: inputValue,
        playerNumbers: playerNumbers,
        playerNames: playerNumbers.map(playerNum => players['Player' + playerNum]),
        timestamp: Date()
      }), (data) => {
        console.log(data)
        socket.disconnect();
      })
      event.preventDefault(); 
    }

    // Reset text input and checkboxes after submission
    setInputValue('');
    setChecked(Object.keys(players).map(() => false));

  }

  return(
    <UpdatedContainer>
      <StyledInput type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleInputChange} />
      {MessengerCheckboxes}
      <input id="submit-button" onClick={sendMessage} type="button" value="Send" />
    </UpdatedContainer>
  )
}