// src/pages/Reservations/ReservationsList.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Reservas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID de Reserva</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Método de Pago</TableCell>
              <TableCell>Fecha de Reserva</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
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
