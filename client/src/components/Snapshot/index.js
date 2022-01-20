import React, { useContext } from 'react';
import { PlayersContext } from '../../context';

import PlayerWindow from '../PlayerWindow';

// import styled from 'styled-components';
// import { Container } from '../../../styles';
import './Snapshot.css';

// const snapshotTitle = SnapshotTitle;
// const SnapshotTitle = styled.h1`
//   width: 100%;
//   text-align: center;
//   font-size: 25px;
// `;

// const StyledContainer = styled(Container)`
//   flex-direction: row;
//   flex-wrap: wrap;
//   padding: 5px;
// `;

// const Wrapper = styled.div`
//   width: 40%;
//   height: 40%;
//   margin: 15px;
//   position: relative;
//   border: #202021 5px solid;
// `;

export default function Snapshot() {
  const { players } = useContext(PlayersContext);

  const generateSnapshots = players.map((player, i) =>
    <wrapper key={i + 'SnapshotWrapper'} id={i + 'SnapshotWrapper'}>
      <PlayerWindow key={i + 'Snapshot'} playerInd={i} display={"controlPanel"}/>
    </wrapper>
  )

  return (
		// <Container>
		<>
			<snapshotTitle>Snapshots</snapshotTitle>
			<styledContainer>{generateSnapshots}</styledContainer>
		</>
		// </Container>
	);
}

// export default SnapshotContainer;
