import React from 'react';
import styled from 'styled-components';
import { Container } from '../../styles';

import SnapshotContainer from './snapshotContainer';
import Messenger from './messenger';
import Notes from './notes';
import History from './history';

const UpdatedContainer = styled(Container)`
  flex-direction: row;
`;

const Column = styled(Container)`
  margin: 15px;
`;

function ControlPanel() {
  return(
    <UpdatedContainer>
      <Column>
        <SnapshotContainer/>
      </Column>
      <Column>
        <Messenger/>
      </Column>
      <Column>
        <Notes/>
        <History/>
      </Column>
    </UpdatedContainer>
  )
}

export default ControlPanel;