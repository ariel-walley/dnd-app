import React, { useState } from 'react';
import { Route } from 'react-router-dom';

// import { PlayersContext } from './context';

// import GlobalStyle from './globalStyles';
// import { Container } from './styles';

import StartPage from './components/StartPage';
import ControlPanel from './components/ControlPanel';
import PlayerWindow from './components/PlayerWindow';
// import Messenger from './components/Messenger';
import './index.css'
import './App.css'

function App() {
  const [players, setPlayers] = useState([]);

  const value = { players, setPlayers }

  const createRoutes = () => {
    let routes = [];

    for (let i = 0; i < 4; i++) {
      routes.push(
        <Route path={`/player/${i}`} key={`Route${i}`}>
          <PlayerWindow key={`Player${i}Window`} playerInd={i} display={"popOut"}/>
        </Route>
      )
    }

    return routes;
  }

  return (
    // <Container>
      // <GlobalStyle/>
      // <PlayersContext.Provider value={value}>
      <>
      <Route exact path="/">
        <StartPage />
      </Route>
      <Route path="/dm">
        <ControlPanel />
      </Route>
      {createRoutes()}
    </>
      // </PlayersContext.Provider>
      // </Container>
      )
}

export default App;
