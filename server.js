const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Ejecutar la conexión a la base de datos
connectDB();

const app = express();

// Middlewares fundamentales
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite leer los datos JSON que envíes por POST

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de VOY funcionando correctamente' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`.yellow.bold);
});