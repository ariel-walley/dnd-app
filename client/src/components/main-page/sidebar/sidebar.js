import { useState, useContext } from 'react';
import { DashboardInfoContext, CurrentDashboardContext } from '../mainPageContext';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { StyledSidebar, AppIcon, AppMenu, DashboardIcon } from './sidebarStyles';

export default function Sidebar(props) {
  const { dashboardInfo, updateDashboardInfo } = useContext(DashboardInfoContext);
  const { currentDashboard, switchDashboard } = useContext(CurrentDashboardContext);

  const [showIconMenu, toggleIconMenu] = useState(null);
  const [selectedMenu, updateSelectedMenu] = useState(null);

  const handleDashboardMenu = (event) => {
    event.preventDefault();

    if (showIconMenu === null) {
      toggleIconMenu({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
      })
    } else {
      toggleIconMenu(null);
    }

    // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
    // Other native context menus might behave different.
    // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.

    updateSelectedMenu(event.target.id.slice(9));
  };

  const handleClose = () => {
    toggleIconMenu(null);
    updateSelectedMenu(null);
  };

  const deleteDashboard = () => {
    let localState = [...dashboardInfo];
    localState.splice(selectedMenu, 1);
    updateDashboardInfo(localState); //ALW
  }

  const renderDashboards = () => {
    const display = dashboardInfo.map((dashboard, i) => 
      <DashboardIcon 
        key={'dashboard' + i} 
        id={'dashboard' + i}
        onContextMenu={handleDashboardMenu}
        onClick={() => changeDashboard(i)} selected={i === currentDashboard ? true : false}
      >
        <p id={'dash_name' + i}>{dashboard.name}</p>
      </DashboardIcon>
    )
    return display;
  }

  const addDashboard = () => {
    let localState = dashboardInfo.slice();
    let newID = dashboardInfo.length;

    localState.push({
      "id": newID,
      "name": 'New' + newID,
      "icon": "",
      "widgets": []
    })
    updateDashboardInfo(localState);
    switchDashboard(newID)
  }

  const changeDashboard = (i) => {
    switchDashboard(i);
  }

  return (
    <StyledSidebar>
      <AppIcon/>
      <AppMenu/>
      <StyledSidebar>
        {renderDashboards()}
        <Menu
          open={showIconMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            showIconMenu !== null
              ? { top: showIconMenu.mouseY, left: showIconMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleClose}>Rename</MenuItem>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Reorder</MenuItem>
          <MenuItem onClick={() => {handleClose(); deleteDashboard()}}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
        </Menu>
        <p onClick={addDashboard}>+</p>
      </StyledSidebar>
    </StyledSidebar>
  )
};