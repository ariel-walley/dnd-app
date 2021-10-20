import React from 'react';
import { Route } from 'react-router-dom';

import GlobalStyle from './globalStyles';
import { Container } from './styles';

import { PlayersContext } from './context';

import StartPage from './components/startPage';
import MainPage from './components/controlPanel/mainPage';
import PlayerWindow from './components/playerWindow';

function App() {

  const createRoutes = () => {
    let routes = [];

    for (let i = 0; i < 5; i++) {
      routes.push(
        <Route path={`/player/${i}`} key={`Route${i}`}>
          <PlayerWindow key={`Player${i}`} player={i}/>
        </Route>
      )
    }

    return routes;
  }

  return (
    <Container>
      <GlobalStyle/>
      <PlayersContext.Provider value={"this is a real test"}>
        <Route exact path="/"><StartPage/></Route>
        <Route path="/dm"><MainPage/></Route>
        {createRoutes()}
      </PlayersContext.Provider>
    </Container>
  )
}

export default App;
