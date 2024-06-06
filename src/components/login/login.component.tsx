import React from 'react';
import { Box, Link, Stack, Typography, InputAdornment, Paper, Divider } from '@mui/material';
import { Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormTextInput, { FormPasswordInput } from '../forms/FormTextInput';
import SubmitButton from '../forms/FormSubmitButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import logo from '../assets/kfintech-logo.png';
import { useLoginContext } from './data/login.context';
import { useRootContext } from '../data/root.context';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter your email'),
  password: Yup.string().required('Enter your password'),
});

function LoginMobileNumberSection() {
  const { verifyLogin: login } = useLoginContext();
  const { showToast } = useRootContext();
  const navigate = useNavigate();

  return (
    <Formik
      validationSchema={LoginSchema}
      onSubmit={({ email, password }) => {
        return login(email, password).then(({ userDetails }) => {
          showToast('Logged in successfully', 'success');
          userDetails.isFirstTime ? navigate('verify-otp') : navigate('/dashboard');
        });
      }}
      initialValues={{ email: '', password: '' }}
    >
      {({ errors, touched }) => (
        <Form>
          <FormTextInput
            name="email"
            label="User ID*"
            placeholder="Enter your email"
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <FormPasswordInput
            name="password"
            label="Password*"
            placeholder="Enter password"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Stack sx={{ mb: 5 }}>
            <Link
              to="forgot-password"
              component={NavLink}
              sx={{
                fontSize: 12,
                textDecoration: 'none',
                textAlign: 'end',
                color: '#818589',
                mt: -3,
              }}
            >
              Forgot Password
            </Link>
          </Stack>
          <SubmitButton label="Login" />
        </Form>
      )}
    </Formik>
  );
}

function Login() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const content = (
    <>
      <Box sx={{ mb: 7 }}>
        <img src={logo} alt="KFintech" style={{ maxWidth: '250px', justifyContent: "center", display: "flex", margin: "auto", marginTop: '2px' }} />
      </Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', fontSize: isSmallScreen ? '20px' : '30px', textAlign: 'center',fontFamily: 'Poppins, sans-serif', marginBottom: "35px" }}>
        Welcome!
      </Typography>
      <LoginMobileNumberSection />
      <Divider sx={{ borderBottomWidth: 1, background: '#89CFF0',mt:7}} />
      <Box
        sx={{
          textAlign: 'center',
          marginTop: '30px',
        }}
      >
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <InfoOutlinedIcon sx={{ color: '#818589' }} />
          <Typography variant="body2" sx={{ color: '#818589', fontFamily: 'Roboto, sans-serif' }}>
            If you are facing any technical issues or looking for help, please reach out to us.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="left" sx={{ mt: 3,ml:2}}>
          <MailOutlineIcon sx={{ color: '#0096FF' }} />
          <Typography variant="body2" sx={{ color: '#0096FF', fontFamily: 'Roboto, sans-serif' }}>
            <Link href="mailto:help@kfintech.com" sx={{ color: '#0096FF', textDecoration: 'none' }}>help@kfintech.com</Link>
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="left" sx={{ mt: 2,ml:2}}>
          <PhoneAndroidIcon sx={{ color: '#0096FF' }} />
          <Typography variant="body2" sx={{ color: '#0096FF', fontFamily: 'Roboto, sans-serif' }}>
            9876544666
          </Typography>
        </Stack>
      </Box>
    </>
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSmallScreen ? 'transparent' : '#f5f5f5',
        padding: isSmallScreen ? '0 16px' : '0 24px',
      }}
    >
      {isSmallScreen ? (
        <Box sx={{ width: '100%', maxWidth: '655px', textAlign: 'left' }}>
          {content}
        </Box>
      ) : (
        <Paper
          sx={{
            width: '100%',
            maxWidth: '655px',
            backgroundColor: 'white',
            boxShadow: 3,
            borderRadius: '18px',
            p: 4,
              textAlign: 'left',
            padding: '45px' 
          }}
        >
          {content}
        </Paper>
      )}
    </Box>
  );
}

export default Login;