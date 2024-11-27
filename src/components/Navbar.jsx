// src/components/Navbar.jsx
import React from 'react';
import { Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledAppBar, StyledLink, StyledButton } from '../assets/styles/Navbar.styles';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Elimina el estado de autenticación
    navigate('/login'); // Redirige al login
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '18px', color: '#58A6FF' }}
        >
          Sistema de Gestión de Tienda
        </Typography>
        <Box>
          <StyledLink to="/products">Productos</StyledLink>
          <StyledLink to="/catalog">Catálogo</StyledLink>
          <StyledLink to="/sales">Ventas</StyledLink>
          <StyledLink to="/reservations">Reservas</StyledLink>
          <StyledLink to="/credit">Crear Cuenta de Crédito</StyledLink>
          <StyledLink to="/credit/accounts">Ver Cuentas de Crédito</StyledLink>
          <StyledLink to="/credit/purchase">Registrar Compra a Crédito</StyledLink>
          <StyledButton onClick={handleLogout}>Cerrar Sesión</StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
