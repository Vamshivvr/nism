import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Stack, Drawer, useMediaQuery } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkspacesSharpIcon from '@mui/icons-material/WorkspacesSharp';
import HistoryIcon from '@mui/icons-material/History';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTheme } from '@mui/material/styles';

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const [selected, setSelected] = useState('Home');
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const navItems = [
    { label: 'Employee', icon: <PersonIcon />, path: '/dashboard/employee' },
    { label: 'LOB', icon: <WorkspacesSharpIcon />, path: '/dashboard/lob' },
    {
      label: 'Designation Master',
      icon: <WorkspacesSharpIcon />,
      path: '/dashboard/designation',
    },
    { label: 'Activity Log', icon: <HistoryIcon />, path: '/dashboard/activitylog' },
    { label: 'Reports', icon: <DescriptionIcon />, path: '/dashboard/reports' },
  ];

  const drawerContent = (
    <Stack gap={'32px'}>
      {navItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.label}
          style={({ isActive }) => ({
            textDecoration: 'none',
            backgroundColor: isActive ? '#1976d2' : 'transparent',
            color: isActive ? '#fff' : '#1976d2',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
          })}
          onClick={() => setSelected(item.label)}
        >
          {React.cloneElement(item.icon, {
            style: {
              verticalAlign: 'middle',
              color: selected === item.label ? '#fff' : '#1976d2',
            },
          })}
          <Typography
            sx={{ marginLeft: '8px', color: selected === item.label ? '#fff' : 'black' }}
          >
            {item.label}
          </Typography>
        </NavLink>
      ))}
    </Stack>
  );

  return (
    <>
      {isMdUp ? (
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              position: 'fixed',
              width: '250px',
              top: '80px',
              height: 'calc(100vh - 80px)',
              padding: '16px',
              boxSizing: 'border-box',
              borderRight: '2px solid #ccc',
              backgroundColor: '#f3f6f4',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: '250px',
              
              padding: '16px',
              boxSizing: 'border-box',
              borderRight: '2px solid #ccc',
              backgroundColor: '#f3f6f4',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;