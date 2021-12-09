import React from 'react';
import styled from 'styled-components'
import { Container } from '../../styles';
import CloseIcon from '@mui/icons-material/Close';

/*    MAIN CONTAINER  */
const NotesMainContainer = styled(Container)`
  height: 50%;
  margin: 15px;
  padding: 15px;
  background-color: #202021;
  justify-content: space-between;
`;

const NotesTitle = styled.h1`
  margin: 5px 5px 15px 5px;
  font-size: 24px;
  font-weight: 700;
`;

/*  NOTES ROWS  */

const BodyContainer = styled(Container)`
  justify-content: flex-start;
`;

const RowContainer = styled(Container)`
  height: auto;
  margin-top: 13px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Timestamp = styled.div`
  white-space: nowrap;
`;

const NoteText = styled.div`
  width: 100%;
  margin: 0px 20px;
  text-align: left;
  font-size: 16px;
`;

/*  NOTES INPUT */
const StyledInput = styled.textarea`
  min-height: 100px;  
  min-width: 70%;
  font-family: Arial, Calibri, sans-serif;
  font-size: 16px;
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

  const remoteNote = (index) => {
    let localstate = inputHistory.slice(0);
    localstate.splice(index, 1);
    setInputHistory(localstate);
  }

  const generateNoteHistory = () => {
    return (
      <BodyContainer>
        {
        inputHistory.map((note, index) =>
          <RowContainer key={'DMnote' + index}>
            <Timestamp>{note.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Timestamp>
            <NoteText>{note.content}</NoteText>
            <CloseIcon onClick={() => remoteNote(index)}/>
          </RowContainer>
        )}
      </BodyContainer>
    )
  }

  return(
    <NotesMainContainer>
      <NotesTitle>Notes</NotesTitle>
      { inputHistory.length > 0 ? generateNoteHistory() : <p>No note history yet.</p>}
      <StyledInput type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleInputChange} />
    </NotesMainContainer>
  )
}