import React from 'react';
import { Route } from 'react-router-dom';
import Parent from './components/parent';
import Child from './components/child';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/"><Parent/></Route>
        <Route path="/player1" player="1"><Child/></Route>
        <Route path="/player2" player="2"><Child/></Route>
        <Route path="/player3" player="3"><Child/></Route>
        <Route path="/player4" player="4"><Child/></Route>
      </div>
    )
  }
}

export default App;
