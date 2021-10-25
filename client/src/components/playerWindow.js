import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../styles';

import { io } from 'socket.io-client';
let socket = null;

const Text = styled.p`
  font-size: 24px;
`;

function PlayerWindow(props) {
  const [displayText, setText] = useState('');

  useEffect(() => {
    socket = io.connect('http://localhost:3100/');

    socket.on("displayBasicText", (raw_data) => {
      let data = JSON.parse(raw_data);
     
      if (data.playerNumbers.indexOf(props.player) !== -1) {
        console.log(data.content);
        setText(data.content);
        
        if (data.contentType === 'message') {
          setTimeout(() => {
            setText('');
          }, 15 * 1000) //hide after 15 seconds for messages sent from DM
        }

      }
    });

    return function() {
      console.log('exit', socket)
      //need to clean up open connection here or everytime you update component it'll open a new connection AND keep old one open and you'll end up with multiple conenctions from each child window
      if(socket != null) socket.disconnect()
    }
  }, [props.player]); 

  return (
    <Container>
      <Text>Message: {displayText}</Text>
    </Container>
  )
}

export default PlayerWindow;