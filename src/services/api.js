// src/services/api.js
import axios from 'axios';

// Crear una instancia de Axios con la URL base obtenida de las variables de entorno
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para manejar errores (opcional)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
