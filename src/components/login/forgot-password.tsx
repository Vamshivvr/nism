import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import SubmitButton from '../forms/FormSubmitButton';
import FormTextInput from '../forms/FormTextInput';
import { useLoginContext } from './data/login.context';

const PANSchema = Yup.object().shape({
  pan: Yup.string()
    .required('Enter your PAN as username')
    .matches(
      /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
      'Please enter a valid PAN number',
    ),
});

export default function ForgotPassword() {
  const { forgotPassword } = useLoginContext();
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <img 
          src="https://static.vecteezy.com/system/resources/previews/037/006/882/non_2x/cyber-security-concept-padlock-lock-privacy-concept-flat-button-digital-background-vector.jpg" 
          alt="Logo" 
          style={{ width: '120px', height: '120px' }} 
        />
      </Box>
      <Typography
        component="h1"
        variant="h5"
        sx={{ fontWeight: 'bold', textAlign: 'center', mt: 2 }}
      >
        Trouble logging in?
      </Typography>
      <br />
      <Typography
        sx={{
          fontSize: 14,
          letterSpacing: '0.01em',
          color: 'text.disabled',
          mb: 4.5,
          textAlign: 'center',
        }}
      >
        Enter your registered email and we'll send you a link or Password to get back into your account.
      </Typography>
      <Formik
        initialValues={{ pan: '' }}
        validationSchema={PANSchema}
        onSubmit={async ({ pan }) => {
          forgotPassword(pan).then(() => navigate('/login/verify-otp'));
        }}
      >
        {() => (
          <Form>
            <FormTextInput label={'Username'} name="pan" placeholder="Enter Username" />
            <Box sx={{ mt: 3, mb: [3, 3, 15] }}>
              <SubmitButton label="Send password to Email" />
            </Box>
          </Form>
        )}
      </Formik>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <MuiLink component={Link} to="/login">
          Back to Login
        </MuiLink>
      </Box>
    </>
  );
}
