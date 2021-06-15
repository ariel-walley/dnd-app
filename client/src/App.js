import React from 'react';
import { Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import StartPage from './components/start';
import MainPage from './components/main';
import Child from './components/child';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.createRoutes = this.createRoutes.bind(this);
  }
  
  createRoutes() { // Create routes for each player window
    let routes = [];

    for (let i = 0; i < 5; i++) {
      routes.push(
        <Route path={`/player/${i}`} key={`Route${i}`}><Child key={`Child${i}`} player={i}/></Route>
      )
    }

    return routes;
  }
  
  render() {
    return (
      <div>
        <GlobalStyle/>
        <Route exact path="/"><StartPage/></Route>
        <Route path="/dm"><MainPage/></Route>
        {this.createRoutes()}
      </div>
    )
  }
}

export default App;
