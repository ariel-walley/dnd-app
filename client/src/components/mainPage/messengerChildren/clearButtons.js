import React, { useState, useContext } from 'react';
import { ClearCheckboxesContext } from '../../../context';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import styled from 'styled-components';

export default function ClearButtons() {
  const { clearCheckboxes, toggleClearCheckboxes } = useContext(ClearCheckboxesContext);
   
  const handleChange = (e, key) => {
    toggleClearCheckboxes({...clearCheckboxes, [key]: !clearCheckboxes[key]});
  }

  return (
    <FormGroup>
      <FormControlLabel 
        control={<Checkbox 
          checked={clearCheckboxes.clearText} 
          onChange={(event) => handleChange(event, 'clearText')}
          inputProps={{ 'aria-label': 'controlled' }}
        />} 
        label="Clear text" />
      <FormControlLabel 
        control={<Checkbox 
          checked={clearCheckboxes.clearAll} 
          onChange={(event) => handleChange(event, 'clearAll')}
          inputProps={{ 'aria-label': 'controlled' }}
        />} 
        label="Clear all" />
    </FormGroup>
  );
}