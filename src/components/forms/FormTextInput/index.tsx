import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputBaseProps,
  styled,
  Typography,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { ReactElement, useState } from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#2b2b2b',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #ced4da',
  '& .MuiInputBase-input': {
    position: 'relative',
    fontSize: '16px',
    width: '100%',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: 'Roboto, sans-serif',
  },
}));

function FormTextInput({
  name,
  label,
  fullWidth = true,
  ...rest
}: InputBaseProps & { name: string; label: string | ReactElement }): JSX.Element {
  const formikContext = useFormikContext();
  const { isSubmitting: disabled } = formikContext;
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const hasError = !!errorText;
  return (
    <>
      <Typography
        sx={{
          fontSize: '14px',
          lineHeight: '22px',
          letterSpacing: '0.01em',
          mb: '8px',
          fontWeight: 500,
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {label}
      </Typography>
      <FormControl variant="standard" sx={{ mb: 3 }} fullWidth={fullWidth}>
        <BootstrapInput id={`${name}-input`} disabled={disabled} {...field} {...rest} />
        <Typography
          sx={{
            display: 'flex',
            paddingLeft: '0.3em',
            color: 'error.main',
            fontSize: '12px',
            alignItems: 'center',
            gap: '5px',
            mt: '4px',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {hasError && (
            <>
              <InfoOutlinedIcon sx={{ fontSize: '16px' }} />
              <span>{errorText}</span>
            </>
          )}
        </Typography>
      </FormControl>
    </>
  );
}

export function FormPasswordInput({
  name,
  label,
  fullWidth = true,
  ...rest
}: InputBaseProps & { name: string; label: string | ReactElement }): JSX.Element {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const formikContext = useFormikContext();
  const { isSubmitting: disabled } = formikContext;
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const hasError = !!errorText;

  return (
    <>
      <Typography
        sx={{
          fontSize: '14px',
          lineHeight: '22px',
          letterSpacing: '0.01em',
          mb: '8px',
          fontWeight: 500,
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {label}
      </Typography>
      <FormControl variant="standard" sx={{ mb: 3 }} fullWidth={fullWidth}>
        <BootstrapInput
          id={`${name}-input`}
          type={passwordVisible ? 'text' : 'password'}
          disabled={disabled}
          {...field}
          {...rest}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                }}
                disableRipple
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Typography
          sx={{
            display: 'flex',
            paddingLeft: '0.3em',
            color: 'error.main',
            fontSize: '12px',
            alignItems: 'center',
            gap: '5px',
            mt: '4px',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {hasError && (
                <>
              <InfoOutlinedIcon sx={{ fontSize: '16px' }} />
              <span>{errorText}</span>
            </>
          )}
        </Typography>
      </FormControl>
    </>
  );
}

export default FormTextInput;