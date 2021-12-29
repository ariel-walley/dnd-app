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
  const [history, setHistory] = React.useState([]);
  /*    CONNECTING TO WEB SOCKET    */

    useEffect(() => {
      socket = io.connect('http://localhost:3100/');
  
      socket.on("sendHistory", (data) => {
        setHistory(data);
      })

      return function() {
        console.log('exit', socket)
        if(socket != null) socket.disconnect()
      }
    }, [])

  /*    CREATING ROWS FOR HISTORY ENTRIES    */
  const generateNames = (playerNames) => {
    let playerNames2 = [...playerNames];
    let str = [playerNames2.slice(0, -1).join(', '), playerNames2.pop()].filter(w => w !== '').join(' and ');
    return str;
  }


  const generateHistory = (playerInd) => {
    // Figuring out which array in the history array to generate
    if (playerInd === 'all') {
      playerInd = history.length - 1
    }
  
    //Mapping content to JSX
    if (history.length > 0) {
      return history[playerInd].map((histEntry, entryIndex) => {

        let display = [];

        Object.keys(histEntry.content).forEach((contentType) => { // Cycle through each history contentType
          if (contentType === 'clear') {
            display.push(
              <HistoryEntry key={`player${playerInd}entry${entryIndex + contentType}`}>
                <p>Cleared {histEntry.content.clear}</p> 
                {playerInd === history.length -  1 ? (' for ' + generateNames(histEntry.playerNames)) : '' }
                <p>{new Date(histEntry.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'})}</p>
              </HistoryEntry>
              )
          } else if (contentType === 'textInput') {
            display.push(
              <HistoryEntry key={`player${playerInd}entry${entryIndex + contentType}`}>
                <p>Sent</p>
                <p>{histEntry.content[contentType]}</p>
                {playerInd === history.length -  1 ? (' to ' + generateNames(histEntry.playerNames)) : '' }
                <p>{new Date(histEntry.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'})}</p>
              </HistoryEntry>
            )
          } else {
            display.push(
              <HistoryEntry key={`player${playerInd}entry${entryIndex + contentType}`}>
                <p>Sent</p>
                <img style={{height: '50px'}} src={histEntry.content[contentType]} alt={contentType + ' thumbnail'}/>
                {playerInd === history.length -  1 ? (' to ' + generateNames(histEntry.playerNames)) : '' }
                <p>{new Date(histEntry.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'})}</p>
              </HistoryEntry>
            )
          }
        }) 

        return display
      })
    } else {
      return 'No history yet.'
    }
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

  const generateTabs = players.map((player, index) => 
    <Tab key={player + 'HistoryTab'} label={player} style={{textTransform: 'none'}} {...a11yProps(index)} />
  );

  const generateTabPanels = players.map((player, index) =>
    <TabPanel
      key={player + 'HistoryPanel'}
      value={value}
      index={index + 1}
    >
      {generateHistory(index)}
    </TabPanel>
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
          {generateHistory('all')}
        </TabPanel>
        {generateTabPanels}
      </Box>
    </div>
  );
}
