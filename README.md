
# Portfolio de Miniproyectos (JavaScript)

Proyecto personal que reúne varios miniproyectos en JavaScript creados como ejercicios y demos. Incluye tanto scripts que se ejecutan desde `index.html` como páginas HTML individuales en la carpeta `html/`.

**Objetivo:** agrupar ejemplos prácticos (DOM, eventos, fetch, almacenamiento local, módulos ES) para aprendizaje y demostraciones.

**Fecha:** versión presente en el repositorio (actualizada el 1 de diciembre de 2025).

**Estructura principal**
- **`index.html`**: Página principal que lanza varios miniproyectos.
- **`html/`**: Páginas HTML independientes con UI propia, los cuales son:
	- `07-reloj-dinamico.html`: Reloj dinámico con colores de texto y fondo variables según el horario
	- `08-calculadora-grafica.html`: Calculadora gráfica operativa con botones
    - `09-lista-tareas.html`: Listado de tareas con opciones de gestión
	- `12-clima.html`: Aplicación de clima que muestra detalles sobre una ubicación determinada
- **`scripts/`**: Lógica JS de los miniproyectos y módulos. Archivos relevantes:
	- `01-calculadora.js`: Calculadora simple a través de alertas
	- `02-adivinanza.js`: Juego de adivinanza
	- `03-tablas-multiplicar.js`: Generador de tablas de multiplicar
	- `04-conversor-temperatura.js`: Conversor de unidades de temperatura a Celsius, Fahrenheit y Kelvin
	- `05-listado-compras.js`: Gestión de listado de compras
	- `11-cronometro.js`: Cronómetro con opciones de inicio, pausa y detenido
	- `12-clima.js`: Consulta a la API de OpenWeatherMap (fetch)
	- `13-buscador.js`: Buscador de usuarios (ejemplo de fetch)
	- `19-graficas.js`: Ejemplos con gráficos

	- `main.js`: Script que enlaza `index.html` con los miniproyectos

	- `clase15/`: Ejemplo modular con `ui.js`, `storage.js`, `tasks.js`
- **`styles/`**: hojas de estilo por miniproyecto y `styles.css` global.
- **`LICENSE`**: archivo de licencia incluido.

Cómo ejecutar
- Opción rápida (sin servidor): abrir `index.html` en el navegador (doble clic). Algunos ejemplos que usan `fetch` pueden fallar por políticas CORS si se abren con el esquema `file://`.
- Opción recomendada (local server): desde la raíz del proyecto ejecutar un servidor HTTP simple.

	- Usando `npx` (Node.js instalado):

		```powershell
		npx http-server -c-1
		```

	- O con `Live Server` de VS Code: botón "Go Live" o abrir la carpeta en VS Code y lanzar Live Server.

- Después, en el navegador ir a `http://localhost:8080` (u otro puerto que indique la herramienta) y usar `index.html`.

Notas y recomendaciones
- `12-clima.js` contiene una `apiKey` embebida en el código. Para pruebas rápidas está bien, pero se recomienda retirar la clave del repositorio y usar variables de entorno o un archivo de configuración local antes de publicar.
- Las páginas dentro de `html/` son versiones con interfaz propia; `index.html` ejecuta otras versiones integradas vía `scripts/main.js`.
- Muchos ejemplos usan `prompt`, `alert` y `console.log` como técnicas pedagógicas. Para producción, sustituir por UI y manejo de errores más robusto.

Contribuciones
- Este repositorio es un collection personal, pero puedes proponer mejoras mediante pull requests: documentar mejor, extraer claves, mejorar accesibilidad y estilos.

Contacto
- Autor: `Nico Diaz` (contacto en el repositorio)

Si quieres, puedo:
- Extraer la `apiKey` de `scripts/12-clima.js` a un archivo de configuración `.env.example`.
- Añadir instrucciones más detalladas para cada miniproyecto.

