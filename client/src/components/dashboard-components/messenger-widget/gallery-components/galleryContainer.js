import { useEffect, useState } from 'react';
import Gallery from './gallery';
import SelectBar from './selectBar';

import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#141314"
  },
  body: {
    flexGrow: 1,
    backgroundColor: "#212021"
  },
}));

export default function GalleryContainer() {
  const classes = useStyles();
  const contentTypes = ["images", "gifs", "filters"];

  const [value, setValue] = useState(0);
  const [content, setContent] = useState({}); //Resources (images, gifs, and filters) to render

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
    <TabPanel value={value} index={index} key={type + 'TabPanel'}>
      <Gallery key={type + 'Gallery'} name={type} paths={content[type]} />
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
      <SelectBar/>
    </div>
  );
}
