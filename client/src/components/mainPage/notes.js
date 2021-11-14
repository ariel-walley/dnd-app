import React from 'react';
import styled from 'styled-components'
import { Container } from '../../styles';

const UpdatedContainer = styled(Container)`
  height: 50%;
  margin: 15px;
  background-color: #202021;
`;

const StyledInput = styled.input`
  min-width: 250px;
  min-height: 60px;
`;

export default function Notes() {
  const [inputValue, setInputValue] = React.useState('');
  const [inputHistory, setInputHistory] = React.useState([]);

  const handleInputChange = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter" || event.key === "Enter" || event.keyCode === "13") {
      setInputHistory(currentState => [...currentState, {
        contentType: 'DM-note',
        content: event.target.value,
        playerNumbers: 'N/A',
        playerNames: 'N/A',
        timestamp: new Date()
      }]);
      setInputValue('');
    }
  }

  const generateNoteHistory = () => {
    return inputHistory.map((note, index) =>
      <p key={'DMnote' + index}>{note.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}: {note.content}</p>
    );
  }

  return(
    <UpdatedContainer>
      <p>Notes</p>
      <div>
        <div>{ inputHistory.length > 0 ? generateNoteHistory() : 'No note history yet.' }</div>
      </div>  
      <StyledInput type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleInputChange} />
    </UpdatedContainer>
  )
}