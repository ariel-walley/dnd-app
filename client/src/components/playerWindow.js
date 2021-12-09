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
      if (data.playerNumbers.includes(props.playerInd)) {
        Object.keys(data.content).forEach((contentType) => {
          if (contentType === 'background') {setBackground(data.content.background)}
          if (contentType === 'filter') {setFilter(data.content.filter)}
          if (contentType === 'message') {
            setMessage(data.content.message);
            setTimeout(() => {
              setMessage('');
            }, 10 * 1000);
          }
        });        
      }
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
      setFontSize(elem.offsetHeight * 0.07 + 'px');
    });

    let elem = document.getElementById(props.playerInd + 
      (props.display === 'popOut' ? 'PlayerWindowContainer' : 'SnapshotWrapper')
    );

    resizeObserver.observe(elem);

    return function() {
      resizeObserver.unobserve(elem)
    }
  }, [props.display, props.playerInd]);

  return (
    <StyledContainer id={props.playerInd + 'PlayerWindowContainer'}>
      {background === '' ? <div/> : <Img src={background} content="background"/>}
      {filter === '' ? <div/> : <Img src={filter} content="filter"/>}
      <Text fontSize={fontSize}>{message}</Text>      
    </StyledContainer>
  )
}

export default PlayerWindow;