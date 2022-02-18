import SnapshotContainer from './snapshotContainer';
import Messenger from './messenger';
import Notes from './notes';
import History from './history';
import { UpdatedContainer, Column } from '../../styles/controlPanelStyles';

function ControlPanel() {
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

export default ControlPanel;