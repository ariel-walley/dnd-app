import React from 'react';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

let style2 = ''; //Improve this

export function TabPanel(props) {
  const { children, value, index, style, ...other } = props;
  style2 = style;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${style}-tabpanel-${index}`}
      aria-labelledby={`${style}-tab-${index}`}
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
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
  return {
    id: `${style2}-tab-${index}`,
    'aria-controls': `${style2}-tabpanel-${index}`,
  };
}

export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#141314"
  },
  body: {
    flexGrow: 1,
    backgroundColor: "#212021"
  },
}));