import SnapshotContainer from './snapshots-widget/snapshots';
import Messenger from './messenger-widget/messenger';
import Notes from './notes-widget/notes';
import History from './history-widget/history';
import { UpdatedContainer, Column } from './dashboardStyles';

function Dashboard() {
  return(
    <UpdatedContainer>
      <Column>
        <SnapshotContainer/>
      </Column>
      <Column>
        <Messenger/>
      </Column>
      <Column>
        <Notes/>
        <History/>
      </Column>
    </UpdatedContainer>
  )
}

export default Dashboard;