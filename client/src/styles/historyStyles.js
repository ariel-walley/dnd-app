import styled from 'styled-components';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#141314"
  },
  body: {
    flexGrow: 1,
    backgroundColor: "#212021"
  },
}));

export const HistoryEntry = styled.div`
width: 100%;
height: 100%;
margin: 5px;
display: flex;
justify-content: space-between;
align-content: center;
align-items: center;
border: solid black 1px;
`;