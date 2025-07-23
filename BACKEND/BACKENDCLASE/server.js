const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rutas
const organizadorRutes = require('./src/routers/organizadorRutes');
app.use('/api/tareas', organizadorRutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🖥 Servidor corriendo en http://localhost:${PORT} 👾`);
});