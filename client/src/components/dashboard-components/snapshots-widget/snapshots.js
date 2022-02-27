import { useContext } from 'react';
import { PlayersContext } from '../../../context';
import PlayerWindow from '../../playerWindow';

import { ColumnContainer } from '../../styles/styles';
import { SnapshotTitle, StyledContainer, Wrapper } from './snapshotsStyles';


function SnapshotContainer() {
  const { players } = useContext(PlayersContext);

  const generateSnapshots = players.map((player, i) => 
    <Wrapper key={i + 'SnapshotWrapper'} id={i + 'SnapshotWrapper'}>
      <PlayerWindow key={i + 'Snapshot'} playerInd={i} display={"dashboard"}/>
    </Wrapper>
  )

  return(
    <ColumnContainer>
      <SnapshotTitle>Snapshots</SnapshotTitle>
      <StyledContainer>
        {generateSnapshots}
      </StyledContainer>
    </ColumnContainer>
  )
}

export default SnapshotContainer;