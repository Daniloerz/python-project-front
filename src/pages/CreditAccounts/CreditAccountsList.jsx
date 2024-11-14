// src/pages/Credit/CreditAccountsList.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cuentas de Crédito de Clientes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Credito total</TableCell>
              <TableCell>Saldo Pendiente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creditAccounts.map((account) => (
              <TableRow key={account.id}>
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
