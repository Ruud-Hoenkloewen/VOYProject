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

// MOCK DATA TEMPORAL
const mockEvents = [
  {
    _id: "69ffc21b6e20dc6302526a4f",
    nombre: "Festival de Rock Tucumano",
    imagen: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
    generos: ["Rock", "Alternativo"],
    fecha: "2026-05-20T00:00:00.000Z",
    hora: "21:00",
    lugar: "Club Tucumán BB",
    precio: 5000,
    artistas: [{ nombre: "Banda A" }, { nombre: "Banda B" }],
    estado: "DISPONIBLE"
  },
  {
    _id: "mock_2",
    nombre: "Feria Gastronómica",
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    generos: ["Culinaria"],
    fecha: "2026-04-30T00:00:00.000Z",
    hora: "12:00",
    lugar: "Parque 9 de Julio",
    precio: 0,
    artistas: [{ nombre: "Chef Local" }],
    estado: "ÚLTIMAS ENTRADAS"
  },
  {
    _id: "mock_3",
    nombre: "Cine bajo las estrellas",
    imagen: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    generos: ["Cine", "Familiar"],
    fecha: "2026-05-15T00:00:00.000Z",
    hora: "20:30",
    lugar: "Plaza Independencia",
    precio: 2000,
    artistas: [{ nombre: "Director Invitado" }],
    estado: "AGOTADO"
  }
];

export const fetchEvents = async (params = {}) => {
  // Cuando vuelvan a habilitar la API real, esto enviará el query string (ej: ?limit=4)
  // const response = await api.get('/events', { params });
  // const backendEvents = response.data;
  
  // Simulando llamada a API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulamos el límite en los Mocks si existe el parámetro
  let backendEvents = [...mockEvents];
  if (params.limit) {
    backendEvents = backendEvents.slice(0, Number(params.limit));
  }

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
    highlighted: false
  }));
};

export const fetchEventById = async (id) => {
  // const response = await api.get(`/events/${id}`);
  // const evt = response.data;
  
  // Simulando llamada a API
  await new Promise(resolve => setTimeout(resolve, 800));
  const evt = mockEvents.find(e => e._id === id);
  
  if (!evt) {
    const err = new Error("Not found");
    err.response = { status: 404 };
    throw err;
  }
  
  return {
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
  };
};
