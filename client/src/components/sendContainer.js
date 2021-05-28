import React from 'react';
import Header from './header';
import styled from 'styled-components';
import Input from './input';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;

class SendContainer extends React.Component {
  render() {
    return(
      <Container>
        <Header/>
        <Input/>
      </Container>
    )
  }
}

export default SendContainer;