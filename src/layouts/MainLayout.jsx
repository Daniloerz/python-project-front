// src/layouts/MainLayout.jsx
import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <Box>
      {/* Barra de navegación */}
      <Navbar />
      {/* Contenedor principal con Outlet para renderizar las rutas anidadas */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default MainLayout;
