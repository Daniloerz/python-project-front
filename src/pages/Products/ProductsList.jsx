// src/pages/Products/ProductsList.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import productService from '../../services/productService';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [saleProductId, setSaleProductId] = useState('');
  const [saleQuantity, setSaleQuantity] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };

    try {
      if (editingProductId) {
        await productService.updateProduct(editingProductId, productData);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProductId ? { ...product, ...productData } : product
          )
        );
        setEditingProductId(null);
      } else {
        await productService.createProduct(productData);
        setProducts((prevProducts) => [...prevProducts, productData]);
      }

      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error('Error al agregar/actualizar producto:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setQuantity(product.quantity.toString());
  };

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleSale = async () => {
    try {
      await productService.sellProduct(saleProductId, parseInt(saleQuantity, 10));
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === saleProductId
            ? { ...product, quantity: product.quantity - saleQuantity }
            : product
        )
      );
      setSaleProductId('');
      setSaleQuantity('');
    } catch (error) {
      console.error('Error al registrar la venta:', error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ color: '#1976D2', fontWeight: 'bold' }}
      >
        Gestión de Productos
      </Typography>


      {/* Formulario para agregar o editar producto */}
      <Box
        component="form"
        onSubmit={handleAddOrUpdateProduct}
        sx={{ mb: 4 }}
      >
        <TextField
          label="Nombre"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            backgroundColor: '#FFFFFF', // Fondo blanco
            borderRadius: '8px', // Bordes redondeados
          }}
          InputProps={{
            style: {
              backgroundColor: '#FFFFFF', // Fondo blanco interno
              borderRadius: '8px', // Bordes redondeados internos
            },
          }}
        />
        <TextField
          label="Descripción"
          variant="outlined"
          margin="normal"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            backgroundColor: '#FFFFFF', // Fondo blanco
            borderRadius: '8px', // Bordes redondeados
          }}
          InputProps={{
            style: {
              backgroundColor: '#FFFFFF', // Fondo blanco interno
              borderRadius: '8px', // Bordes redondeados internos
            },
          }}
        />
        <TextField
          label="Precio"
          variant="outlined"
          margin="normal"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{
            backgroundColor: '#FFFFFF', // Fondo blanco
            borderRadius: '8px', // Bordes redondeados
          }}
          InputProps={{
            style: {
              backgroundColor: '#FFFFFF', // Fondo blanco interno
              borderRadius: '8px', // Bordes redondeados internos
            },
          }}
        />
        <TextField
          label="Cantidad en Existencia"
          variant="outlined"
          margin="normal"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{
            backgroundColor: '#FFFFFF', // Fondo blanco
            borderRadius: '8px', // Bordes redondeados
          }}
          InputProps={{
            style: {
              backgroundColor: '#FFFFFF', // Fondo blanco interno
              borderRadius: '8px', // Bordes redondeados internos
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {editingProductId ? 'Actualizar Producto' : 'Agregar Producto'}
        </Button>
      </Box>

      {/* Formulario para registrar venta */}
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ color: '#1976D2', fontWeight: 'bold' }}
      >
        Registrar Venta
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          backgroundColor: '#F5F5F5', // Fondo más claro para contraste
          padding: '16px', // Espaciado interno
          borderRadius: '8px', // Bordes redondeados
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
        }}
      >
        <FormControl
          fullWidth
          sx={{
            backgroundColor: '#FFFFFF', // Fondo blanco para el select
            borderRadius: '8px', // Bordes redondeados
            '.MuiInputBase-root': {
              borderRadius: '8px', // Bordes redondeados internos
            },
          }}
        >
          <InputLabel>Producto</InputLabel>
          <Select
            value={saleProductId}
            onChange={(e) => setSaleProductId(e.target.value)}
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
          value={saleQuantity}
          onChange={(e) => setSaleQuantity(e.target.value)}
          sx={{
            backgroundColor: '#FFFFFF', // Fondo blanco
            borderRadius: '8px', // Bordes redondeados
            '.MuiOutlinedInput-root': {
              borderRadius: '8px', // Bordes redondeados internos
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSale}
          sx={{
            padding: '10px 20px',
            fontWeight: 'bold',
            borderRadius: '8px', // Bordes redondeados
            textTransform: 'none', // Quitar mayúsculas automáticas
          }}
        >
          Registrar Venta
        </Button>
      </Box>

      {/* Tabla de productos */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '8px', // Bordes redondeados
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave
          overflow: 'hidden', // Evitar que el contenido sobresalga de los bordes
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#1976D2', // Color de fondo azul para el encabezado
              }}
            >
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Descripción</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Cantidad en Existencia</TableCell>
              <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#F9FAFB' }, // Fondo alternado para filas impares
                  '&:nth-of-type(even)': { backgroundColor: '#FFFFFF' }, // Fondo blanco para filas pares
                  '&:hover': { backgroundColor: '#E3F2FD' }, // Fondo al pasar el mouse
                }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(product)}
                    sx={{
                      textTransform: 'none', // Evitar texto en mayúsculas
                      borderRadius: '8px', // Bordes redondeados
                      mr: 1,
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(product.id)}
                    sx={{
                      textTransform: 'none', // Evitar texto en mayúsculas
                      borderRadius: '8px', // Bordes redondeados
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}

export default ProductsList;
