// src/services/reportService.js
import api from './api';

const getSalesReport = (period) => api.get(`/reports/sales/${period}`);

export default {
  getSalesReport,
};
