// src/services/salesService.js
import api from './api';

const recordSale = (saleData) => api.post('/products/sale', saleData);

export default {
  recordSale,
};
