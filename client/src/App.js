import { useState } from 'react';
import { Route } from 'react-router-dom';

import { PlayersContext } from './context';

import GlobalStyle from './components/styles/globalStyles';
import { ColumnContainer } from './components/styles/styles';

import StartPage from './components/startPage';
import MainPage from './components/main-page/mainPage';
import PlayerWindow from './components/playerWindow';

export default function App() {
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
    <ColumnContainer>
      <GlobalStyle/>
      <PlayersContext.Provider value={value}>
        <Route exact path="/"><StartPage/></Route>
        <Route path="/dm"><MainPage/></Route>
        {createRoutes()}
      </PlayersContext.Provider>
    </ColumnContainer>
  )
};