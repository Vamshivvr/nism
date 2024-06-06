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
        height="100%"
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
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      height={isMobile ? 'auto' : 'calc(100vh - 32px)'}
      width={isMobile ? '100%' : 'calc(80vw - 32px)'}
      bgcolor="white"
      p={2}
      m={2}
      borderRadius={2}
      boxShadow={3}
      sx={{ marginLeft: isMobile ? 0 : '16px' ,}}
    >
      {isMobile ? (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Report</InputLabel>
          <Select
            value={selectedReport}
            onChange={(event) => handleReportClick(event.target.value as ReportType)}
            label="Select Report"
          >
            <MenuItem value={'enrollment'}>Enrollment Report</MenuItem>
            <MenuItem value={'deactivation'}>Deactivation Report</MenuItem>
            <MenuItem value={'pending'}>Employee Pending Report</MenuItem>
            <MenuItem value={'reimbursement'}>Reimbursement Report</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <Box width="30%" p={2} display="flex" flexDirection="column" bgcolor="white">
          <Button
            fullWidth
            onClick={() => handleReportClick('enrollment')}
            sx={{ marginBottom: 1 }}
          >
            Enrollment Report
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
  );
};

export default Report;