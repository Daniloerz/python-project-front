// src/pages/Catalog/CatalogView.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import productService from '../../services/productService';

function CatalogView() {
  const [products, setProducts] = useState([]);
  const [reservationProductId, setReservationProductId] = useState('');
  const [reservationQuantity, setReservationQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar el catálogo de productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleReserve = async () => {
    try {
      await productService.reserveProduct(reservationProductId, parseInt(reservationQuantity, 10), paymentMethod);
      alert('Reserva realizada con éxito');
      setReservationProductId('');
      setReservationQuantity('');
      setPaymentMethod('');
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      alert('Hubo un problema al realizar la reserva. Intente nuevamente.');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Productos
      </Typography>

      {/* Tabla de productos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad Disponible</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario de reserva */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Realizar Reserva
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Producto</InputLabel>
          <Select value={reservationProductId} onChange={(e) => setReservationProductId(e.target.value)}>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Cantidad"
          variant="outlined"
          type="number"
          fullWidth
          value={reservationQuantity}
          onChange={(e) => setReservationQuantity(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Método de Pago</InputLabel>
          <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <MenuItem value="contra_entrega">Contra Entrega</MenuItem>
            <MenuItem value="tarjeta_credito">Tarjeta Crédito o Débito</MenuItem>
            <MenuItem value="efectivo">Efectivo</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleReserve}>
          Reservar
        </Button>
      </Box>
    </Box>
  );
}

export default CatalogView;
