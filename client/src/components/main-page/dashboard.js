import { useState, useContext } from 'react';
import { DashboardInfoContext, CurrentDashboardContext } from './mainPageContext';

import WidgetLibrary from './editing-components/widgetLibrary';
//import EmptyWidget from './editing-components/emptyWidget';
import Snapshots from '../widgets/snapshots-widget/snapshots';
import Messenger from '../widgets/messenger-widget/messenger';
import Notes from '../widgets/notes-widget/notes';
import History from '../widgets/history-widget/history';

import { UpdatedContainer, Column } from './dashboardStyles';

const storage = [
  <UpdatedContainer>
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
  </UpdatedContainer>
];

export default function Dashboard(props) {
  const { dashboardInfo, updateDashboardInfo } = useContext(DashboardInfoContext);
  const { currentDashboard, switchDashboard } = useContext(CurrentDashboardContext);

  const [editMode, toggleEditMode] = useState(false);
  const [placement, updatePlacecment] = useState([null, null, null, null, null, null])

  const displayWidgets = () => {
    return dashboardInfo[currentDashboard].widgets.map((widget) => {
      switch(widget.type) {
        case 'history':
          return <History key={widget.type}/>
        case 'messenger':
          return <Messenger key={widget.type}/>
        case 'notes':
          return <Notes key={widget.type}/>
        case 'snapshots':
          return <Snapshots key={widget.type}/>
        default: return <div key={'nullWidget'}></div>
      }
    })
  }

  const toggleEditing = () => {
    if (editMode) {
      return (
        <WidgetLibrary/>
      )
    } else {
      return (
        <UpdatedContainer>
          <p>testing testing 123</p>
          {displayWidgets()}
        </UpdatedContainer>
      )
    }
  }

  return toggleEditing()
}
