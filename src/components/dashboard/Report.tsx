import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

type ReportType = 'enrollment' | 'deactivation' | 'pending' | 'reimbursement' | '';

const Report: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('');
  const [pendingDuration, setPendingDuration] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const handleReportClick = (report: ReportType) => {
    setSelectedReport(report);
  };

  const handlePendingDurationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPendingDuration(event.target.value as string);
  };

  const renderReportContent = () => {
    if (!selectedReport) {
      return <Typography variant="body1">Select a report to view details</Typography>;
    }

    let reportTitle;
    let additionalContent = null;

    switch (selectedReport) {
      case 'enrollment':
        reportTitle = 'Employee Details';
        break;
      case 'deactivation':
        reportTitle = 'Deactivation Report';
        break;
      case 'pending':
        reportTitle = 'Employee Pending Report';
        additionalContent = (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Pending Duration</InputLabel>
            <Select
              value={pendingDuration}
              onChange={handlePendingDurationChange}
              label="Pending Duration"
            >
              <MenuItem value={'below_3_months'}>Below 3 months</MenuItem>
              <MenuItem value={'3_months_to_1_year'}>Above 3 months to 1 year</MenuItem>
              <MenuItem value={'above_1_year'}>Above 1 year</MenuItem>
            </Select>
          </FormControl>
        );
        break;
      case 'reimbursement':
        reportTitle = 'Reimbursement Report';
        break;
      default:
        reportTitle = '';
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height={isLargeScreen ? 'calc(100vh - 30vh)' : 'auto'}
      >
        <Box p={2}>
          <Typography variant="h6">{reportTitle}</Typography>
          <br />
          <br />
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ margin: 1, width: '200px', height: '40px' }}
          />
          <TextField
            label="To Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ margin: 1, width: '200px', height: '40px' }}
          />
          {additionalContent}
        </Box>
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="primary">
            Download Report
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box><Typography variant="h4" align="left" fontWeight="bold" mb={2} marginLeft={2}>
        Reports
      </Typography>
      </Box>
    
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="white"
      p={2}
      m={2}
      borderRadius={2}
      boxShadow={3}
      height={isMobile ? 'auto' : 'calc(100vh - 20vh)'}
    >
      
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        height={isMobile ? 'auto' : 'calc(100vh - 25vh)'}
        width="100%"
      >
        {isMobile ? (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Report</InputLabel>
            <Select
              value={selectedReport}
              onChange={(event) => handleReportClick(event.target.value as ReportType)}
              label="Select Report"
            >
              <MenuItem value={'Leaderboard'}>Leaderboard Report</MenuItem>
              <MenuItem value={'Not Certified greaterthan 3 months'}>Not Certified (&gt; 3 months)</MenuItem>
              <MenuItem value={'Awaiting Enrolment'}>Awaiting Enrolment(&gt; 3 months)</MenuItem>
              <MenuItem value={'Enrolled Yet to be certified'}>Enrolled,Yet to be certified</MenuItem>
              <MenuItem value={'Certificate Expired'}>Certificate Expired</MenuItem>
              <MenuItem value={'deactivation'}>Deactivation Report</MenuItem>
              <MenuItem value={'Reactivation'}>Reactivation Report</MenuItem>
              <MenuItem value={'Reactivation'}>Reactivation Report</MenuItem>
              <MenuItem value={'Exemption'}>Exemption Report</MenuItem>
              
              <MenuItem value={'pending'}>Employee Pending Report</MenuItem>
              <MenuItem value={'reimbursement'}>Reimbursement Report</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Box width="30%" p={2} display="flex" flexDirection="column" bgcolor="white" 
          sx={{
            "& .MuiButton-root":{
              "justifyContent":'flex-start'
            }
          }}
          >
            <Button
              fullWidth
              onClick={() => handleReportClick('Leaderboard')}
              sx={{ marginBottom: 1 }}
            >
              Leaderboard Report
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('Not Certified greaterthan 3 months')}
              sx={{ marginBottom: 1 }}
            >
              Not Certified (&gt; 3 months)
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('Awaiting Enrolment')}
              sx={{ marginBottom: 1 }}
            >
              Awaiting Enrolment(&gt; 3 months)
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('Enrolled Yet to be certified')}
              sx={{ marginBottom: 1 }}
            >
              Enrolled,Yet to be certified
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('Certificate Expired')}
              sx={{ marginBottom: 1 }}
            >
              Certificate Expired
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('deactivation')}
              sx={{ marginBottom: 1 }}
            >
              Deactivation Report
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('Reactivation')}
              sx={{ marginBottom: 1 }}
            >
              Reactivation Report
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('Exemption')}
              sx={{ marginBottom: 1 }}
            >
              Exemption Report
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('pending')}
              sx={{ marginBottom: 1 }}
            >
              Employee Pending Report
            </Button>
            <Button
              fullWidth
              onClick={() => handleReportClick('reimbursement')}
              sx={{ marginBottom: 1 }}
            >
              Reimbursement Report
            </Button>
          </Box>
        )}
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <Box
          width={isMobile ? '100%' : '70%'}
          pl={isMobile ? 0 : 2}
          borderRadius={2}
          boxShadow={1}
          sx={{ marginLeft: isMobile ? 0 : '16px' }}
        >
          <Paper
            elevation={0}
            sx={{ padding: 2, height: '100%', backgroundColor: 'white', borderRadius: 2 }}
          >
            {renderReportContent()}
          </Paper>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default Report;
