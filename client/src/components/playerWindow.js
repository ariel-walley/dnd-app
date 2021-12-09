import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { Container } from '../styles';

import { io } from 'socket.io-client';
let socket = null;

const Text = styled.p`
  font-size: 24px;
`;

function PlayerWindow(props) {
  const [displayMessage, setMessage] = useState('');
  const [displayBackground, setBackground] = useState(null);
  const [displayFilter, setFilter] = useState(null);

  useEffect(() => {
    socket = io.connect('http://localhost:3100/');

    socket.on("displayBasicText", (raw_data) => {
      let data = JSON.parse(raw_data);
      console.log(data);

      if (data.playerNumbers.includes(props.playerInd)) {
        Object.keys(data.content).forEach((contentType) => {          
          switch(contentType) {
            case 'background':
              setBackground(data.content.background);  
              break;
            case 'filter':
              setFilter(data.content.filter);  
              break;
            default:
              setMessage(data.content.message);
              setTimeout(() => {
                setMessage('');
              }, 45 * 1000)
              break;
          }
        });
      }
    });

    socket.on("playerWindow2", (data) => {
      setMessage(data[props.playerInd]);
    });

    return function() {
      //need to clean up open connection here or everytime you update component it'll open a new connection AND keep old one open and you'll end up with multiple conenctions from each child window
      console.log('exit', socket);
      if(socket != null) socket.disconnect();
    }
  }, [props.playerInd]); 

  return (
    <Container>
      <Text>Message: {displayMessage}</Text>
      <Text>Background: {displayBackground}</Text>
      <Text>Filter: {displayFilter}</Text>
    </Container>
  )
}

export default PlayerWindow;