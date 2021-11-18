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
  width: 100%;
  height: 100%;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
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
  const generateNames = (playerNames) => {
    let playerNames2 = [...playerNames];
    let str = [playerNames2.slice(0, -1).join(', '), playerNames2.pop()].filter(w => w !== '').join(' and ');
    return str;
  }

  const generateContent = (contentObj) => {
    return Object.keys(contentObj).map(function(content) {
      if (content === 'message') {
        return (<p>{contentObj[content]}</p>)
      } else {
        return (<img style={{height: '50px'}} src={contentObj[content]} alt={content + ' thumbnail'}/>)
      }
    })
  }

  const generateHistory = (historySelect) => {
    // Figuring out which part of the history object to generate
    let historyStr = historySelect === 0 ? 'allHistory' : historySelect.replace("Player", "history");
  
    //Mapping content to JSX
    return history[historyStr].map((hist, index) => 
      <HistoryEntry key={'allHist' + index}>
        <p>Sent</p>
        <div>{generateContent(hist.content)}</div>
        {historyStr === 'allHistory' ? (' to ' + generateNames(hist.playerNames)) : '' }
        <p>{new Date(hist.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})}</p>
      </HistoryEntry>
    )
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
  <TabPanel key={players[playerNum] + 'HistoryPanel'} value={value} index={index + 1}>{generateHistory(playerNum)}</TabPanel>
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
          { history.allHistory.length > 0 ? generateHistory(0) : 'No history yet.'}
        </TabPanel>
        {generateTabPanels}
      </Box>
    </div>
  );
}
