import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('voy_token'); // clave centralizada en AuthContext
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Error de red o servidor caído:', error);
    } else if (error.response.status === 401) {
      console.error('No autorizado - Token expirado o inválido');
      // Lógica de logout iría aquí
    }
    return Promise.reject(error);
  }
);

export default api;
