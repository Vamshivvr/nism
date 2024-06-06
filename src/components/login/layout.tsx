import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function LoginLayout() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSmallScreen ? 'transparent' : '#f5f5f5',
        padding: isSmallScreen ? '0 16px' : '0 24px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '655px',
          backgroundColor: 'white',
          boxShadow: isSmallScreen ? 'none' : 3,
          borderRadius: isSmallScreen ? '0' : '18px',
          p: isSmallScreen ? 2 : 4,
          margin: isSmallScreen ? '16px 0' : '24px 0',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default LoginLayout;