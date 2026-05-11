import api from './api';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // Esperamos { token, usuario: { id, nombre, email } }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.mensaje || 'Credenciales inválidas');
    }
    throw new Error('Error de conexión con el servidor');
  }
};
