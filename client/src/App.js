import React from 'react';
import { Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import { Container } from './styles';
import StartPage from './components/start';
import MainPage from './components/mainPage';
import Child from './components/child';

function App() {

  const createRoutes = () => {
    let routes = [];

    for (let i = 0; i < 5; i++) {
      routes.push(
        <Route path={`/player/${i}`} key={`Route${i}`}><Child key={`Child${i}`} player={i}/></Route>
      )
    }

    return routes;
  }

  return (
    <Container>
      <GlobalStyle/>
      <Route exact path="/"><StartPage/></Route>
      <Route path="/dm"><MainPage/></Route>
      {createRoutes()}
    </Container>
  )
}

export default App;
