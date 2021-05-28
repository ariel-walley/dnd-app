import React from 'react';
import InitialPage from './initalPage';
import SendContainer from './sendContainer';
import History from './history';
import Imitate from './imitator';

class Parent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'init'
    }

    this.updateState = this.updateState.bind(this);

  }

  updateState(newState) {
    this.setState({
      page: newState
    })
  }


  render() {
    switch (this.state.page) {
      case 'init':
        return <InitialPage function={this.updateState}/>;
      case 'send':
        return <SendContainer/>
      case 'history':
        return <History/>
      case 'imitate':
        return <Imitate/>
      default:
        return <InitialPage/>
    }
  }
}

export default Parent;