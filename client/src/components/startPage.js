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
    // Gather values from inputs
    let inputValues = {};

    for (let i = 1; i < 5; i++) {
      let value = document.getElementById(`Input${i}`).value;
      inputValues[`Input${i}`] = value;
    }    

    // Check inputs for blank spaces and create player object
    let playerObj = {};
    let count = 1;

    for (let input in inputValues) { 
      let trimmedValue = inputValues[input].trim();
      if (trimmedValue !== "" && trimmedValue !== null) {
        playerObj[`Player${count}`] = trimmedValue;
        count++;
      }
    }

    // Update PlayerContext
    setPlayers(playerObj);
    console.log('Players are: ' + JSON.stringify(playerObj));

    // Launch player windows and send init message

    const socket = io.connect('http://localhost:3100/');

    for (let i = 1; i < Object.keys(playerObj).length + 1; i++) {  
      let newWindow = window.open(`http://localhost:3000/player/${i}`, "_blank", "resizable=yes, top=400,left=400,width=400,height=400");     

      newWindow.addEventListener('load', () => { // Display player name on window initalization
        socket.emit("displayBasicText", JSON.stringify({
          content: {
            init: playerObj['Player' + i]
          },
          playerNumbers: [i],
          playerNames: playerObj['Player' + i],
          timestamp: new Date()
        }), (data) => {
          console.log(data)
          socket.disconnect();
        })
      }, false);
    }

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