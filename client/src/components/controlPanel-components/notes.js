import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import * as styles from '../../styles/notesStyles';

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
      <styles.BodyContainer>
        {
        inputHistory.map((note, index) =>
          <styles.RowContainer key={'DMnote' + index}>
            <styles.Timestamp>{note.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</styles.Timestamp>
            <styles.NoteText>{note.content}</styles.NoteText>
            <CloseIcon onClick={() => removeNote(index)}/>
          </styles.RowContainer>
        )}
      </styles.BodyContainer>
    )
  }

  return(
    <styles.NotesMainContainer>
      <styles.NotesTitle>Notes</styles.NotesTitle>
      { inputHistory.length > 0 ? generateNoteHistory() : <p>No note history yet.</p>}
      <styles.StyledInput type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleInputChange} />
    </styles.NotesMainContainer>
  )
}