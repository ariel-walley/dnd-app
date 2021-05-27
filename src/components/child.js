import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;

class Child extends React.Component {
  render() {
    return (
      <Container>
        <p>Player {this.props.player}</p>
      </Container>
    )
  }
}

export default Child;