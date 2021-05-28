import React from 'react';
import { Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import InitialPage from './components/initalPage';
import SendContainer from './components/sendContainer';
import History from './components/history';
import Imitate from './components/imitator';
import Child from './components/child';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      players: 4
    }

    this.createRoutes = this.createRoutes.bind(this);
  }
  
  createRoutes() {
    let routes = [];

    for (let i = 0; i < this.state.players; i++) {
      routes.push(
        <Route path={`/player/${i}`} key={`Player${i}`}><Child player={`${i}`}/></Route>
      )
    }

    return routes;
  }
  
  render() {
    return (
      <div>
        <GlobalStyle/>
        <Route exact path="/"><InitialPage/></Route>
        <Route path="/dm/start"><InitialPage/></Route>
        <Route path="/dm/send"><SendContainer/></Route>
        <Route path="/dm/history"><History/></Route>
        <Route path="/dm/imitate"><Imitate/></Route>
        {this.createRoutes()}
      </div>
    )
  }
}

export default App;
