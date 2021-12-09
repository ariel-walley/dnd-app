import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { Container } from '../styles';

import { io } from 'socket.io-client';
let socket = null;

const StyledContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

const Text = styled.p`
  font-size: ${props => props.fontSize};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${props => props.content === 'background' ? -10 : -5}
`;

function PlayerWindow(props) {
  const [message, setMessage] = useState('');
  const [background, setBackground] = useState('');
  const [filter, setFilter] = useState('');
  const [fontSize, setFontSize] = useState('7vh'); //is this a good default value?

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
      console.log('exit', socket);
      if(socket != null) socket.disconnect();
    }
  }, [props.playerInd]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setFontSize(elem.offsetHeight / 6 + 'px');
    });

    let elem = document.getElementById(props.playerInd + 
      (props.display === 'popOut' ? 'PlayerWindowContainer' : 'SnapshotWrapper')
    );

    resizeObserver.observe(elem);

    return function() {
    }

  return (
      {background === '' ? <div/> : <Img src={background} content="background"/>}
      {filter === '' ? <div/> : <Img src={filter} content="filter"/>}
      <Text fontSize={fontSize}>{message}</Text>      
    </StyledContainer>
  )
}

export default PlayerWindow;