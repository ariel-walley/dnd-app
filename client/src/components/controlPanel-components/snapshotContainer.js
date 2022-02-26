import { useContext } from 'react';
import { PlayersContext } from '../../context';
import PlayerWindow from '../playerWindow';

import { Container } from '../../styles/styles';
import { SnapshotTitle, StyledContainer, Wrapper } from '../../styles/snapshotContainerStyles';


function SnapshotContainer() {
  const { players } = useContext(PlayersContext);

  const generateSnapshots = players.map((player, i) => 
    <Wrapper key={i + 'SnapshotWrapper'} id={i + 'SnapshotWrapper'}>
      <PlayerWindow key={i + 'Snapshot'} playerInd={i} display={"controlPanel"}/>
    </Wrapper>
  )

  return(
    <Container>
      <SnapshotTitle>Snapshots</SnapshotTitle>
      <StyledContainer>
        {generateSnapshots}
      </StyledContainer>
    </Container>
  )
}

export default SnapshotContainer;