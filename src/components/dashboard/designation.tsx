import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FakeServer } from './fakeServer';
import { employeeDataWithId } from './interface';

const Designation = () => {
  const [rows, setRows] = useState<employeeDataWithId[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/a9d490e4-d901-4a75-9600-913d0c5500ec')
      .then((response) => response.json())
      .then((data) => {
        let idSequence = 1;
        data.forEach((item: any) => {
          item.id = idSequence++;
        });
        setRows(data);
      });
  }, []);

  const handleDelete = (id: number) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('File uploaded:', selectedFile);
    }
    handleClose();
  };

  const renderDeleteIcon = (params: any) => {
    return (
      <Button
        variant="text"
        color="inherit"
        startIcon={<DeleteIcon />}
        onClick={() => handleDelete(params.row.id as number)}
      />
    );
  };

  const renderEditIcon = (params: any) => {
    return (
      <Button variant="text" color="inherit" startIcon={<EditIcon />} />
    );
  };

  const columns = [
    { field: 'designation', headerName: 'Designation', flex: 8, minWidth: 200 },
    {
      field: 'edit',
      headerName: '',
      flex: 1,
      minWidth: 70,
      renderCell: renderEditIcon,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'delete',
      headerName: '',
      flex: 1,
      minWidth: 70,
      renderCell: renderDeleteIcon,
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 2, marginLeft: 3, marginRight: 3, marginBottom: 2 }}
      >
        <Typography variant="h4">Designation Master</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            size="small"
            startIcon={<CloudUploadIcon />}
            sx={{
              padding: '6px 12px',
              '&:hover': {
                backgroundColor: '#89CFF0',
              },
              '&:active': {
                backgroundColor: '#89CFF0',
              },
            }}
          >
            Upload
          </Button>
        </Box>
      </Box>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection={false}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload LOB</DialogTitle>
        <DialogContent>
          <DialogContentText>Please select a file to upload.</DialogContentText>
          <input type="file" onChange={handleFileChange} style={{ marginTop: '16px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary" disabled={!selectedFile}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Designation;
