import { styled } from '@mui/material/styles';

export const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#0A1929',
  minHeight: '100vh',
});

export const FormContainer = styled('div')({
  backgroundColor: '#FFFFFF', // Fondo blanco para mayor contraste
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)', // Sombra para destacar el formulario
  width: '100%',
  maxWidth: '600px',
});

export const TypographyStyled = styled('h4')({
  color: '#0A1929', // Texto oscuro para destacar sobre el fondo blanco
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: '20px',
});

export const ButtonStyled = styled('button')({
  backgroundColor: '#0A74DA', // Botón azul
  color: '#FFFFFF',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: '#005BB5', // Cambiar tono al pasar el mouse
  },
});
