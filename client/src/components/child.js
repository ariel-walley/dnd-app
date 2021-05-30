import React from 'react';

import { io } from 'socket.io-client';
let socket = null

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayOutput: ''};
  }

  componentDidMount() {
    socket = io.connect('http://localhost:3100/');

    socket.on("displayBasicText", (raw_data) => {
      console.log(raw_data);
      let data = JSON.parse(raw_data)
      console.log(data)

      if(data.playerNumber == this.props.player) {
        this.setState({displayOutput: data.message})

        setTimeout(() => {
          this.setState({displayOutput: ''})
        }, 15 * 1000) //hide after 15 seconds
      }
    });
  }

  render() {
    return (
      <div>
        <p>Hi</p>
        <p>Player {this.props.player}</p>
        <p>Message: {this.state.displayOutput}</p>
      </div>

    )
  }
}

export default Child;