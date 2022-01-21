import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { PlayersContext } from './context';

// import GlobalStyle from './globalStyles';
// import { Container } from './styles';

import StartPage from './components/StartPage';
import Controls from './components/ControlPanel';
import PlayerWindow from './components/PlayerWindow';
import Messenger from './components/ControlPanel/Messenger';
import History from './components/ControlPanel/Messenger/history'
import Notes from './components/ControlPanel/Messenger/notes'
import Snapshot from './components/ControlPanel/Snapshot'
import './index.css'
import './App.css'

function App() {
  const [players, setPlayers] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false)
  const value = { players, setPlayers }

  const createRoutes = () => {
    let routes = [];

    for (let i = 1; i < 5; i++) {
      routes.push(
        <Route path={`/player/${i}`} key={`Route${i}`}>
          <PlayerWindow key={`Player${i}Window`} playerInd={i} display={"popOut"}/>
        </Route>
      )
    }

    return routes;
  }

  return (
	  <>
			<Route exact path="/">
				<StartPage />
			</Route>
			<Route path="/dm">
				<Controls />
			</Route>

		{/* <Route path='/players'>
          		Player Windows
          		<PlayerWindow />
        	</Route> */}
			{createRoutes()}
			<PlayersContext.Provider value={value}>
			</PlayersContext.Provider>
		</>
	);
}

export default App;
