import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 250px;
  height: 
`;

class Input extends React.Component {
  render(){
    return(
      <div>
        <p>Text: </p>
        <StyledInput/>
      </div>
    )
  }
}

export default Input;