// src/pages/Reports/SalesReport.jsx
import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import productService from '../../services/productService';

function SalesReport() {
  const [period, setPeriod] = useState('');
  const [report, setReport] = useState(null);

  const handleGenerateReport = async () => {
    if (!period) {
      alert('Por favor seleccione un período para el informe.');
      return;
    }

    try {
      const response = await productService.getSalesReport(period);
      setReport(response.data);
    } catch (error) {
      console.error('Error al generar el informe de ventas:', error);
      alert('Hubo un problema al generar el informe de ventas.');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Informe de Ventas
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Período</InputLabel>
        <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <MenuItem value="daily">Diario</MenuItem>
          <MenuItem value="weekly">Semanal</MenuItem>
          <MenuItem value="monthly">Mensual</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleGenerateReport} sx={{ mt: 2 }}>
        Generar Informe
      </Button>

      {report && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Informe de Ventas para el período seleccionado</Typography>
          <Typography variant="subtitle1">Fecha de Reporte: {report.report_date}</Typography>
          <Typography variant="subtitle1">Ventas Totales: ${report.total_sales}</Typography>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Cantidad Vendida</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {report?.products_sold?.length > 0 ? (
                  report.products_sold.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.quantity_sold}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No hay datos disponibles</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Productos Más Vendidos</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad Vendida</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.most_sold_products.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.quantity_sold}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Productos Menos Vendidos</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad Vendida</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.least_sold_products.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.quantity_sold}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default SalesReport;
