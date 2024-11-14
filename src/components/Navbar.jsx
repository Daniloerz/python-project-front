// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');  // Elimina el estado de autenticación
    navigate('/login');  // Redirige al login
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Sistema de Gestión de Tienda
          </Link>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/products">
            Productos
          </Button>
          <Button color="inherit" component={Link} to="/catalog">
            Catálogo
          </Button>
          <Button color="inherit" component={Link} to="/sales">
            Ventas
          </Button>
          <Button color="inherit" component={Link} to="/reservations">
            Reservas
          </Button>
          <Button color="inherit" component={Link} to="/credit">
            Crear Cuenta de Crédito
          </Button>
          <Button color="inherit" component={Link} to="/credit/accounts">
            Ver Cuentas de Crédito
          </Button>
          <Button color="inherit" component={Link} to="/credit/purchase">
            Registrar Compra a Crédito
          </Button>
          <Button color="inherit" component={Link} to="/reports">
            Informes
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
