import React, { useContext } from 'react';
import { MessageContext } from '../../../context';
import styled from 'styled-components';

const SelectContainer = styled.div`
  width: 100%;
  min-height: 50px;
`;

const SelectDiv = styled.div`
  height: 100%;
  width: 100%:
`;

const StyledContent = styled.img` 
  max-width: 50px;
  margin: 10px;
`;

export default function SelectBar() {
  const { message, updateMessage } = useContext(MessageContext);

  const renderSelected = (type) => {
    if (message[type]) { 
      return  <StyledContent 
        src={message[type]} 
        key={message[type] + 'Thumbnail'} 
        alt={'thumbnail of ' + message[type]} 
        onClick={() => updateMessage({...message, [type]: ''})}
      /> 
    } else {
      return <p>None</p>
    }
  }

  return(
    <SelectContainer>
      <SelectDiv>
        <p>Background:</p>
        {renderSelected('background')}
      </SelectDiv>
      <SelectDiv>
        <p>Filter:</p>
        {renderSelected('filter')}
      </SelectDiv>
    </SelectContainer>
  );
}