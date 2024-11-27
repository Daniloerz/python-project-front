import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import productService from '../../services/productService';

function CreditAccountForm() {
  const [customerName, setCustomerName] = useState('');

  const handleCreateCreditAccount = async (e) => {
    e.preventDefault();
    try {
      await productService.createCreditAccount(customerName);
      alert('Cuenta de crédito creada con éxito');
      setCustomerName('');
    } catch (error) {
      console.error('Error al crear la cuenta de crédito:', error);
      alert('Hubo un problema al crear la cuenta de crédito. Intente nuevamente.');
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        px: 3,
        py: 2,
        backgroundColor: '#F5F5F5', // Fondo claro para el contenedor
        borderRadius: '8px', // Bordes redondeados
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
        maxWidth: '600px', // Ancho máximo del formulario
        margin: 'auto', // Centrado horizontal
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: '#1976D2', // Azul para el título
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Crear Cuenta de Crédito
      </Typography>
      <Box
        component="form"
        onSubmit={handleCreateCreditAccount}
        sx={{
          backgroundColor: '#FFFFFF', // Fondo blanco para el formulario
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)', // Sombra ligera
        }}
      >
        <TextField
          label="Nombre del Cliente"
          variant="outlined"
          margin="normal"
          fullWidth
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={{
            backgroundColor: '#FFFFFF', // Fondo blanco para el campo
            borderRadius: '8px',
            '.MuiOutlinedInput-root': {
              borderRadius: '8px', // Bordes redondeados para el input
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            textTransform: 'none', // Evitar texto en mayúsculas
            fontWeight: 'bold',
            borderRadius: '8px', // Bordes redondeados
          }}
        >
          Crear Cuenta de Crédito
        </Button>
      </Box>
    </Box>
  );
}

export default CreditAccountForm;
