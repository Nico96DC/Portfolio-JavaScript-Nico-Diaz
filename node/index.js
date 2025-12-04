// Creación de script para leer y escribir JSON
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Habilitar CORS solo en desarrollo y/o para orígenes permitidos
const WHITELIST = [
  'http://localhost:3000', // servidor Node (por si acaso)
  'http://localhost:5173'  // Vite dev server (ajusta si usas otro puerto)
];

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: function(origin, callback) {
      // permitir peticiones sin origin (p. ej. servidor-side / Postman)
      if (!origin) return callback(null, true);
      if (WHITELIST.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error('Origen no permitido por CORS'));
    }
  }));
}

// Rutas API
let objeto = [
  { id: 1, nombre: "Elemento 1" },
  { id: 2, nombre: "Elemento 2" },
  { id: 3, nombre: "Elemento 3" }
];

function siguienteId() {
  return objeto.length ? Math.max(...objeto.map(o => o.id)) + 1 : 1;
}

app.get('/leer-datos', (req, res) => {
  res.json(objeto);
});

app.post('/guardar-datos', (req, res) => {
  const nombre = (req.body.nombre || '').toString().trim();
  if (!nombre) return res.status(400).json({ mensaje: 'El campo "nombre" es requerido' });

  const nuevo = { id: siguienteId(), nombre };
  objeto.push(nuevo);
  res.status(201).json({ mensaje: 'Datos guardados correctamente', objeto: nuevo });
});

// Servir estáticos: primero el build de React (si existe), luego la raíz del repo
const reactDist = path.join(__dirname, '..', 'react-app', 'dist');
if (fs.existsSync(reactDist)) {
  app.use(express.static(reactDist));
  // fallback para SPA: devolver index.html para rutas no API
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/leer-datos') || req.path.startsWith('/guardar-datos')) return next();
    res.sendFile(path.join(reactDist, 'index.html'));
  });
} 

// servir archivos estáticos de la raíz (HTML estáticos, css, scripts)
app.use(express.static(path.join(__dirname, '..')));

// 404 para API
app.use((req, res, next) => {
  if (req.path.startsWith('/leer-datos') || req.path.startsWith('/guardar-datos')) {
    return res.status(404).json({ mensaje: 'Ruta API no encontrada' });
  }
  next();
});

// manejador de errores simple
app.use((err, req, res, next) => {
  console.error(err && err.message ? err.message : err);
  if (err.message && err.message.includes('CORS')) {
    return res.status(401).json({ mensaje: 'CORS: origen no permitido' });
  }
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
