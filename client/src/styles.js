import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const ClearDiv = styled(Container)`
  width: 100px;
  height: 60px;
  border: white solid 1px;
`;
