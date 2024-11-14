// src/pages/Credit/CreditAccountForm.jsx
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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Cuenta de Crédito
      </Typography>
      <Box component="form" onSubmit={handleCreateCreditAccount} sx={{ mb: 4 }}>
        <TextField
          label="Nombre del Cliente"
          variant="outlined"
          margin="normal"
          fullWidth
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Crear Cuenta de Crédito
        </Button>
      </Box>
    </Box>
  );
}

export default CreditAccountForm;
