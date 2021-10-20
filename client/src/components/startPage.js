import React from 'react';
import { useHistory } from "react-router-dom";

import styled from 'styled-components';
import { Container } from '../styles';

import { io } from 'socket.io-client';

import { PlayersContext } from '../context';
import { useContext } from 'react';

const UserInput = styled.input`
  height: 25px;
  width: 220px;
  margin: 25px;
  padding: 5px;
  font-size: 18px;
`;

function StartPage() {
  const createDivs = () => {
    let display = [];

    for (let i = 1; i < 5; i++) {
      display.push(
        <UserInput key={`Input${i}`} id={`Input${i}`} onKeyDown={handleEnter}/>

        /* <Link to={'/dm'} style={{ textDecoration: 'none' }}>
          <PlayerDiv key={`Player#${i}`} id={i} onClick={this.divSubmit}>{i}</PlayerDiv>
        </Link> */
      )
    }

    return display;
  }
  
  const handleEnter = (event) => {  // Submit user input if 'Enter' key is pressed   
    if (event.key !== undefined) {
      if (event.key === 'Enter') {
        setUpPlayers();
      }
    } else if (event.keyCode !== undefined) {
      if (event.keyCode === 13) {
        setUpPlayers();
      };
    }
  }

  const history = useHistory(); //must be defined outside setUpPlayers due to scope
  
  const setUpPlayers = () => {
    // Gather values from inputs
    let inputValues = {};

    for (let i = 1; i < 5; i++) {
      let value = document.getElementById(`Input${i}`).value;
      inputValues[`Input${i}`] = value;
    }    

    // Check inputs for blank spaces and create player object
    let players = {};
    let count = 1;

    for (let input in inputValues) { 
      let trimmedValue = inputValues[input].trim();
      if (trimmedValue !== "" && trimmedValue !== null) {
        players[`Player${count}`] = trimmedValue;
        count++;
      }
    }

    // Launch player windows and set initial name
    const socket = io.connect('http://localhost:3100/');

    for (let i = 1; i < Object.keys(players).length + 1; i++) {  
      let newWindow = window.open(`http://localhost:3000/player/${i}`, "_blank", "resizable=yes, top=400,left=400,width=400,height=400");     

      newWindow.addEventListener('load', () => {
        socket.emit("displayBasicText", JSON.stringify({
          message: players['Player' + i],
          playerNumber: i.toString(),
          type: 'init-name'
        }), (data) => {
          console.log(data)
          socket.disconnect();
        })
      }, false);
    }
  
    // Direct to control panel page
    history.push("/dm");
  }
  
  const contextTest = useContext(PlayersContext);

  return(
    <Container>
      <p>Welcome!</p>
      <p>{contextTest}</p>
      <label>How many players will you have?</label>
      {createDivs()}
      <button onClick={setUpPlayers} type="submit">Enter</button>
    </Container>
  )
}

export default StartPage;