// src/pages/Credit/CreditPurchaseForm.jsx
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import productService from '../../services/productService';

function CreditPurchaseForm() {
  const [creditAccounts, setCreditAccounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Cargar cuentas de crédito
    const fetchCreditAccounts = async () => {
      try {
        const response = await productService.getCreditAccounts();
        setCreditAccounts(response.data);
      } catch (error) {
        console.error('Error al cargar cuentas de crédito:', error);
      }
    };

    // Cargar lista de productos
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchCreditAccounts();
    fetchProducts();
  }, []);

  const handleAddCreditPurchase = async (e) => {
    e.preventDefault();
    try {
      await productService.addCreditPurchase(selectedAccount, selectedProduct, parseFloat(amount));
      alert('Compra a crédito registrada con éxito');
      setSelectedAccount('');
      setSelectedProduct('');
      setAmount('');
    } catch (error) {
      console.error('Error al registrar la compra a crédito:', error);
      alert('Hubo un problema al registrar la compra. Intente nuevamente.');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Registrar Compra a Crédito
      </Typography>
      <Box component="form" onSubmit={handleAddCreditPurchase} sx={{ mb: 4 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Cuenta del Cliente</InputLabel>
          <Select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
            {creditAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.customer_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Producto</InputLabel>
          <Select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Monto de la Compra"
          variant="outlined"
          margin="normal"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrar Compra
        </Button>
      </Box>
    </Box>
  );
}

export default CreditPurchaseForm;
