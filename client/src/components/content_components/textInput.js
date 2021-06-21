import React, { useState } from 'react';
import styled from 'styled-components';

import { io } from 'socket.io-client';

const StyledInput = styled.input`
  width: 250px;
`;

function TextInput() {
  const [inputValue, setInputValue] = useState('Hello world');
  const [playerNumber, setPlayerNumber] = useState('1');

  const handleSubmit = (event) => {
    console.log('Submitted: "' + inputValue + '" -> Player ' + playerNumber);

    const socket = io.connect('http://localhost:3100/');

    socket.emit("displayBasicText", JSON.stringify({
      message: inputValue,
      playerNumber: playerNumber
    }), (data) => {
      console.log(data)
      socket.disconnect();
    })
    event.preventDefault();
  }

  return(
    <div>
      <p>Text: </p>
      <StyledInput type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <p>Player Number: </p>
      <input type="text" value={playerNumber} onChange={(event) => setPlayerNumber(event.target.value)} />
      <input onClick={handleSubmit} type="button" value="Send" />
    </div>
  )
}

export default TextInput;