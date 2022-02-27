import React, { useState } from 'react';
import Sidebar from './sidebar/sidebar'
import Dashboard from './dashboard';

import { Container } from '../styles/styles';

let widgetInfo = [{
  "id": 0,
  "type": "snapshots",
  "placement": 1,
  "size": "vert-column",
  "settings": {}
},
{
  "id": 1,
  "type": "messenger",
  "placement": 2,
  "size": "vert-column",
  "settings": {}
},
{
  "id": 2,
  "type": "notes",
  "placement": 3,
  "size": "vert-half",
  "settings": {}
},
{
  "id": 3,
  "type": "history",
  "placement": 4,
  "size": "vert-half",
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
      "widgets": []
    }
  ]);

  return (
    <Container>
      <Sidebar info={dashboardInfo} updateInfo={updateDashboardInfo} current={currentDashboard} updateCurrent={switchDashboard}/>
      <Dashboard widgets={dashboardInfo[currentDashboard].widgets} update={updateDashboardInfo}/>
    </Container>
  )
}