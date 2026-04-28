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
    case 'AGOTADO': return 'critical';
    default: return 'neutral';
  }
};

export const fetchEvents = async () => {
  const response = await api.get('/events');
  const backendEvents = response.data;

  return backendEvents.map(evt => ({
    id: evt._id,
    title: evt.nombre,
    imageUrl: evt.imagen,
    genres: evt.generos || [],
    date: formatDate(evt.fecha),
    time: `${evt.hora} HS`,
    venue: evt.lugar,
    price: formatPrice(evt.precio),
    artists: evt.artistas || [],
    status: evt.estado,
    statusTone: mapStatusTone(evt.estado),
    highlighted: false // Por defecto, se puede manejar lógica extra luego
  }));
};
