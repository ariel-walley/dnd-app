import React, { useState } from 'react';
import { DashboardInfoContext, CurrentDashboardContext } from './mainPageContext';
import Sidebar from './sidebar/sidebar'
import Dashboard from './dashboard';

import { Container } from '../styles/styles';

let widgetInfo = [{
  "id": 0,
  "type": "snapshots",
  "width": 1,
  "height": 2,
  "settings": {}
},
{
  "id": 1,
  "type": "messenger",
  "width": 1,
  "height": 2,
  "settings": {}
},
{
  "id": 2,
  "type": "notes",
  "width": 1,
  "height": 1,
  "settings": {}
},
{
  "id": 3,
  "type": "history",
  "width": 1,
  "height": 1,
  "settings": {}
}];

export default function MainPage() {
  const [defaultDashboard, updateDefaultDashboard] = useState(0);
  const [currentDashboard, switchDashboard] = useState(defaultDashboard);
  const [dashboardInfo, updateDashboardInfo] = useState([
    {
      "id": 0,
      "name": "Main",
      "icon": "",
      "widgets": widgetInfo
    }
  ]);

  return (
    <Container>
      <DashboardInfoContext.Provider value={{dashboardInfo, updateDashboardInfo}}>
        <CurrentDashboardContext.Provider value={{currentDashboard, switchDashboard}}>
          <Sidebar/>
          <Dashboard widgets={dashboardInfo[currentDashboard].widgets}/>
        </CurrentDashboardContext.Provider>
      </DashboardInfoContext.Provider>
    </Container>
  )
}