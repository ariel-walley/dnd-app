import { useContext } from 'react';
import { PlayersContext, MessageContext } from '../../../context';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

export default function PlayerCheckboxes() {
  const { players } = useContext(PlayersContext);
  const { message, updateMessage } = useContext(MessageContext);

  const handleChangeParent = (event) => { // Handle the "All Players" select/unselect all feature
    updateMessage({...message, checkedPlayers: players.map(() => event.target.checked)})
  };

  const handleChangeChild = (e, index) => { // Handle the individual player checkboxes
    let localChecked = message.checkedPlayers.slice(0); //Creating local copy of state
    localChecked[index] = !message.checkedPlayers[index];
    updateMessage({...message, checkedPlayers: localChecked});
  };

  const generateChildren = players.map((player, index) => 
  <FormControlLabel
      label={player}
      key={player + 'FormControlLabel'}
      control={<Checkbox 
          key={player + 'Checkbox'} 
          id={index + 'Checkbox'} 
          checked={message.checkedPlayers[index]} 
          onChange={(e) => handleChangeChild(e, index)} />}
  />
)

  const MessengerCheckboxes = (
    <div>
      <FormControlLabel
        label="All Players"
        control={
          <Checkbox
            checked={ message.checkedPlayers.indexOf(false) === -1 }
            indeterminate={ message.checkedPlayers.indexOf(true) !== -1 && message.checkedPlayers.indexOf(false) !== -1 }
            onChange={handleChangeParent}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {generateChildren}
      </Box>
    </div>
  );

  return MessengerCheckboxes;
}