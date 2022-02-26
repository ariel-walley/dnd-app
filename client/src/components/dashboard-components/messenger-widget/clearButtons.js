import { useContext } from 'react';
import { MessageContext, ClearCheckboxesContext } from '../../../context';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ClearButtons() {
  const { message, updateMessage } = useContext(MessageContext)
  const { clearCheckboxes, toggleClearCheckboxes } = useContext(ClearCheckboxesContext);
   
  const toggleClearText = () => {
    let newState = !clearCheckboxes.clearText;
    let localClear = message.clear.slice(0);

    toggleClearCheckboxes({...clearCheckboxes, clearText: newState});

    if (newState) { // Checking clearText
      localClear.push('textInput')
      updateMessage({...message, textInput: '', clear: localClear})
    } else { //Unchecking clearText
      localClear.splice(localClear.indexOf('textInput'), 1);
      updateMessage({...message, clear: localClear})
    }
  }

  const toggleClearAll = () => {
    let newState = !clearCheckboxes.clearAll;

    toggleClearCheckboxes({clearAll: newState, clearText: newState});

    if (newState) { // Checking clearAll
      updateMessage({...message, textInput: '', clear: ['textInput', 'background', 'filter']});
    } else { // Unchecking clearAll
      updateMessage({...message, clear: []})
    }
  }

  const checkIfClearAll = () => {
    if (message.clear.includes('textInput') && message.clear.includes('filter') && message.clear.includes('background')) {
      return true
    } else {
      return clearCheckboxes.clearAll
    }
  }

  return (
    <FormGroup>
      <FormControlLabel 
        control={<Checkbox 
          checked={clearCheckboxes.clearText} 
          onChange={(event) => toggleClearText(event, 'clearText')}
          inputProps={{ 'aria-label': 'controlled' }}
        />} 
        label="Clear text" />
      <FormControlLabel 
        control={<Checkbox 
          checked={checkIfClearAll()} 
          onChange={(event) => toggleClearAll(event, 'clearAll')}
          inputProps={{ 'aria-label': 'controlled' }}
        />} 
        label="Clear all" />
    </FormGroup>
  );
}