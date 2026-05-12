import api from './api';

const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = MONTHS[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
};

const formatPrice = (price) => {
  if (price === 0) return "Gratis";
  // Formatear a pesos argentinos
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

const mapStatusTone = (status) => {
  switch (status) {
    case 'DISPONIBLE': return 'success';
    case 'ÚLTIMAS ENTRADAS': return 'warning';
    case 'AGOTADO': return 'danger';
    default: return 'neutral';
  }
};

export const fetchEvents = async (params = {}) => {
  try {
    const response = await api.get('/events', { params });
    const backendEvents = response.data;

    return backendEvents.map(evt => ({
      id: evt._id,
      title: evt.nombre,
      imageUrl: evt.imagen || 'https://via.placeholder.com/400',
      genres: evt.generos || [],
      date: evt.fecha ? formatDate(evt.fecha) : 'Fecha a confirmar',
      time: evt.hora ? `${evt.hora} HS` : '',
      venue: evt.lugar || 'Lugar a confirmar',
      price: evt.precio !== undefined ? formatPrice(evt.precio) : formatPrice(0),
      artists: evt.artistas || [],
      status: evt.estado || 'DISPONIBLE',
      statusTone: mapStatusTone(evt.estado || 'DISPONIBLE'),
      highlighted: false
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error(error.response?.data?.mensaje || "Error al obtener eventos del servidor");
  }
};

export const fetchEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    const evt = response.data;
    
    return {
      id: evt._id,
      title: evt.nombre,
      imageUrl: evt.imagen || 'https://via.placeholder.com/400',
      genres: evt.generos || [],
      date: evt.fecha ? formatDate(evt.fecha) : 'Fecha a confirmar',
      time: evt.hora ? `${evt.hora} HS` : '',
      venue: evt.lugar || 'Lugar a confirmar',
      price: evt.precio !== undefined ? formatPrice(evt.precio) : formatPrice(0),
      artists: evt.artistas || [],
      status: evt.estado || 'DISPONIBLE',
      statusTone: mapStatusTone(evt.estado || 'DISPONIBLE'),
    };
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error; // Re-lanzamos el error original para preservar error.response.status (ej: 404)
  }
};
