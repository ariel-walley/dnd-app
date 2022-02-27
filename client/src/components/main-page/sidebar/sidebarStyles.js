import styled from 'styled-components';
import { ColumnContainer } from '../../styles/styles';

export const StyledSidebar = styled(ColumnContainer)`
  width: 100px;
  height: 100%;
  padding: 10px;
  background-color: purple;
  justify-content: flex-start;
`;

export const AppIcon = styled.div`
  width: 50px;
  height: 50px;
  margin: 50px 0px 20px 0px;
  border-radius: 25px;
  background-color: yellow;
`;

export const Menu = styled.div`
  width: 50px;
  height: 50px;
  margin: 20px 0px 50px 0px;
  background-color: white;
`;

export const DashboardIcon = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 25px;
  background-color: ${props => props.selected ? "orange" : "green"};
  text-align: center;
`;
