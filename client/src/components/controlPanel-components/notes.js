import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { NotesMainContainer, NotesTitle, BodyContainer, RowContainer, Timestamp, NoteText, StyledInput } from '../../styles/notesStyles';

export default function Notes() {
  const [inputValue, setInputValue] = useState('');
  const [inputHistory, setInputHistory] = useState([]);

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

  const removeNote = (index) => {
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
            <CloseIcon onClick={() => removeNote(index)}/>
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