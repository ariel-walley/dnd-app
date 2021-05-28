import React from 'react';
import styled from 'styled-components';
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

  }

  render() {
    switch (this.state.page) {
      case 'init':
        return <InitialPage/>;
        break;
      case 'send':
        return <SendContainer/>
        break;
      case 'history':
        return <History/>
        break;
      case 'imitate':
        return <Imitate/>
        break;
      default:
        return <InitialPage/>
    }
  }
}

export default Parent;