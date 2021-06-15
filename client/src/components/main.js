import React from 'react';
import History from './history';
import Snapshots from './snapshots';
import ContentContainer from './content_components/contentContainer';

class MainPage extends React.Component {
  render() {
    return(
      <div>
        <History/>
        <Snapshots/>
        <ContentContainer/>
      </div>
    )
  }
}

export default MainPage;