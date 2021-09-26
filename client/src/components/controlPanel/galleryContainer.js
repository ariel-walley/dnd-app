import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Gallery from './gallery';

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

export default function TabsWrappedLabel() {
  const classes = useStyles();
  const contentTypes = ["backgrounds", "gifs", "images"];
  const numbers = ["one", "two", "three"];

  const [value, setValue] = React.useState('one');
  const [content, setContent] = React.useState({});

  useEffect(() => {
    fetch(`http://localhost:3100/res/?contentTypes=${contentTypes.toString()}`)
      .then(raw => raw.json())
      .then((data) => {
        setContent(data);
      }).catch(err => console.error(err))
  }, []);

  const generateTabs = () => {
    let display = [];

    for (let i = 0; i < contentTypes.length; i++) {
      let type = contentTypes[i];

      display.push( 
        <Tab value={numbers[i]} label={type} key={type + 'Tab'} {...a11yProps(numbers[i])} />
      );
    }

    return display;
  }

  const generateTabPanels = () => {
    let display = [];

    for (let i = 0; i < contentTypes.length; i++) {
      let type = contentTypes[i];

      display.push( 
        <TabPanel value={value} index={numbers[i]} key={type + 'TabPanel'}>
          <Gallery name={type} paths={content[type]} key={type + 'Gallery'} />
        </TabPanel>
      );
    }

    return display;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.body}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example" className={classes.body}>
          {generateTabs()}
        </Tabs>
      </AppBar>
      {generateTabPanels()}
    </div>
  );
}
