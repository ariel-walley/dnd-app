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

  const handleChangeChild = (e, count) => {
    let index = e.target.id.slice(0, 1);
    let localChecked = JSON.parse(JSON.stringify(checked));
    localChecked[index] = !checked[index];
    setChecked(localChecked);    
  };

  const generateChildren = () => {
    let display = [];
    let count = 0;

    Object.values(players).forEach((player) => {
      display.push(
        <FormControlLabel
            label={player}
            key={player + 'FormControlLabel'}
            control={<Checkbox 
                key={player + 'Checkbox'} 
                id={count + 'Checkbox'} 
                checked={checked[count]} 
                onChange={(e) => handleChangeChild(e, count)} />}
        />);
      count++;
    })

    return display;
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {generateChildren()}
    </Box>
  );

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
      {children}
    </div>
  );
}
