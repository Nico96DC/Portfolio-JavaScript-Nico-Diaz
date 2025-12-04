
# Portfolio de Miniproyectos (JavaScript)

Proyecto personal que reúne varios miniproyectos en JavaScript creados como ejercicios y demos. Incluye tanto scripts que se ejecutan desde `index.html` como páginas HTML individuales en la carpeta `html/`.

**Objetivo:** agrupar ejemplos prácticos (DOM, eventos, fetch, almacenamiento local, módulos ES) para aprendizaje y demostraciones.

**Estructura principal**
- **`index.html`**: página principal que lanza varios miniproyectos.
- **`html/`**: páginas HTML independientes (miniproyectos con UI propia). Ejemplos:
	- `12-clima.html` — aplicación de clima
	- `07-reloj-dinamico.html` — reloj dinámico
	- `08-calculadora-grafica.html`, etc.
- **`scripts/`**: lógica JS de los miniproyectos y módulos. Archivos relevantes:
	- `01-calculadora.js` — calculadora simple
	- `02-adivinanza.js` — juego de adivinanza
	- `03-tablas-multiplicar.js` — generador de tablas
	- `04-conversor-temperatura.js` — conversor de unidades
	- `05-listado-compras.js` — gestión de listado de compras
	- `11-cronometro.js` — cronómetro
	- `12-clima.js` — consulta a la API de OpenWeatherMap (fetch)
	- `13-buscador.js` — buscador de usuarios (ejemplo de fetch)
	- `19-graficas.js` — ejemplos con gráficos

	- `main.js` — script que enlaza `index.html` con los miniproyectos

	- `clase15/` — ejemplo modular con `ui.js`, `storage.js`, `tasks.js`
- **`styles/`**: hojas de estilo por miniproyecto y `styles.css` global.
- **`LICENSE`**: archivo de licencia incluido.

**Tabla de contenido**

- [Estructura principal](#estructura-principal)
- [Miniproyectos (resumen)](#miniproyectos-resumen)
- [Cómo ejecutar](#como-ejecutar)
- [API key y configuración local](#api-key-y-configuracion-local)
- [Notas y recomendaciones](#notas-y-recomendaciones)
- [Contribuciones](#contribuciones)

## Miniproyectos (resumen)
Aquí un resumen breve por cada miniproyecto más relevante (qué pide y qué devuelve):

- `01-calculadora.js` — Calculadora simple
	- Entrada: operaciones solicitadas mediante `prompt` y botones en `index.html`.
	- Salida: resultado mostrado por `alert` / consola.
	- Ejecuta desde: `index.html` (script).

- `02-adivinanza.js` — Juego de adivinanza
	- Entrada: número introducido por usuario vía `prompt`.
	- Salida: mensajes de acierto/error por `alert` y `console.log`.

- `03-tablas-multiplicar.js` — Generador de tablas
	- Entrada: número y rango via `prompt`.
	- Salida: tabla mostrada en `alert` y `console`.

- `04-conversor-temperatura.js` — Conversor de unidades
	- Entrada: temperatura y unidad a convertir.
	- Salida: valores convertidos por `alert` / `console`.

- `05-listado-compras.js`, `09-lista-tareas.js`, `14-notas.js` — Listados y CRUD en memoria
	- Entrada: formularios / prompts.
	- Salida: lista renderizada en DOM (cuando aplica) y persistencia local en `localStorage` en algunas versiones.

- `11-cronometro.js` — Cronómetro
	- Entrada: botones Start/Stop/Reset en pantalla.
	- Salida: tiempo mostrado en pantalla.

- `12-clima.js` — Aplicación de clima (fetch OpenWeatherMap)
	- Entrada: nombre de ciudad (input en la UI).
	- Salida: datos de temperatura, humedad, descripción y viento mostrados en el DOM.
	- Nota: requiere `OPENWEATHER_API_KEY` local (ver sección siguiente).

- `13-buscador.js` — Buscador de usuarios (ejemplos de `fetch` a APIs públicas)
	- Entrada: texto de búsqueda.
	- Salida: resultados renderizados en el DOM.

- `19-graficas.js` — Ejemplos con gráficos
	- Entrada: datos simulados o cargados.
	- Salida: gráficos renderizados (usa librerías de cliente si aplica).

## Cómo ejecutar
- Opción rápida (sin servidor): abrir `index.html` en el navegador (doble clic). Algunos ejemplos que usan `fetch` pueden fallar por políticas CORS si se abren con el esquema `file://`.
- Opción recomendada (local server): desde la raíz del proyecto ejecutar un servidor HTTP simple.

	- Usando `npx` (Node.js instalado):

		```powershell
		npx http-server -c-1
		```

	- O con `Live Server` de VS Code: botón "Go Live" o abrir la carpeta en VS Code y lanzar Live Server.

- Después, en el navegador ir a `http://localhost:8080` (u otro puerto que indique la herramienta) y usar `index.html` o abrir una página dentro de `html/` directamente. Por ejemplo:

	- `http://localhost:8080/html/12-clima.html` — abrir app de clima en su propia página.

** Instrucciones para ejecutar el proyecto Node (número 20) **

Requisitos
- Node.js (v16+ recomendado)
- npm (incluido con Node.js)

Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd Portfolio-JavaScript-Nico-Diaz
```

Instalar dependencias
```bash
npm init
```
Configurar el proyecto para poder abrirlo a través del editor de código, y luego instalar la siguiente dependencia:
```bash
npm install --save express
```

Ejecutar servidor Node (sirve la API y puede servir archivos estáticos si está configurado)
```bash
npm start
```

- Luego de ello, se puede ejecutar el script desde el botón definido como Proyecto 20, el cual redirige a la página: http://localhost:3000/

## API key y configuración local
Para evitar subir claves sensibles al repositorio, el proyecto ahora incluye artefactos de ejemplo para configurar la clave de OpenWeatherMap localmente:

- `.env.example`: archivo de ejemplo con la variable necesaria.
- `scripts/config.example.js`: archivo de ejemplo que asigna la clave a `window.OPENWEATHER_API_KEY`.

Recomendación práctica (método más simple para desarrollarlo localmente):

1. Copiar `scripts/config.example.js` a `scripts/config.js` y reemplazar el valor por tu clave de OpenWeatherMap.
2. `scripts/config.js` está incluido en `.gitignore` (no se sube al repo).
3. Abrir la página (con servidor local) — `scripts/12-clima.js` buscará `window.OPENWEATHER_API_KEY` y la usará si está presente; si no, usa la clave embebida como fallback para pruebas rápidas.

También se incluye `.env.example` para referencia si en algún flujo de CI/local se prefiere usar variables de entorno. El navegador no puede leer `.env` directamente sin un paso de build/server que inyecte variables, por eso el enfoque de `config.js` es el más directo para este proyecto estático.

## Contribuciones
- Este repositorio es una colección personal, pero las mejoras son bienvenidas mediante pull requests: documentar mejor, extraer claves, mejorar accesibilidad y estilos.
