import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import styled from 'styled-components';
// import { Container } from '../../styles';
// import ControlPanel from '../ControlPanel';

import Snapshot from '../Snapshot';
import PlayerWindow from '../PlayerWindow';
import Messenger from '../Messenger/index';
import Notes from '../Messenger/notes';
import History from '../Messenger/history';
import './ControlPanel.css';

// const UpdatedContainer = styled(Container)`
//   flex-direction: row;
// `;

// const Column = styled(Container)`
//   margin: 15px;
// `;

function Controls() {
  return (
      // <Switch>
    <>
        <Route path='/snapshot'>
        Snapshot
        <Snapshot />
      </Route>
        <Route path='/notes'>
          Notes
          <Notes />
        </Route>
        <Route path='/messenger'>
          Messenger
          <Messenger />
        </Route>
        <Route path='/players'>
          Player Windows
          <PlayerWindow />
        </Route>
        <Route path='/history'>
          History
          <History />
        </Route>
    </>
    // </Switch>
    // <UpdatedContainer>
    //   <Column>
    //     <SnapshotContainer/>
    //   </Column>
    //   <Column>
    //     <Messenger/>
    //   </Column>
    //   <Column>
    //     <Notes/>
    //     <History/>
    //   </Column>
    // </UpdatedContainer>
  )
}

export default Controls;