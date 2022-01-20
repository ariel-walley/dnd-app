import React, {useState, useEffect} from 'react';
// import styled from 'styled-components'
// import { Container } from '../../../styles';
// import CloseIcon from '@mui/icons-material/Close';
import './messengerStyles.css'


export default function Notes() {
  const [inputValue, setInputValue] = useState('');
  const [inputHistory, setInputHistory] = useState([]);
  // const [showNotes, setShowNotes] = useState('');

  const createNote = (note, content, timestamp) => {
    let note = {
      content: content,
      timestamp: timestamp,

    }
  }

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
  };

  const removeNote = (index) => {
    let localstate = inputHistory.slice(0);
    localstate.splice(index, 1);
    setInputHistory(localstate);
  };

  const generateNoteHistory = () => {
     inputHistory.map((note, index) => {
       return inputHistory.length > 0 ? generateNoteHistory() : 'No note history yet.';
     })
  };

      return (
        <>
        <div id='styledInput'
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleInputChange} />
          <div id='rowContainer'
            value={'DMnote' +  this.index}>
        <div id='timestamp'>
          {notes.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </div>
      </div>
      <div id='notesText'>
        {note.content}
      </div>
      {/* <CloseIcon onClick={() => removeNote(index)} /> */}
    </>
  );
  // return(
  //   <NotesMainContainer>
  //     <NotesTitle>Notes</NotesTitle>
  //   </NotesMainContainer>
  // )

  // );
  //


  /*    MAIN CONTAINER  */
  // const NotesMainContainer = styled(Container)`
  //   height: 50%;
  //   margin: 15px;
  //   padding: 15px;
  //   background-color: #202021;
  //   justify-content: space-between;
  // `;

  // const NotesTitle = styled.h1`
  //   margin: 5px 5px 15px 5px;
  //   font-size: 24px;
  //   font-weight: 700;
  // `;

  // /*  NOTES ROWS  */

  // const BodyContainer = styled(Container)`
  //   justify-content: flex-start;
  // `;

  // const RowContainer = styled(Container)`
  //   height: auto;
  //   margin-top: 13px;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   align-items: flex-start;
  // `;

  // const Timestamp = styled.div`
  //   white-space: nowrap;
  // `;

  // const NoteText = styled.div`
  //   width: 100%;
  //   margin: 0px 20px;
  //   text-align: left;
  //   font-size: 16px;
  // `;

  // /*  NOTES INPUT */
  // const StyledInput = styled.textarea`
  //   min-height: 100px;
  //   min-width: 70%;
  //   font-family: Arial, Calibri, sans-serif;
  //   font-size: 16px;
  // `;}
}
