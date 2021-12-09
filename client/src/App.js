import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { PlayersContext } from './context';

import GlobalStyle from './globalStyles';
import { Container } from './styles';

import StartPage from './components/startPage';
import MainPage from './components/mainPage/mainPage';
import PlayerWindow from './components/playerWindow';

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
    <Container>
      <GlobalStyle/>
      <PlayersContext.Provider value={value}>
        <Route exact path="/"><StartPage/></Route>
        <Route path="/dm"><MainPage/></Route>
        {createRoutes()}
      </PlayersContext.Provider>
    </Container>
  )
}

export default App;
