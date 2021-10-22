import React, { useState, useContext } from 'react';
import PlayersContext from '../../context';

import MessengerCheckboxes from './messengerCheckboxes';

import { io } from 'socket.io-client';

import styled from 'styled-components';

const StyledInput = styled.input`
  width: 250px;
`;

function Messenger() {
  const [inputValue, setInputValue] = useState('Hello world');
  const [playerNumber, setPlayerNumber] = useState('1');
  const { players } = useContext(PlayersContext);

  const handleSubmit = (event) => {
    console.log('Submitted: "' + inputValue + '" -> Player ' + playerNumber);

    const socket = io.connect('http://localhost:3100/');
    socket.emit("displayBasicText", JSON.stringify({
      message: inputValue,
      playerNumber: playerNumber,
      type: 'message'
    }), (data) => {
      console.log(data)
      socket.disconnect();
    })
    event.preventDefault();
  }

  return(
    <div>
      <StyledInput type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <p>Player Number: </p>
      <input type="text" value={playerNumber} onChange={(event) => setPlayerNumber(event.target.value)} />
      <MessengerCheckboxes/>
      <input onClick={handleSubmit} type="button" value="Send" />
    </div>
  )
}

export default Messenger;