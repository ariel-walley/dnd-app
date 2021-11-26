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

      if (data.playerNumbers.includes(props.playerInd)) {
        Object.keys(data.content).forEach((contentType) => {
          let func = () => {};
          
          switch(contentType) {
            case 'message':
              func = (x) => setMessage(x);
              break;
            case 'background':
              func = (x) => setBackground(x);
              break;
            case 'filter':
              func = (x) => setFilter(x);
              break;
            default:
              func = (x) => setMessage(x); // used for the 'init' message that displays a player's name on  window initalization
              break;
          }

          func(data.content[contentType]);

          if (!Object.keys(data.content).includes('init')) {
            setTimeout(() => {
              contentType === 'message' ? func('') : func(null);
            }, 6 * 1000)
          }

        });
      }
    });

    return function() {
      console.log('exit', socket)
      //need to clean up open connection here or everytime you update component it'll open a new connection AND keep old one open and you'll end up with multiple conenctions from each child window
      if(socket != null) socket.disconnect()
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