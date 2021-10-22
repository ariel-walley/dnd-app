import React, { useEffect } from 'react';
import { TabPanel, useStyles, a11yProps, MainTabFunction } from './tabs';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import Gallery from './gallery';

export default function GalleryContainer() {
  const classes = useStyles();
  const contentTypes = ["backgrounds", "gifs", "images"];

  const [value, setValue] = React.useState(0);
  const [content, setContent] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch(`http://localhost:3100/res/?contentTypes=${contentTypes.toString()}`)
      .then(raw => raw.json())
      .then((data) => {
        setContent(data);
      }).catch(err => console.error(err))
  }, []);

  const generateTabs = contentTypes.map((type, index) => 
    <Tab value={index} label={type} key={type + 'Tab'} {...a11yProps(index)} />
  );

  const generateTabPanels = contentTypes.map((type, index) => 
    <TabPanel value={value} index={index} key={type + 'TabPanel'} style="wrapped">
      <Gallery name={type} paths={content[type]} key={type + 'Gallery'} />
    </TabPanel>
  );

  return (
    <div className={classes.body}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example" className={classes.body}>
          {generateTabs}
        </Tabs>
      </AppBar>
      {generateTabPanels}
    </div>
  );
}
