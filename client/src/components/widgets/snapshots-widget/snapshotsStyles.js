import styled from 'styled-components';
import { Container } from '../../styles/styles';

export const SnapshotTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 25px;
`;

export const StyledContainer = styled(Container)`
  flex-wrap: wrap;
  padding: 5px;
`;

export const Wrapper = styled.div` 
  width: 40%;
  height: 40%;
  margin: 15px;
  position: relative;
  border: #202021 5px solid;
`;