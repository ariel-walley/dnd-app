import React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.div`
  width: 150px;
  height: 150px;
  background-color: orange;
  border-radius: 5px;
`;

class PlayerCheckbox extends React.Component {
  render() {
    return <StyledCheckbox/>
  }
}

export default PlayerCheckbox;