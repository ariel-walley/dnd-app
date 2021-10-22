import React, { useState, useContext } from 'react';
import PlayersContext from '../../context';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function MessengerCheckboxes() {
  const { players } = useContext(PlayersContext);
  const [checked, setChecked] = useState([false, false, false]);

  const handleChangeParent = (event) => {
    setChecked([event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChangeChild = (e, index) => {
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

  return (
    <div>
      <FormControlLabel
        label="All"
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
}
