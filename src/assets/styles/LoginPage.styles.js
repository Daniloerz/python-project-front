import { styled } from '@mui/system';
import { Box, Button, TextField, Typography } from '@mui/material';

export const LoginContainer = styled(Box)({
  minHeight: '100vh', // Asegura que cubra toda la altura de la ventana
  width: '100vw', // Asegura que cubra toda la anchura de la ventana
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#0A1929', // Color de fondo
  margin: 0, // Quita cualquier margen adicional
  padding: 0, // Quita cualquier relleno adicional
  boxSizing: 'border-box', // Garantiza que los estilos se comporten correctamente
});


export const LoginForm = styled(Box)({
  width: '100%',
  maxWidth: '400px',
  padding: '30px',
  backgroundColor: '#1E293B',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  color: '#E0E7FF',
});

export const Logo = styled(Typography)({
  color: '#38BDF8',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
});

export const InputField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: '#E0E7FF',
  },
  '& .MuiInputLabel-root': {
    color: '#94A3B8',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3B82F6',
    },
    '&:hover fieldset': {
      borderColor: '#2563EB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2563EB',
    },
  },
  marginBottom: '20px',
});

export const SubmitButton = styled(Button)({
  backgroundColor: '#2563EB',
  color: '#FFF',
  padding: '10px',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: '#1E40AF',
  },
});
