import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
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
      await productService.reserveProduct(
        reservationProductId,
        parseInt(reservationQuantity, 10),
        paymentMethod
      );
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
    <Box
      sx={{
        mt: 4,
        px: 3,
        py: 2,
        backgroundColor: '#F5F5F5', // Fondo claro general
        borderRadius: '8px', // Bordes redondeados
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
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
        Catálogo de Productos
      </Typography>

      {/* Tabla de productos */}
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976D2' }}>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                Nombre
              </TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                Descripción
              </TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                Precio
              </TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                Cantidad Disponible
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#F9FAFB' },
                  '&:nth-of-type(even)': { backgroundColor: '#FFFFFF' },
                  '&:hover': { backgroundColor: '#E3F2FD' },
                }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario de reserva */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mt: 4,
          color: '#1976D2',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Realizar Reserva
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mt: 2,
          p: 2,
          backgroundColor: '#FFFFFF', // Fondo blanco para el formulario
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <FormControl
          fullWidth
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            '.MuiInputBase-root': { borderRadius: '8px' },
          }}
        >
          <InputLabel>Producto</InputLabel>
          <Select
            value={reservationProductId}
            onChange={(e) => setReservationProductId(e.target.value)}
          >
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
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            '.MuiOutlinedInput-root': { borderRadius: '8px' },
          }}
        />
        <FormControl
          fullWidth
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            '.MuiInputBase-root': { borderRadius: '8px' },
          }}
        >
          <InputLabel>Método de Pago</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="contra_entrega">Contra Entrega</MenuItem>
            <MenuItem value="tarjeta">
              Tarjeta Crédito o Débito
            </MenuItem>
            <MenuItem value="efectivo">Efectivo</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReserve}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Reservar
        </Button>
      </Box>
    </Box>
  );
}

export default CatalogView;
