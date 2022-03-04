import { useContext, useState, useEffect } from 'react';
import { PlayersContext } from '../../../playersContext';

import { HistoryEntry, useStyles } from './historyStyles';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { io } from 'socket.io-client';
let socket = null;

export default function HistoryContainer() {
  const { players } = useContext(PlayersContext);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState([]);
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

  const generateHistory = (playerInd) => {
    // Figuring out which array in the history array to generate
    if (playerInd === 'all') {
      playerInd = history.length - 1
    }
  
    //Mapping content to JSX
    if (history.length > 0) {
      return history[playerInd].map((histEntry, entryIndex) => {  // Cycle through each history entry
        return Object.keys(histEntry.content).map((contentType) =>  // Cycle through each history contentType
          <HistoryEntry key={`player${playerInd}entry${entryIndex + contentType}`}>
            <p>{contentType === 'clear' ? 'Cleared' : 'Sent' }</p>
            {generateHistoryContent(contentType, histEntry)}
            <p>{playerInd === history.length -  1 ? (contentType === 'clear' ? 'for' : 'to') : '' }</p>
            <p>{playerInd === history.length -  1 ? generateNames(histEntry.playerNames) : '' }</p>
            <p>{new Date(histEntry.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'})}</p>
          </HistoryEntry>
        )
      })
    } else {
      return 'No history yet.'
    }
  }

  const generateNames = (playerNames) => {
    let playerNames2 = [...playerNames];
    if (JSON.stringify(players) === JSON.stringify(playerNames2)) {
      return 'all players'
    } else {
      return [playerNames2.slice(0, -1).join(', '), playerNames2.pop()].filter(w => w !== '').join(' and ')
    }
  }

  const generateHistoryContent = (contentType, histEntry) => {
    if (contentType === 'clear') { 
      let clearCopy = histEntry.content.clear.slice(0);

      if (clearCopy.includes('textInput') && clearCopy.includes('filter') && clearCopy.includes('background')) {
        return <p>all</p>
      } else {
        return <p>{[clearCopy.slice(0, -1).join(', '), clearCopy.pop()].filter(w => w !== '').join(' and ')}</p>
      }
    } else if (contentType === 'textInput') { 
      return <p>{histEntry.content[contentType]}</p>
    } else if (contentType === 'background' || contentType === 'filter') {
      return <img style={{height: '50px'}} src={histEntry.content[contentType]} alt={contentType + ' thumbnail'}/>
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
