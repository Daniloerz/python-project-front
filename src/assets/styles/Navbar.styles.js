// src/assets/styles/Navbar.styles.js
import { styled } from '@mui/system';
import { AppBar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Estilo personalizado del AppBar
export const StyledAppBar = styled(AppBar)({
  backgroundColor: '#0D1117', // Fondo oscuro
  padding: '10px 20px',
  borderRadius: '8px',
});

// Estilo para los enlaces
export const StyledLink = styled(Link)({
  color: '#C9D1D9', // Texto claro
  textDecoration: 'none',
  fontSize: '16px',
  margin: '0 10px',
  '&:hover': {
    color: '#58A6FF', // Color azul brillante al pasar el mouse
  },
});

// Estilo para el botón "Cerrar Sesión"
export const StyledButton = styled(Button)({
  color: '#C9D1D9',
  backgroundColor: 'transparent',
  border: '1px solid #58A6FF',
  textTransform: 'none',
  marginLeft: '10px',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#58A6FF',
    color: '#FFFFFF',
  },
});
