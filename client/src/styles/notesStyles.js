import styled from 'styled-components'
import { Container } from './styles';

/*    MAIN CONTAINER  */
export const NotesMainContainer = styled(Container)`
  height: 50%;
  margin: 15px;
  padding: 15px;
  background-color: #202021;
  justify-content: space-between;
`;

export const NotesTitle = styled.h1`
  margin: 5px 5px 15px 5px;
  font-size: 24px;
  font-weight: 700;
`;

/*  NOTES ROWS  */

export const BodyContainer = styled(Container)`
  justify-content: flex-start;
`;

export const RowContainer = styled(Container)`
  height: auto;
  margin-top: 13px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Timestamp = styled.div`
  white-space: nowrap;
`;

export const NoteText = styled.div`
  width: 100%;
  margin: 0px 20px;
  text-align: left;
  font-size: 16px;
`;

/*  NOTES INPUT */
export const StyledInput = styled.textarea`
  min-height: 100px;  
  min-width: 70%;
  font-family: Arial, Calibri, sans-serif;
  font-size: 16px;
`;