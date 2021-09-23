import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles';
import VisualContent from './content/visualContent';
import History from './history';
import Snapshots from './snapshots';
import TextInput from './content/textInput';
import PlayerCheckbox from './content/playerCheckbox';

const UpdatedContainer = styled(Container)`
  justify-content: flex-start;
  flex-direction: row;
`;

const Column = styled.div`
  width: ${props => props.width || "100%"};
  height: 100%;
  padding: 25px;
`;

const UpdatedContainer2 = styled(Container)`
  flex-direction: row;
`;

function MainPage() {
  return(
    <UpdatedContainer>
      <Column width="33.33%">
        <Snapshots/>
      </Column>
      <Column width="66.66%">
        <VisualContent/>
        <UpdatedContainer2>
          <Container>
            <TextInput/>
            <PlayerCheckbox/>
          </Container>
          <History/>
        </UpdatedContainer2>
      </Column>
    </UpdatedContainer>
  )
}

export default MainPage;