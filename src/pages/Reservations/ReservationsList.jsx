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
} from '@mui/material';
import productService from '../../services/productService';

function ReservationsList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await productService.getReservations();
        setReservations(response.data);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <Box
      sx={{
        mt: 4,
        px: 3,
        py: 2,
        backgroundColor: '#F5F5F5', // Fondo claro para la página
        borderRadius: '8px',
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
        Lista de Reservas
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: '8px', // Bordes redondeados
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#1976D2', // Fondo azul para el encabezado
              }}
            >
              <TableCell
                sx={{
                  color: '#FFFFFF', // Texto blanco en el encabezado
                  fontWeight: 'bold',
                }}
              >
                ID de Reserva
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                Producto
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                Cantidad
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                Método de Pago
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                Fecha de Reserva
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#F9FAFB' }, // Fondo alternado para filas impares
                  '&:nth-of-type(even)': { backgroundColor: '#FFFFFF' }, // Fondo blanco para filas pares
                  '&:hover': { backgroundColor: '#E3F2FD' }, // Fondo al pasar el mouse
                }}
              >
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.product_name}</TableCell>
                <TableCell>{reservation.quantity}</TableCell>
                <TableCell>{reservation.payment_method}</TableCell>
                <TableCell>{reservation.reservation_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ReservationsList;
