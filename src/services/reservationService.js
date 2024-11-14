// src/services/reservationService.js
import api from './api';

const getReservations = () => api.get('/products/reservations');
const createReservation = (reservationData) => api.post('/products/reserve', reservationData);

export default {
  getReservations,
  createReservation,
};
