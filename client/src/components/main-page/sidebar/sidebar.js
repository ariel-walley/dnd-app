import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { StyledSidebar, AppIcon, AppMenu, DashboardIcon } from './sidebarStyles';

export default function Sidebar(props) {
  const [showIconMenu, toggleIconMenu] = useState(null);
  const [selectedMenu, updateSelectedMenu] = useState(null);

  const handleDashboardMenu = (event) => {
    event.preventDefault();
    toggleIconMenu(
      showIconMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
    updateSelectedMenu(event.target.id.slice(9));
  };

  const handleClose = () => {
    toggleIconMenu(null);
    updateSelectedMenu(null);
  };

  const deleteDashboard = () => {
    let localState = [...props.info];
    localState.splice(selectedMenu, 1);
    props.updateInfo(localState);
  }

  const renderDashboards = () => {
    const display = props.info.map((dashboard, i) => 
      <DashboardIcon 
        key={'dashboard' + i} 
        id={'dashboard' + i}
        onContextMenu={handleDashboardMenu}
        onClick={() => changeDashboard(i)} selected={i === props.current ? true : false}
      >
        <p id={'dash_name' + i}>{dashboard.name}</p>
      </DashboardIcon>
    )
    return display;
  }

  const addDashboard = () => {
    let localState = props.info.slice();
    let newID = props.info.length;

    localState.push({
      "id": newID,
      "name": 'New' + newID,
      "icon": "",
      "widgets": []
    })
    props.updateInfo(localState);
    props.updateCurrent(newID)
  }

  const changeDashboard = (i) => {
    props.updateCurrent(i);
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