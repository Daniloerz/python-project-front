import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
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
        Informe de Ventas
      </Typography>

      <FormControl
        fullWidth
        margin="normal"
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          '.MuiInputBase-root': { borderRadius: '8px' },
        }}
      >
        <InputLabel>Período</InputLabel>
        <Select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <MenuItem value="daily">Diario</MenuItem>
          <MenuItem value="weekly">Semanal</MenuItem>
          <MenuItem value="monthly">Mensual</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateReport}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: '8px',
        }}
      >
        Generar Informe
      </Button>

      {report && (
        <Box
          sx={{
            mt: 4,
            px: 3,
            py: 2,
            backgroundColor: '#FFFFFF', // Fondo claro para la sección del informe
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#1976D2',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Informe de Ventas para el período seleccionado
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Fecha de Reporte: {report.report_date}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Ventas Totales: ${report.total_sales.toFixed(2)}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#1976D2',
                fontWeight: 'bold',
              }}
            >
              Productos Más Vendidos
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                mt: 2,
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{ backgroundColor: '#1976D2' }}
                  >
                    <TableCell
                      sx={{ color: '#FFFFFF', fontWeight: 'bold' }}
                    >
                      Producto
                    </TableCell>
                    <TableCell
                      sx={{ color: '#FFFFFF', fontWeight: 'bold' }}
                    >
                      Cantidad Vendida
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.most_sold_products.map((product) => (
                    <TableRow
                      key={product.product_id}
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#F9FAFB' },
                        '&:nth-of-type(even)': { backgroundColor: '#FFFFFF' },
                        '&:hover': { backgroundColor: '#E3F2FD' },
                      }}
                    >
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.quantity_sold}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#1976D2',
                fontWeight: 'bold',
              }}
            >
              Productos Menos Vendidos
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                mt: 2,
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{ backgroundColor: '#1976D2' }}
                  >
                    <TableCell
                      sx={{ color: '#FFFFFF', fontWeight: 'bold' }}
                    >
                      Producto
                    </TableCell>
                    <TableCell
                      sx={{ color: '#FFFFFF', fontWeight: 'bold' }}
                    >
                      Cantidad Vendida
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.least_sold_products.map((product) => (
                    <TableRow
                      key={product.product_id}
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#F9FAFB' },
                        '&:nth-of-type(even)': { backgroundColor: '#FFFFFF' },
                        '&:hover': { backgroundColor: '#E3F2FD' },
                      }}
                    >
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
