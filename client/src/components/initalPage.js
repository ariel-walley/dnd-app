import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles';

const DivContainer = styled.div`
  margin: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const PlayerDiv = styled.div`
  width: 150px;
  height: 150px;
  margin: 30px;
  background-color: lightgreen;
  color: white;
  font-size: 45px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  border-radius: 5px;
  
`;

class InitialPage extends React.Component {
  constructor(props) {
    super(props);

    this.createDivs = this.createDivs.bind(this);
    this.divSubmit = this.divSubmit.bind(this);

  }

  createDivs() {
    let display = [];

    for (let i = 1; i < 5; i++) {
      display.push(
        <PlayerDiv key={`Player#${i}`} id={i} onClick={this.divSubmit}>{i}</PlayerDiv>
      )
    }

    return display;
  }

  divSubmit(e) {
    let id = parseInt(e.target.id) + 1;

    for (let i = 1; i < id; i++) {     
      window.open(`http://localhost:3000/player/${i}`, "_blank", "resizable=yes, top=400,left=400,width=400,height=400");
    }
    
    this.props.function('send');
  }

  render() {
    return(
      <Container>
        <p>Welcome!</p>
        <label>How many players will you have?</label>
        <DivContainer>
          {this.createDivs()}
        </DivContainer>
      </Container>
    )
  }
}

export default InitialPage;