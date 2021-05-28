import React from 'react';
import { Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import StartPage from './components/start';
import SendContainer from './components/sendContainer';
import History from './components/history';
import Imitate from './components/imitator';
import Child from './components/child';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.createRoutes = this.createRoutes.bind(this);
  }
  
  createRoutes() {
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
        <Route path="/dm/start"><StartPage/></Route>
        <Route path="/dm/send"><SendContainer/></Route>
        <Route path="/dm/history"><History/></Route>
        <Route path="/dm/imitate"><Imitate/></Route>
        {this.createRoutes()}
      </div>
    )
  }
}

export default App;
