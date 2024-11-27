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

function CreditAccountsList() {
  const [creditAccounts, setCreditAccounts] = useState([]);

  useEffect(() => {
    const fetchCreditAccounts = async () => {
      try {
        const response = await productService.getCreditAccounts();
        setCreditAccounts(response.data);
      } catch (error) {
        console.error('Error al cargar las cuentas de crédito:', error);
      }
    };

    fetchCreditAccounts();
  }, []);

  return (
    <Box
      sx={{
        mt: 4,
        px: 3,
        py: 2,
        backgroundColor: '#F5F5F5', // Fondo claro para el contenedor general
        borderRadius: '8px', // Bordes redondeados
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
        maxWidth: '800px', // Ancho máximo del contenido
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
        Cuentas de Crédito de Clientes
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
                  color: '#FFFFFF', // Texto blanco
                  fontWeight: 'bold',
                }}
              >
                Cliente
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                Crédito Total
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                Saldo Pendiente
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creditAccounts.map((account) => (
              <TableRow
                key={account.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#F9FAFB' }, // Fondo alternado para filas impares
                  '&:nth-of-type(even)': { backgroundColor: '#FFFFFF' }, // Fondo blanco para filas pares
                  '&:hover': { backgroundColor: '#E3F2FD' }, // Fondo al pasar el mouse
                }}
              >
                <TableCell>{account.customer_name}</TableCell>
                <TableCell>{account.total_credit}</TableCell>
                <TableCell>{account.pending_balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CreditAccountsList;
