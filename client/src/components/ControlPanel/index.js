import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import styled from 'styled-components';
// import { Container } from '../../styles';
// import ControlPanel from '../ControlPanel';
import Navigation from '../Navigation'
import Snapshot from './Snapshot';
// import PlayerWindow from '../PlayerWindow';
import Messenger from './Messenger';
import Notes from './Messenger/notes';
import History from './Messenger/history';
import './ControlPanel.css';

// const UpdatedContainer = styled(Container)`
//   flex-direction: row;
// `;

// const Column = styled(Container)`
//   margin: 15px;
// `;

function Controls() {
  return (
		<>
			<Navigation />
			<Switch>
				<Route exact path="/messenger">
					Messenger
					<Messenger />
				</Route>
				<Route path="/history">
					History
					<History />
				</Route>
				<Route exact path="/notes">
					Notes
					<Notes />
				</Route>
				<Route path="/snapshot">
					Snapshot
					<Snapshot />
				</Route>
			</Switch>
		</>
		// <>
		//   <div className='snapshot'>
		//   </div>
		//   <div className='messenger'>
		//   </div>
		//   <div className='gallery'>
		//   </div>
		// </>
	);
}

export default Controls;
