import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  TextField,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import EditIcon from '@mui/icons-material/Edit';


const EmployeeDetails = () => {
  const { employeeCode } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [selectedNav, setSelectedNav] = useState('basic');

  useEffect(() => {
    // Fetch employee details based on employeeCode
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/ea6b5fed-b77b-4d58-94af-cff539333514',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        const data = await response.json();
        const employee = data.find((emp) => emp.employeeCode === employeeCode);
        if (!employee) {
          throw new Error('Employee not found');
        }
        setEmployeeDetails(employee);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };
    fetchEmployeeDetails();
  }, [employeeCode]);

  const handleNavigation = (nav) => {
    setSelectedNav(nav);
    const elem = document.getElementById(nav);
    elem.scrollIntoView({ behavior: 'smooth' });
  };

  if (!employeeDetails) {
    return <Typography variant="h4">Loading...</Typography>;
  }
  return (
    <div>
       <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">&lt; Employee Details</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SwapHorizIcon />}
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: '#89CFF0',
              },
              '&:active': {
                backgroundColor: '#89CFF0',
              },
              marginLeft: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: 'white' }}>
              Audit Log
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<WorkspacePremiumIcon />}
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: '#89CFF0',
              },
              '&:active': {
                backgroundColor: '#89CFF0',
              },
              marginLeft: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: 'white' }}>
              Certificates
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: '#89CFF0',
              },
              '&:active': {
                backgroundColor: '#89CFF0',
              },
              marginLeft: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: 'white' }}>
              Edit
            </Typography>
          </Button>
        </Box>
      </Box>
      <br />
      <Paper sx={{ display: 'flex' }}>
        <Grid item xs={3}>
          <List component="nav" aria-label="navigation">
            <ListItem button onClick={() => handleNavigation('basic')}>
              <ListItemText primary="Basic Details" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => handleNavigation('additional')}
              style={selectedNav === 'additional' ? { color: 'blue' } : {}}
            >
              <ListItemText primary="Additional Details" />
            </ListItem>
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={9} sx={{ padding: '10px', marginLeft: '10px' }}>
          <div id="basic">
            <Typography
              variant="h6"
              sx={{ backgroundColor: '#c7eef0', borderRadius: '4px', padding: '6px' }}
            >
              Basic Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Employee Code
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.employeeCode}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Employee Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.employeeName}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Exemption
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={'No'}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Is NISM status mandatory
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.nismStatus === 'Active' ? 'No' : 'Yes'}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </div>
          <br />
          <div id="additional">
            <Typography
              variant="h6"
              sx={{ backgroundColor: '#c7eef0', borderRadius: '4px', padding: '6px' }}
            >
              Additional Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Email Address
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.officialMailAddress}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Phone Number
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={''}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    PAN Number
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={''}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    L1 Manager Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={''}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Fuctional Head
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={''}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Practice Head
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={''}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Region
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={''}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Location
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={''}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Date of Joining
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={''}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Designation
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.designation}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    LOB
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.LOB}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Employee Status
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.employeeStatus}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Status of Certificate
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.statusOfCertificate}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Remarks
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={employeeDetails.employeeStatus}
                    disabled
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Paper>
    </div>
  );
};

export default EmployeeDetails;