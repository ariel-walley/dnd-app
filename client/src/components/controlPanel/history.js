import React, { useContext } from 'react';
import PlayersContext from '../../context';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

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
          <Typography>{children}</Typography>
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

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#141314"
  },
  body: {
    flexGrow: 1,
    backgroundColor: "#212021"
  },
}));

export default function BasicTabs() {
  const { players } = useContext(PlayersContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const generateTabs = () => {
    let display = [];
    let count = 1;

    Object.values(players).forEach((player) => {
      display.push(<Tab key={player + 'HistoryTab'} label={player} {...a11yProps(count)} />);
      count++;
    })

    return display;
  }

  const generateTabPanels = () => {
    let display = [];
    let count = 1;

    Object.values(players).forEach((player) => {
      display.push(<TabPanel key={player + 'HistoryPanel'} value={value} index={count}>{`${player}'s history`}</TabPanel>);
      count++;
    })

    return display;
  }

  return (
    <div className={classes.body}>
      <Box sx={{ maxWidth: 480 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
            <Tab label="All" {...a11yProps(0)} />
            {generateTabs()}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          All recent history changes.
        </TabPanel>
        {generateTabPanels()}
      </Box>
    </div>

  );
}
