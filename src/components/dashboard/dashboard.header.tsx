// DashboardHeader.js
import React, { useState } from 'react';
import { Box, Typography, Stack, Menu, MenuItem, IconButton } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/kfintech-logo.png';
const DashboardHeader = ({ onMenuClick }:{onMenuClick:(val:boolean)=>void}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    handleClose();
    alert(`You clicked ${action}`);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        zIndex: 1, // Ensure the header is above other content
        backgroundColor: 'white', // Background color of the header
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for depth
        padding: '12px', // Adjust padding as needed
        height: '80px', // Increase the height here
        top: 0, // Stick the header to the top
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={logo}
            alt="KFINTECH Logo"
            sx={{
              maxWidth: { xs: '80px', sm: '100px', md: '150px' },
              height: 'auto',
            }}
          />
          <Typography
            component="h1"
            variant="h5"
            color="#2f5ea8"
            align="left"
            sx={{ marginLeft: '36px', fontWeight: 'bold' }}
          >
            NISM Automation
          </Typography>
        </Box>
        </Box>
        <Box
          onClick={handleProfileClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: 0,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            }
          }}
        >
          <Person2Icon sx={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.54)' }} />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('Profile')}>Profile</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Change Password')}>Change Password</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Logout')}>Logout</MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
