import React, { useState, useMemo } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { GridApi, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import { FakeServer } from './fakeServer';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

// Register the necessary modules with the Grid
ModuleRegistry.registerModules([
  ColumnsToolPanelModule,
  MenuModule,
  ServerSideRowModelModule,
]);

const Employee = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [searchText, setSearchText] = useState('');
  const [exemptionFilter, setExemptionFilter] = useState('All');
  const [fakeServer, setFakeServer] = useState(null);
  const navigate = useNavigate();

  const PreviewCellRenderer = (params) => {
    const handleClick = () => {
      navigate(`/dashboard/details/${params.data.employeeCode}`);
    };

    return (
      <Button size="small" startIcon={<VisibilityIcon />} onClick={handleClick}></Button>
    );
  };

  const gridOptions = useMemo<GridOptions>(
    () => ({
      columnDefs: [
        { field: 'employeeCode', headerName: 'Employee Code', minWidth: 150 },
        { field: 'employeeName', headerName: 'Employee Name', minWidth: 200 },
        { field: 'LOB', headerName: 'LOB', minWidth: 150 },
        { field: 'employeeStatus', headerName: 'Employee Status', minWidth: 150 },
        { field: 'nismStatus', headerName: 'NISM Status', minWidth: 150 },
        { field: 'statusOfCertificate', headerName: 'Status of Certificate', minWidth: 150 },
        {
          headerName: 'Actions',
          field: 'actions',
          cellRenderer: PreviewCellRenderer,
          minWidth: 50,
          flex: 1,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 90,
        resizable: true,
      },
      rowModelType: 'serverSide',
      pagination: true,
      paginationPageSize: 20,
      cacheBlockSize: 20,
      onGridReady: (params) => {
        setGridApi(params.api);
        fetch('https://run.mocky.io/v3/ea6b5fed-b77b-4d58-94af-cff539333514')
          .then((response) => response.json())
          .then((data) => {
            let idSequence = 1;
            data.forEach((item) => {
              item.id = idSequence++;
            });
            const server = new FakeServer(data);
            setFakeServer(server);
            const datasource = getServerSideDatasource(server);
            params.api.setServerSideDatasource(datasource);
          });
      },
    }),
    []
  );

  function getServerSideDatasource(server) {
    return {
      getRows: (params) => {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        const { request } = params;

        const response = server.getData({ ...request, searchText });

        setTimeout(() => {
          if (response.success) {
            params.success({
              rowData: response.rows,
              rowCount: response.lastRow,
            });
          } else {
            params.fail();
          }
        }, 200);
      },
    };
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (gridApi) {
      gridApi.onFilterChanged();
    }
  };

  const handleExemptionChange = (event) => {
    setExemptionFilter(event.target.value);
    if (gridApi) {
      gridApi.onFilterChanged();
    }
  };

  const exemptionFilterInstance = (node) => {
    if (exemptionFilter === 'All') {
      return true;
    }
    return node.data.exemption === exemptionFilter;
  };

  return (
    <Box>
      <Typography variant="h4">Employee</Typography>
      <Box display="flex" flexDirection="column" gap={2} sx={{ marginTop: 2, marginLeft: 3, marginRight: 3 }}>
        <Box display="flex" flexDirection="row" gap={2}>
          <TextField
            select
            variant="outlined"
            size="small"
            value={exemptionFilter}
            onChange={handleExemptionChange}
            sx={{ width: 200 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Exemption">Exemption</MenuItem>
          </TextField>
          <TextField
            label="Search by Employee Name/Code"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearchChange}
            sx={{ width: 550 }}
          />
        
        <Box display="flex" flexDirection="row" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: '#89CFF0',
              },
              '&:active': {
                backgroundColor: '#89CFF0',
              },
            }}
          >
            <Typography variant="body2" sx={{ color: 'white' }}>
              Download Employees
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            component="label"
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: '#89CFF0',
              },
              '&:active': {
                backgroundColor: '#89CFF0',
              },
            }}
          >
            <Typography variant="body2" sx={{ color: 'white' }}>
              Upload Employees
            </Typography>
            <input type="file" hidden />
          </Button>
        </Box>
        </Box>
      </Box>
      <Box className="ag-theme-alpine" sx={{ "& .ag-paging-panel": { flexWrap: 'wrap', fontSize: '10px', }, height: 600, width: '100%', marginTop: '20px', }}>
        <AgGridReact
          gridOptions={gridOptions}
          animateRows
          isExternalFilterPresent={() => exemptionFilter !== 'All'}
          doesExternalFilterPass={exemptionFilterInstance}
          onFilterChanged={() => {
            if (gridApi && fakeServer) {
              const datasource = getServerSideDatasource(fakeServer);
              gridApi.setServerSideDatasource(datasource);
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default Employee;
