import { useState, useEffect } from 'react';

import { StyledContainer, Text, Img } from '../styles/playerWindowStyles';

import { io } from 'socket.io-client';
let socket = null;

function PlayerWindow(props) {
  const [message, setMessage] = useState('');
  const [background, setBackground] = useState('');
  const [filter, setFilter] = useState('');
  const [fontSize, setFontSize] = useState('7vh');

  useEffect(() => {
    socket = io.connect('http://localhost:3100/');

    socket.on("sendContent", (data) => {
      if (data.playerNumbers.includes(props.playerInd)) {
        Object.keys(data.content).forEach((contentType) => {
          if (contentType === 'background') {setBackground(data.content.background)}
          if (contentType === 'filter') {setFilter(data.content.filter)}
          if (contentType === 'textInput') {
            setMessage(data.content.textInput);
            setTimeout(() => {
              setMessage('');
            }, 45 * 1000);
          }
          if (contentType === 'clear') {
            data.content.clear.forEach((clearedContent) => {
              if (clearedContent === 'background') {setBackground('')}
              if (clearedContent === 'filter') {setFilter('')}
              if (clearedContent === 'textInput') {setMessage('')}
            })
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
      {background === '' ? <div/> : <Img src={background} content="background" display={props.display}/>}
      {filter === '' ? <div/> : <Img src={filter} content="filter" display={props.display}/>}
      <Text fontSize={fontSize} display={props.display}>{message}</Text>      
    </StyledContainer>
  )
}

export default PlayerWindow;