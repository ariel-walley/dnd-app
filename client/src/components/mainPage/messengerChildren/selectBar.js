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

  const deselectContent = (e, type) => {
    updateMessage({...message, [type]: ''});
  }

  const deselectClearBox = (e, type) => {
    let stateCopy = message.clear.slice(0);
    stateCopy.splice(stateCopy.indexOf(type, 1));
    updateMessage({...message, clear: stateCopy});
  }

  const renderSelected = (type) => {
    if (message.clear.includes(type)) {
      return (
        <ClearDiv alt='Black box with an "x" in the center to indicate clearing the screen' onClick={(event) => deselectClearBox(event, type)}>
          <CloseIcon/>
        </ClearDiv>
      )
    } else if (!message[type]) {
      return <p>None</p>
    } else {
      return (
        <StyledContent 
          src={message[type]} 
          key={message[type] + 'Thumbnail'} 
          alt={'thumbnail of ' + message[type]} 
          onClick={(e) => deselectContent(e, type)}
        /> 
      )
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