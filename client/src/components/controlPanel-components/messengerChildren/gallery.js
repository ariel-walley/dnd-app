import React, { useContext } from 'react';
import { MessageContext, ClearCheckboxesContext } from '../../../context';

import { Container, ClearDiv } from '../../../styles';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

const UpdatedContainer = styled(Container)`
  flex-direction: row;
  flex-wrap: wrap;
`;
//StyledContent renamed GalleryContent in messengerStyles.css file - Melody.
const StyledContent = styled.img`
  max-width: 100px;
  margin: 10px;
`;

export default function Gallery (props) {
  const { message, updateMessage } = useContext(MessageContext);
  const { clearCheckboxes, toggleClearCheckboxes } = useContext(ClearCheckboxesContext);

  const selectContent = (path) => {
    let type;
    props.name === 'filters' ? type = 'filter' : type = 'background'; //will update message.background for "images" and "gifs" only

    let stateCopy = message.clear.slice(0);

    if (path === 'clear') {
      if (!stateCopy.includes(type)) { stateCopy.push(type) }; // To prevent multiple clicks
      updateMessage({...message, clear: stateCopy, [type]: ''});
    } else {
      stateCopy.splice(stateCopy.indexOf(type), 1);
      updateMessage({...message, clear: stateCopy, [type]: `/${props.name}/` + path});
      toggleClearCheckboxes({...clearCheckboxes, clearAll: false});
    }
  }

  if (props.paths === undefined) {
    return <p>Loading...</p>
  } else if (props.paths.length > 0) {
    return (
    <UpdatedContainer>
      {props.paths.map((path) =>
        <StyledContent
          src={`/${props.name}/` + path}
          key={path} alt={props.name + 'image'}
          onClick={() => selectContent(path)} />
      )}
      <ClearDiv onClick={() => selectContent('clear')} alt='Black box with an "x" in the center to indicate clearing the screen'>
        <CloseIcon/>
      </ClearDiv>
    </UpdatedContainer>)
  } else {
    return <p>No {props.name} found.</p>
  }
}
