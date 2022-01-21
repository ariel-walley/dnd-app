import React, { useContext } from 'react';
import { MessageContext, ClearCheckboxesContext } from '../../../context';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 250px;
`;

export default function TextInput() {
  const { message, updateMessage } = useContext(MessageContext);
  const { clearCheckboxes, toggleClearCheckboxes } = useContext(ClearCheckboxesContext);

  const handleInputChange = (event) => {
    let localClear = message.clear.slice(0);
    if (localClear.includes('textInput')) { // If clearText is checked, uncheck it once the text input is changed
      localClear.splice(localClear.indexOf('textInput'), 1);
      toggleClearCheckboxes({clearAll: false, clearText: false});
      updateMessage({...message, textInput: event.target.value, clear: localClear});
    } else {
      updateMessage({...message, textInput: event.target.value});
    }

    if (event.code === "Enter" || event.code === "NumpadEnter" || event.key === "Enter" || event.keyCode === "13") {
      document.getElementById("submit-button").click();
    }
  }

  return(
    <StyledInput
      type="text"
      value={message.textInput}
      onChange={(event) => updateMessage({...message, textInput: event.target.value})}
      onKeyDown={handleInputChange}
    />
  )
}
