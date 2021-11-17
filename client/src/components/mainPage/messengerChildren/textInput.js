import React, { useContext } from 'react';
import { MessageContext } from '../../../context';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 250px;
`;

export default function TextInput() {
  const { message, updateMessage } = useContext(MessageContext);
  
  const handleInputChange = (event) => {
    updateMessage({...message, textInput: event.target.value});

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