import React from 'react';
import styled from 'styled-components';
import Imgs from './imgs';
import Gifs from './gifs';
import Videos from './videos';
import Filters from './filters';
import TextInput from './textInput';
import PlayerCheckbox from './playerCheckbox';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;

function ContentContainer() {
  return(
    <div>
      <Container>
        <Imgs/>
        <Gifs/>
        <Videos/>
        <Filters/>
        <TextInput/>
        <PlayerCheckbox/>
      </Container>
    </div>
  );
}

export default ContentContainer;