import { StyledSidebar, AppIcon, Menu, DashboardIcon } from './sidebarStyles';

export default function Sidebar(props) {
  const renderDashboards = () => {
    const display = props.info.map((dashboard, i) => 
      <DashboardIcon key={'dashboard' + i} onClick={() => changeDashboard(i)} selected={i === props.current ? true : false}>
        <p>{dashboard.name}</p>
      </DashboardIcon>
    )
    return display;
  }

  const addDashboard = () => {
    let localState = props.info.slice();
    let newID = props.info.length;

    localState.push({
      "id": newID,
      "name": "New",
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
      <Menu/>
      <StyledSidebar>
        {renderDashboards()}
        <p onClick={addDashboard}>+</p>
      </StyledSidebar>
    </StyledSidebar>
  )
};