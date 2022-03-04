import { useContext } from 'react';
import { MessageContext } from '../messengerContext';

import CloseIcon from '@mui/icons-material/Close';
import { ClearDiv, ColumnContainer } from '../../../styles/styles';
import { SelectContainer, StyledContent } from './selectBarStyles';

export default function SelectBar() {
  const { message, updateMessage } = useContext(MessageContext);

  const deselectContent = (e, type) => {
    updateMessage({...message, [type]: ''});
  }

  const deselectClearBox = (e, type) => {
    let stateCopy = message.clear.slice(0);
    stateCopy.splice(stateCopy.indexOf(type), 1);
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
      <ColumnContainer>
        <p>Background:</p>
        {renderSelected('background')}
      </ColumnContainer>
      <ColumnContainer>
        <p>Filter:</p>
        {renderSelected('filter')}
      </ColumnContainer>
    </SelectContainer>
  );
}