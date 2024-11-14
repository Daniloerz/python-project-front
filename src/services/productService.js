// src/services/productService.js
import api from './api';

const getProducts = () => api.get('/api/products');
const getProductById = (id) => api.get(`/api/products/${id}`);
const createProduct = (productData) => api.post('/api/products', productData);
const updateProduct = (id, productData) => api.put(`/api/products/${id}`, productData);
const deleteProduct = (id) => api.delete(`/api/products/${id}`);
const sellProduct = (productId, quantity) => api.post('/api/products/sale', { product_id: productId, quantity });
const reserveProduct = (productId, quantity, paymentMethod) => api.post('/api/products/reserve', { product_id: productId, quantity, payment_method: paymentMethod });
const getReservations = () => api.get('/api/products/reservations');
const createCreditAccount = (customerName) => api.post('/api/credit/accounts', { customer_name: customerName });
const getCreditAccounts = () => api.get('/api/credit/accounts');
const addCreditPurchase = (accountId, productId, amount) => api.post('/api/credit/purchases', { account_id: accountId, product_id: productId, amount });
const getSalesReport = (period) => api.get(`/api/reports/sales/${period}`);


export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  sellProduct,
  reserveProduct,
  getReservations,
  createCreditAccount,
  getCreditAccounts,
  addCreditPurchase,
  getSalesReport
};
