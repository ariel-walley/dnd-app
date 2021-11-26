import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { PlayersContext } from '../context';

import styled from 'styled-components';
import { Container } from '../styles';

import { io } from 'socket.io-client';


const UserInput = styled.input`
  height: 25px;
  width: 220px;
  margin: 25px;
  padding: 5px;
  font-size: 18px;
`;

function StartPage() {
  const { setPlayers } = useContext(PlayersContext); 
  const history = useHistory();
  
  const createDivs = () => {
    let display = [];

    for (let i = 1; i < 5; i++) {
      display.push(
        <UserInput key={`Input${i}`} id={`Input${i}`} onKeyDown={handleEnter}/>
      )
    }

    return display;
  }
  
  const handleEnter = (event) => {  // Submit user input if 'Enter' key is pressed   
    if (event.key !== undefined) {
      if (event.key === 'Enter') {
        initalizeGame();
      }
    } else if (event.keyCode !== undefined) {
      if (event.keyCode === 13) {
        initalizeGame();
      };
    }
  }

  const initalizeGame = () => {
    // Gather values from inputs, check they are not empty, trim empty space
    let playerArr = [];

    for (let i = 1; i < 5; i++) {
      let value = document.getElementById(`Input${i}`).value;
      if (value !== '') {
        playerArr.push(value.trim());
      }
    }    


    // Update PlayerContext
    setPlayers(playerArr);
    console.log('Players are: ' + JSON.stringify(playerArr));

    // Launch player windows and send init message
    const socket = io.connect('http://localhost:3100/');

    playerArr.forEach((player, i) => {
      let newWindow = window.open(`http://localhost:3000/player/${i}`, "_blank", "resizable=yes, top=400,left=400,width=400,height=400");     

      newWindow.addEventListener('load', () => { // Display player name on window initalization
        socket.emit("displayBasicText", JSON.stringify({
          content: {
            init: player
          },
          playerNumbers: [i],
          playerNames: player,
          timestamp: new Date()
        }), (data) => {
          console.log(data)
          socket.disconnect();
        })
      }, false);
    })

    // Direct to control panel page
    history.push("/dm");
    
  }  

  return(
    <Container>
      <p>Welcome!</p>
      <label>How many players will you have?</label>
      {createDivs()}
      <button onClick={initalizeGame} type="submit">Enter</button>
    </Container>
  )
}

export default StartPage;