import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const ColumnContainer = styled(Container)`
  flex-direction: column;
`;

export const ClearDiv = styled(Container)`
  width: 100px;
  height: 60px;
  flex-direction: column;
  border: white solid 1px;
`;