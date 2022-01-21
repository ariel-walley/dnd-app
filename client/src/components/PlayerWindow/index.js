import React, { useState, useEffect } from 'react';
import './PlayerWindow.css';
// import styled from 'styled-components';
// import { Container } from '../../styles';

import { io } from 'socket.io-client';
let socket = null;

// const StyledContainer = styled(Container)`
//   width: 100%;
//   height: 100%;
// `;

// const Text = styled.p`
//   font-size: ${props => props.fontSize};
//   transform: ${props => (props.display === 'popOut' ? 'scale(-1, 1)' : 'none')};
// `;

// const Img = styled.img`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   z-index: ${props => (props.content === 'background' ? -10 : -5)};
//   transform: ${props => (props.display === 'popOut' ? 'scaleX(-1)' : 'none')};
// `;

export default function PlayerWindow(props) {
  const [message, setMessage] = useState('');
  const [background, setBackground] = useState('');
  const [filter, setFilter] = useState('');
  const [fontSize, setFontSize] = useState('7vh');

  useEffect(() => {
    socket = io.connect('http://localhost:3100/');

    socket.on("sendContent", (data) => {
      if (data.playerNumbers.includes(props.playerInd)) {
        Object.keys(data.content).forEach((contentType) => {
          if (contentType === 'background') { setBackground(data.content.background); }
          if (contentType === 'filter') { setFilter(data.content.filter); }
          if (contentType === 'message') {
            setMessage(data.content.textInput);
            setTimeout(() => {
              setMessage('');
            }, 45 * 1000);
          }
          if (contentType === 'clear') {
            data.content.clear.forEach((clearedContent) => {
              if (clearedContent === 'background') { setBackground(''); }
              if (clearedContent === 'filter') { setFilter(''); }
              if (clearedContent === 'message') { setMessage(''); }
            });
          }
        });
      }
    });

    socket.on("setUpPlayerWindow", (data) => {
      setMessage(data[props.playerInd]);
    });

    return function () {
      console.log('exit', socket);
      if (socket != null) socket.disconnect();
    };
  }, [props.playerInd]);

  // useEffect(() => {
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     setFontSize(elem.offsetHeight * 0.07 + 'px');
  //   });

  //   let elem = document.getElementById(props.playerInd +
  //     (props.display === 'popOut' ? 'PlayerWindowContainer' : 'SnapshotWrapper')
  //   );
  // }

    //   resizeObserver.observe(elem);

    //   return function() {
    //     resizeObserver.unobserve(elem)
    //   }
    // }, [props.display, props.playerInd]);

    return (
    <>
      < div className='message'
        onChange={(e) => setMessage(e.target.value)}>
        {message}
      </div>
      < div className='background'
        value={background}
        onChange={(e) => setBackground(e.target.value)}>
          {background}
        </div>
      < div className='filter'
        value={filter}
          onChange={(e) => setFilter(e.target.value)}>
          {filter}
        </div>
      <div className="fontSize"
        value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}>
          {fontSize}
        </div>
    </>
    // <StyledContainer className={props.playerInd + 'PlayerWindowContainer'}>
    //   {background === '' ? <div/> : <Img src={background} content="background" display={props.display}/>}
    //   {filter === '' ? <div/> : <Img src={filter} content="filter" display={props.display}/>}
    //   <Text fontSize={fontSize} display={props.display}>{message}</Text>
    // </StyledContainer>
  );
}
