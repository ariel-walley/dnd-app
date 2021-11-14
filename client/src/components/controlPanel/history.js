import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PlayersContext } from '../../context';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { io } from 'socket.io-client';
let socket = null;

/*    STYLING    */

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#141314"
  },
  body: {
    flexGrow: 1,
    backgroundColor: "#212021"
  },
}));

const HistoryEntry = styled.div`
  border: solid black 1px;
`;

export default function HistoryContainer() {
  const { players } = useContext(PlayersContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [history, setHistory] = React.useState({ 
    "allHistory": [],
    "history1": [],
    "history2": [],
    "history3": [],
    "history4": []
  });

  /*    CONNECTING TO WEB SOCKET    */

    useEffect(() => {
      socket = io.connect('http://localhost:3100/');
  
      socket.on("displayHistory", (data) => {
        setHistory(data);
      })
    }, [])

  /*    CREATING ROWS FOR HISTORY ENTRIES    */

  const generateNames = (playerNums) => {
    let arr = playerNums.map((player) => players['Player' + player]);
    return [arr.slice(0, -1).join(', '), arr.pop()].filter(w => w !== '').join(' and ')
  }

  const generateAllHistory = () => {
    return history.allHistory.map((hist, index) => 
      <HistoryEntry key={'allHist' + index}>
        {`"${hist.content}" was sent to ` + generateNames(hist.players)}
      </HistoryEntry>
    );
  }

  const generatePlayerHistory = (playerNum) => {
    const historyStr = playerNum.replace("Player", "history");

    return history[historyStr].map((hist, index) => 
      <HistoryEntry key={playerNum + 'History' + index}>
        Sent "{hist.content}"
      </HistoryEntry>
    );
  }

  /*    CREATING TAB STRUCTURE    */

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const generateTabs = Object.values(players).map((player, index) => 
  <Tab key={player + 'HistoryTab'} label={player} {...a11yProps(index + 1)} />
);

const generateTabPanels = Object.keys(players).map((playerNum, index) => 
  <TabPanel key={players[playerNum] + 'HistoryPanel'} value={value} index={index + 1}>{generatePlayerHistory(playerNum)}</TabPanel>
);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.body}>
      <Box sx={{ maxWidth: 480 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
            <Tab label="All" {...a11yProps(0)} />
            {generateTabs}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          { history.allHistory.length > 0 ? generateAllHistory() : 'No history yet.'}
        </TabPanel>
        {generateTabPanels}
      </Box>
    </div>
  );
}
