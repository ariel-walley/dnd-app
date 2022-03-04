import { createContext } from 'react';

export const DashboardInfoContext = createContext({
  dashboardInfo: {},
  updateDashboardInfo: () => {}
})

export const CurrentDashboardContext = createContext({
  currentDashboard: null,
  switchDashboard: () => {}
})

