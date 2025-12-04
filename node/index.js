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
  'http://localhost:3000',  // servidor Node
  'http://localhost:5173',  // Vite dev server
  'http://localhost:5500',  // Live Server / Five Server
  'http://127.0.0.1:5500',  // Live Server / Five Server (alternativa)
  'http://localhost:8080',  // http-server u otros
  'http://127.0.0.1:8080'   // http-server u otros (alternativa)
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
const DATA_FILE = path.join(__dirname, 'datos.json');

// Función para leer datos del archivo JSON
function leerDatosJSON() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error.message);
  }
  // Si no existe o hay error, retornar datos por defecto
  return [
    { id: 1, nombre: "Elemento 1" },
    { id: 2, nombre: "Elemento 2" },
    { id: 3, nombre: "Elemento 3" }
  ];
}

// Función para escribir datos en el archivo JSON
function escribirDatosJSON(datos) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error al escribir el archivo JSON:', error.message);
    return false;
  }
}

// Cargar datos al iniciar el servidor
let objeto = leerDatosJSON();
console.log(`Datos cargados: ${objeto.length} elementos`);

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
  
  // Guardar en el archivo JSON
  if (escribirDatosJSON(objeto)) {
    res.status(201).json({ mensaje: 'Datos guardados correctamente', objeto: nuevo });
  } else {
    // Si falla la escritura, revertir el cambio en memoria
    objeto.pop();
    res.status(500).json({ mensaje: 'Error al guardar los datos en el archivo' });
  }
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
