import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

const DashboardDetails = () => {
  const [lobs, setLobs] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    axios
      .get('https://run.mocky.io/v3/1667884a-a0e2-4132-993e-f2acc368aa4c')
      .then((response) => {
        setLobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the LOB data:', error);
      });
  }, []);

  const columns = [
    { field: 'LOB', headerName: 'Practice Head', width: 300 },
    { field: 'eligibility', headerName: 'No Of LOBs', width: 200 },
    { field: 'designation', headerName: '<3 Months', width: 200 },
    { field: 'certificateType', headerName: '<3 Months', width: 200 },
    {
      field: 'actions',
      headerName: 'Grand Total',
      width: 150,
      
    },
  ];

  const handleEdit = (id) => {
    // Implement edit logic
    console.log(`Edit LOB with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete logic
    console.log(`Delete LOB with id: ${id}`);
  };

  const handleUploadLOB = () => {
    // Implement upload LOB logic
    console.log('Upload LOB');
  };

  const handleAddLOB = () => {
    // Implement add LOB logic
    console.log('Add LOB');
  };

  return (
    <Box p={2} height="100%" display="flex" flexDirection="column">
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: '#E3F2FD', p: 2, display: 'flex',  }}>
            <PersonAddAlt1RoundedIcon color="primary" />
            <Box ml={1}>
              <Typography variant="h6">Total</Typography>
              <br />
              <Typography variant="h4">100</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: '#E3F2FD', p: 2, display: 'flex',  }}>
            <PersonAddAlt1RoundedIcon color="primary" />
            <Box ml={1}>
              <Typography variant="h6">Certified</Typography>
              <br />
              <Typography variant="h4">80</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: '#E3F2FD', p: 2, display: 'flex',}}>
            <PersonAddAlt1RoundedIcon color="primary" />
            <Box ml={1}>
              <Typography variant="h6">Not Certified</Typography>
              <br />
              <Typography variant="h4">20</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <br />
      <br />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          Leaderboard
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadLOB}
            sx={{
              marginRight: 1,
              padding: '6px 12px',
              '&:hover': {
                backgroundColor: '#89CFF0',
              },
              '&:active': {
                backgroundColor: '#89CFF0',
              },
            }}
          >
            Download Details Report
          </Button>
          
        </Box>
      </Box>
      <Box style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={lobs}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </Box>
      
    </Box>
  );
};

export default DashboardDetails;
