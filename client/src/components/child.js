import React from 'react';

class Child extends React.Component {
  render() {
    return (
      <p>Player {this.props.player}</p>
    )
  }
}

export default Child;