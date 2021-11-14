import React, { useState, useContext } from 'react';
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
  const [localPlayers, setLocalPlayers] = useState();
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
        determinePlayers();
      }
    } else if (event.keyCode !== undefined) {
      if (event.keyCode === 13) {
        determinePlayers();
      };
    }
  }

  const determinePlayers = () => {
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

    setLocalPlayers(playerObj);
    console.log('Players are: ' + JSON.stringify(playerObj));
  }
  
  if (localPlayers) { setPlayers(localPlayers) };

  const launchWindows = () => {
    const socket = io.connect('http://localhost:3100/');

    for (let i = 1; i < Object.keys(localPlayers).length + 1; i++) {  // Launch player windows
      let newWindow = window.open(`http://localhost:3000/player/${i}`, "_blank", "resizable=yes, top=400,left=400,width=400,height=400");     

      newWindow.addEventListener('load', () => { // Display player name on window initalization
        socket.emit("displayBasicText", JSON.stringify({
          message: localPlayers['Player' + i],
          playerNumbers: [i],
          type: 'init-name'
        }), (data) => {
          console.log(data)
          socket.disconnect();
        })
      }, false);
    }

    history.push("/dm"); // Direct to control panel page
  }  

  if (localPlayers) { launchWindows() };

  return(
    <Container>
      <p>Welcome!</p>
      <label>How many players will you have?</label>
      {createDivs()}
      <button onClick={determinePlayers} type="submit">Enter</button>
    </Container>
  )
}

export default StartPage;