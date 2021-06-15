import React from 'react';
import styled from 'styled-components';

import { io } from 'socket.io-client';

const StyledInput = styled.input`
  width: 250px;
  height: 
`;

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Hello world', playerNumber: '1'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('Submitted: "' + this.state.value + '" -> Player ' + this.state.playerNumber);

    const socket = io.connect('http://localhost:3100/');

    socket.emit("displayBasicText", JSON.stringify({
      message: this.state.value,
      playerNumber: this.state.playerNumber
    }), (data) => {
      console.log(data)
      socket.disconnect();
    })
    event.preventDefault();
  }

  render(){
    return(
      <div>
        <p>Text: </p>
        <StyledInput type="text" value={this.state.value} onChange={(event) => this.setState({ value: event.target.value})} />
        <br></br>
        <br></br>
        <p>Player Number: </p>
        <input type="text" value={this.state.playerNumber} onChange={(event) => this.setState({ playerNumber: event.target.value})} />
        <br></br>
        <br></br>
        <input onClick={this.handleSubmit} type="button" value="Send" />
      </div>
    )
  }
}

export default TextInput;