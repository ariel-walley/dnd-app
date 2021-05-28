import React from 'react';

class Child extends React.Component {
  render() {
    return (
      <div>
        <p>Hi</p>
        <p>Player {this.props.player}</p>
      </div>

    )
  }
}

export default Child;