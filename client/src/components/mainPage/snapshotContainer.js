import React, { useContext } from 'react';
import { PlayersContext } from '../../context';

import PlayerWindow from '../playerWindow';

import styled from 'styled-components';
import { Container } from '../../styles';

const SnapshotTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 25px;
`;

const StyledContainer = styled(Container)`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
`;

const Wrapper = styled.div` 
  width: 40%;
  height: 40%;
  margin: 15px;
  border: white 5px solid;
`;

function SnapshotContainer() {
  const { players } = useContext(PlayersContext);

  const generateSnapshots = players.map((player, i) => 
    <Wrapper key={player + 'SnapshotWrapper'}>
      <PlayerWindow key={player + 'Snapshot'} playerInd={i}/>
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