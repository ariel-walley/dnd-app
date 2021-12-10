import React, { useContext } from 'react';
import { MessageContext } from '../../../context';

import styled from 'styled-components';
import { Container, ClearDiv } from '../../../styles';
import CloseIcon from '@mui/icons-material/Close';


const SelectContainer = styled(Container)`
  height: auto;
  flex-direction: row;
`;

const StyledContent = styled.img` 
  max-width: 50px;
  margin: 10px;
`;

export default function SelectBar() {
  const { message, updateMessage } = useContext(MessageContext);

  const renderSelected = (type) => {
    if (message[type]) { 
      if (message[type] === 'clear') {
        return (
          <ClearDiv alt='Black box with an "x" in the center to indicate clearing the screen' onClick={() => updateMessage({...message, [type]: ''})}>
            <CloseIcon/>
          </ClearDiv>
        )
      } else {
        return (
          <StyledContent 
            src={message[type]} 
            key={message[type] + 'Thumbnail'} 
            alt={'thumbnail of ' + message[type]} 
            onClick={() => updateMessage({...message, [type]: ''})}
          /> 
        )
      }
    } else {
      return <p>None</p>
    }
  }

  return(
    <SelectContainer>
      <Container>
        <p>Background:</p>
        {renderSelected('background')}
      </Container>
      <Container>
        <p>Filter:</p>
        {renderSelected('filter')}
      </Container>
    </SelectContainer>
  );
}