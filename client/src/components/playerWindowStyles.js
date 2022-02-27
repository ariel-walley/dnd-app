
import styled from 'styled-components';

export const Text = styled.p`
  font-size: ${props => props.fontSize};
  transform: ${props => (props.display === 'popOut' ? 'scale(-1, 1)' : 'none')};
`;


export const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${props => (props.content === 'background' ? -10 : -5)};
  transform: ${props => (props.display === 'popOut' ? 'scaleX(-1)' : 'none')};
`;