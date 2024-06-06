import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ActivityLog = () => {
  const employees = [
    {
      id: 1,
      datetime: '09/12/2021 03:45PM',
      employeeCode: '50100034',
      employeeName: 'Emerson Curtis',
      change: 'Updated Employee Details',
      updatedby: 'Venkata Ramana Gandeti'
    },
    {
      id: 2,
      datetime: '08/01/2022 12:23PM',
      employeeCode: '6126812',
      employeeName: 'Vamshi',
      change: 'Updated NISM Details',
      updatedby: 'Kinjarapu Bhaskara Rao'
    },
    // Add more entries as needed
  ];

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [pageSize, setPageSize] = useState(5);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const filteredEmployees = employees.filter(employee => {
    const employeeDate = new Date(employee.datetime.split(' ')[0]);
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    if (fromDateObj && employeeDate < fromDateObj) return false;
    if (toDateObj && employeeDate > toDateObj) return false;
    return true;
  });

  const columns = [
    { field: 'datetime', headerName: 'Date/Time', width: 200 },
    { field: 'employeeCode', headerName: 'Employee Code', width: 150 },
    { field: 'employeeName', headerName: 'Employee Name', width: 200 },
    { field: 'change', headerName: 'Change', width: 250 },
    { field: 'updatedby', headerName: 'Updated By', width: 200 },
  ];

  const rows = filteredEmployees.map((employee, index) => ({
    id: index + 1,
    datetime: employee.datetime,
    employeeCode: employee.employeeCode,
    employeeName: employee.employeeName,
    change: employee.change,
    updatedby: employee.updatedby,
  }));

  return (
    <Box p={2}>
      <Typography variant="h6" sx={{ marginTop: 2, marginLeft: 3 }}> ActivityLog</Typography>
      <Box mb={2} mr={2} ml={2} display="flex" alignItems="center" gap={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        <TextField
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
          label="From Date"
          InputLabelProps={{ shrink: true }}
          placeholder="From Date"
        />
        <TextField
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          label="To Date"
          InputLabelProps={{ shrink: true }}
          placeholder="To Date"
        />
      </Box>
      <Box height={400} sx={{ marginLeft: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
        />
      </Box>
    </Box>
  );
};

export default ActivityLog;