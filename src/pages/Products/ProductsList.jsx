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
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>

      {/* Formulario para agregar o editar producto */}
      <Box component="form" onSubmit={handleAddOrUpdateProduct} sx={{ mb: 4 }}>
        <TextField label="Nombre" variant="outlined" margin="normal" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Descripción" variant="outlined" margin="normal" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField label="Precio" variant="outlined" margin="normal" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} />
        <TextField label="Cantidad en Existencia" variant="outlined" margin="normal" type="number" fullWidth value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {editingProductId ? 'Actualizar Producto' : 'Agregar Producto'}
        </Button>
      </Box>

      {/* Formulario para registrar venta */}
      <Typography variant="h5" gutterBottom>
        Registrar Venta
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Producto</InputLabel>
          <Select value={saleProductId} onChange={(e) => setSaleProductId(e.target.value)}>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Cantidad" variant="outlined" type="number" fullWidth value={saleQuantity} onChange={(e) => setSaleQuantity(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleSale}>
          Registrar Venta
        </Button>
      </Box>

      {/* Tabla de productos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad en Existencia</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(product)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(product.id)} sx={{ ml: 1 }}>
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
