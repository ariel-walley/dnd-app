import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { Container } from '../styles';

import { io } from 'socket.io-client';
let socket = null;

const Text = styled.p`
  font-size: 24px;
`;

function PlayerWindow(props) {
  const [message, setMessage] = useState('');
  const [background, setBackground] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    socket = io.connect('http://localhost:3100/');

    socket.on("sendContent", (data) => {
      let content = data[props.playerInd];

      if (content.message !== message) { 
        setMessage(content.message);
        setTimeout(() => {
          setMessage('');
        }, 45 * 1000);
        //review my semi-colons policy. it's legit not necessary. linting or strict mode or something?
      }
      if (content.background !== background) {setBackground(content.background)}
      if (content.filter !== filter) {setFilter(content.filter)}
    });

    socket.on("setUpPlayerWindow", (data) => {
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
      <Text>Message: {message}</Text>
      <Text>Background: {background}</Text>
      <Text>Filter: {filter}</Text>
    </Container>
  )
}

export default PlayerWindow;