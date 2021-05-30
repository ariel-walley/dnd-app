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

  componentWillUnmount() {
    //need to clean up open connection here or everytime you update component it'll open a new connection AND keep old one open and you'll end up with multiple conenctions from each child window
    if(socket != null) socket.disconnect()
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