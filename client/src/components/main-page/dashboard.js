import { useState } from 'react';

import WidgetLibrary from './editing-components/widgetLibrary';
import EmptyWidget from './editing-components/emptyWidget';

import Snapshots from '../widgets/snapshots-widget/snapshots';
import Messenger from '../widgets/messenger-widget/messenger';
import Notes from '../widgets/notes-widget/notes';
import History from '../widgets/history-widget/history';


import { Container } from '../styles/styles';
import { Column } from './dashboardStyles';


const storage = [
  <Container>
    <Column>
      <Snapshots/>
    </Column>
    <Column>
      <Messenger/>
    </Column>
    <Column>
      <Notes/>
      <History/>
    </Column>
  </Container>
];

export default function Dashboard(props) {
  const [editMode, toggleEditMode] = useState(true);
  const [placement, updatePlacecment] = useState()

  const renderWidgets = () => {
    if (editMode) {
      return (
        <WidgetLibrary/>
      )
    } else {
      return <p>Widgets will be rendered here</p>
    }
  }

  return renderWidgets()
}
