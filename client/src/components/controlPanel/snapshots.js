import React, { useContext } from 'react';
import { PlayersContext } from '../../context';

import styled from 'styled-components';
import { Container } from '../../styles';

const SnapshotTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 25px;
`;

const SnapshotContainer = styled(Container)`
  border: grey solid 1px;
  padding: 5px;
`;

const PlayerSnapshot = styled.div`
  height: 100px;
  width: 100px;
  border: white solid 1px;
  margin: 5px;
  display: flexbox;
  justify-content: center;
  align-items: center;
  align-content: center;
  
`;

function Snapshots() {
  const { players } = useContext(PlayersContext);

  const generateSnapshots = Object.values(players).map((player) => 
      <PlayerSnapshot key={player + 'Snapshot'}>{player}</PlayerSnapshot>
  )

  return(
    <Container>
      <SnapshotTitle>Snapshots</SnapshotTitle>
      <SnapshotContainer>
        {generateSnapshots}
      </SnapshotContainer>
    </Container>
  );
}

export default Snapshots;