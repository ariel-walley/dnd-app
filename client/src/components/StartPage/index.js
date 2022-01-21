import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { PlayersContext } from '../../context';

// import styled from 'styled-components';
// import { Container } from '../../styles';
import '../ControlPanel/Messenger/messengerStyles.css';
import { io } from 'socket.io-client';
import './StartPage.css';
// const UserInput = styled.input`
//   height: 25px;
//   width: 220px;
//   margin: 25px;
//   padding: 5px;
//   font-size: 18px;
// `;

function StartPage() {
  const { setPlayers } = useContext(PlayersContext);
  const [error, toggleError] = useState([false]);
  const history = useHistory();

  const createDivs = () => {
    let display = [];

    for (let i = 1; i < 5; i++) {
      display.push(
        <input key={`Input${i}`} id={`Input${i}`} onKeyDown={handleEnter}/>
      )
    }

    return display;
  }

  const handleEnter = (event) => {  // Submit user input if 'Enter' key is pressed
    if (event.key !== undefined) {
      if (event.key === 'Enter') {
        initializeGame();
      }
    } else if (event.keyCode !== undefined) {
      if (event.keyCode === 13) {
        initializeGame();
      };
    }
  }

  const initializeGame = () => {
    // Gather values from inputs, check they are not empty, trim empty space
    let playerArr = [];

    for (let i = 1; i < 5; i++) {
      let value = document.getElementById(`Input${i}`).value.trim();
      if (playerArr.includes(value)) {
        toggleError([true, value]);
        return
      } else if (value !== '') {
        playerArr.push(value);
      }
    }

    // Update PlayerContext
    setPlayers(playerArr);

    console.log('Players are: ' + JSON.stringify(playerArr));

    // Launch player windows and send init message
    playerArr.forEach((player, i) => {
      let newWindow = window.open(`http://localhost:3000/player/${i}`, "_blank", "resizable=yes, top=400,left=400,width=400,height=400");

      if (i === playerArr.length - 1) { //Connecting to socket once the last player window launches
        const socket = io.connect('http://localhost:3100/');

        newWindow.addEventListener('load', () => {
          socket.emit("setUp", playerArr);
          socket.disconnect();
        }, false);
      }
    });

    // Direct to control panel page
    history.push("/dm");

  }

  const displayError = () => {
    if (error[0]) {
      return (
        <div style={{color: 'red'}}>
          <p>Error: "{error[1]}" is entered twice. Please enter unique names for all players.</p>
          <p>If you have two players with the same name, one can be capitalized and the other entered in lower case.</p>
        </div>
      )
    }
  }

  return(
    // <Container>
    <>
      <p>Welcome!</p>
      <label>How many players will you have?</label>
      {createDivs()}
      {displayError()}
      <button onClick={initializeGame} type="submit">Enter</button>
    </>
    // </Container>
  )
}

export default StartPage;
