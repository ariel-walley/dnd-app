import React from 'react';
import styled from 'styled-components';
import { Container } from '../../styles';

import Snapshots from './snapshots';
import GalleryContainer from './galleryContainer';
import Messenger from './messenger';
import Notes from './notes';
import History from './history';

const UpdatedContainer = styled(Container)`
  flex-direction: row;
`;

const Column = styled(Container)`
  margin: 15px;
`;

function MainPage() {
  return(
    <UpdatedContainer>
      <Column>
        <Snapshots/>
      </Column>
      <Column>
        <GalleryContainer/>
        <Messenger/>
      </Column>
      <Column>
        <Notes/>
        <History/>
      </Column>      
    </UpdatedContainer>
  )
}

export default MainPage;