import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';

const CombinedLOBDetails = () => {
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
    { field: 'LOB', headerName: 'LOB', width: 300 },
    { field: 'eligibility', headerName: 'Eligibility', width: 200 },
    { field: 'designation', headerName: 'Designation', width: 200 },
    { field: 'certificateType', headerName: 'Certificate Type', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
          </IconButton>
        </Box>
      ),
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          LOB
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
            Upload LOB
          </Button>
          <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />} onClick={handleAddLOB} sx={{
              padding: '6px 12px',
              '&:hover': {
                backgroundColor: '#89CFF0',
              },
              '&:active': {
                backgroundColor: '#89CFF0',
              },
            }}>
            Add LOB
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

export default CombinedLOBDetails;
