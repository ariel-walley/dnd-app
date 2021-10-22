import React from 'react';
import { Container } from '../../styles';
import styled from 'styled-components';

const UpdatedContainer = styled(Container)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledContent = styled.img`
  max-width: 100px;
  margin: 10px;
`;

export default function Gallery (props) {
  if (props.paths === undefined) {
    return <p>Loading...</p>
  } else if (props.paths.length > 0) {
    return <UpdatedContainer>{
      props.paths.map((path) => 
        <StyledContent src={`/${props.name}/` + path} key={path} alt={path}/>
      )}
    </UpdatedContainer>
  } else {
    return <p>No {props.name} found.</p>
  }

}