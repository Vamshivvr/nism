import React from 'react';
import { Box, styled } from '@mui/material';
import DashboardHeader from './dashboard.header';
import Sidebar from '../Sidebar/sidebar.component';
import { Outlet, Route, Routes } from 'react-router-dom';
import EmployeeDetails from './EmployeeDetails';
import Employee from './employee';
import LOBDetails from './lob.details';
import ActivityLog from './activitylog';
import Report from './Report';
import Designation from './designation';
import Dashboarddetails from './dashboarddetails';

const MainContainer = styled(Box)(({ theme }) => ({
  width: 'calc(100% - 250px)', // Adjusted width to fit with Sidebar
  marginLeft: '250px', // Match Sidebar width to align after it
  boxSizing: 'border-box',
  padding: theme.spacing(4, 1),
  paddingTop: theme.spacing(12), // Adjusted padding top to account for the increased header height
  backgroundColor: '#f3f6f4',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: 'unset',
    padding: theme.spacing(4, 2),
     
    marginLeft: 0, // Remove margin for smaller screens
  },
}));

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box>
        <DashboardHeader onMenuClick={handleDrawerToggle} />
      </Box>
      <Box display="flex">
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <MainContainer>
          <Routes>
          <Route path="dashboarddetails" element={<Dashboarddetails />} />
            <Route path="details/:employeeCode" element={<EmployeeDetails />} />
            <Route path="employee" element={<Employee />} />
            <Route path="lob" element={<LOBDetails />} />
            <Route path="designation" element={<Designation />} />
            <Route path="activitylog" element={<ActivityLog />} />
            <Route path="reports" element={<Report />} />
          </Routes>
          <Outlet />
        </MainContainer>
      </Box>
    </>
  );
};

export default Dashboard;
