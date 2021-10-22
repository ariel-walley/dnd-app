import React, { useContext } from 'react';
import PlayersContext from '../../context';
import { TabPanel, useStyles, a11yProps } from './tabs';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

export default function BasicTabs() {
  const { players } = useContext(PlayersContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generateTabs = Object.values(players).map((player, index) => 
    <Tab key={player + 'HistoryTab'} label={player} {...a11yProps(index + 1)} />
  );
  
  const generateTabPanels = Object.values(players).map((player, index) => 
    <TabPanel key={player + 'HistoryPanel'} value={value} index={index + 1} style="simple">{`${player}'s history`}</TabPanel>
  );
  
  return (
    <div className={classes.body}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          {generateTabs}
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} style="simple">
          All recent history changes.
        </TabPanel>
        {generateTabPanels}
    </div>
  );
}
