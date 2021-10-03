import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../styles';

import { io } from 'socket.io-client';
let socket = null;

const Text = styled.p`
  font-size: 24px;
`;

function PlayerWindow(props) {
  const [displayOutput, setOutput] = useState('');

  useEffect(() => {
    socket = io.connect('http://localhost:3100/');

    socket.on("displayBasicText", (raw_data) => {
      let data = JSON.parse(raw_data);
      console.log(data);
     
      if(parseInt(data.playerNumber) === props.player) {
        console.log(data.message);
        setOutput(data.message);
        
        if (data.type === 'message') {
          setTimeout(() => {
            setOutput('');
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
      <Text id={`Player${props.player}Message`}>Message: {displayOutput}</Text>
    </Container>
  )
}

export default PlayerWindow;