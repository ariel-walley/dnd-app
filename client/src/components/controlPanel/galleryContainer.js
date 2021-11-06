import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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

const SelectBar = styled.div`
  width: 100%;
  min-height: 50px;
`;

const StyledContent = styled.img` 
  max-width: 50px;
  margin: 10px;
`;

export default function GalleryContainer() {
  const classes = useStyles();
  const contentTypes = ["backgrounds", "gifs", "filters"];

  const [value, setValue] = React.useState(0);
  const [content, setContent] = React.useState({});
  const [selectedContent, selectContent] = React.useState([]);

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

  const addSelectedContent = (path) => {
    if (!selectedContent.includes(path)) {
      selectContent(currentState => [...currentState, path]);
    }
  }

  const removeSelectedContent = (path) => {
    let newState = [...selectedContent];
    newState = newState.filter(elem => elem !== path);
    selectContent(newState);
  }

  const generateTabPanels = contentTypes.map((type, index) => 
    <TabPanel value={value} index={index} key={type + 'TabPanel'}>
      <Gallery name={type} paths={content[type]} key={type + 'Gallery'} function={addSelectedContent}/>
    </TabPanel>
  );

  const displaySelectedContent = selectedContent.map((path, index) => 
    <StyledContent src={path} key={path + 'Thumbnail'} alt={'thumbnail of ' + path} onClick={() => removeSelectedContent(path)}/>
  );

  return (
    <div className={classes.body}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example" className={classes.body}>
          {generateTabs}
        </Tabs>
      </AppBar>
      {generateTabPanels}
      <SelectBar>{ selectedContent.length > 0 ? displaySelectedContent : 'No content selected.'}</SelectBar>
    </div>
  );
}
