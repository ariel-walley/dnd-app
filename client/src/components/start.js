import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles';

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

  divSubmit(e) {
    let id = parseInt(e.target.id) + 1;

    for (let i = 1; i < id; i++) {     
      window.open(`http://localhost:3000/player/${i}`, "_blank", "resizable=yes, top=400,left=400,width=400,height=400");
    }
  }

  }
  
  return(
    <Container>
      <p>Welcome!</p>
      <label>How many players will you have?</label>
      {createDivs()}
      <button onClick={setUpPlayers} type="submit">Enter</button>
    </Container>
  )
}

export default StartPage;