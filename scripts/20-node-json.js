const API_URL = 'http://localhost:3000';

// Elementos del DOM
const formAgregar = document.getElementById('form-agregar');
const inputNombre = document.getElementById('nombre');
const listaDatos = document.getElementById('lista-datos');
const mensaje = document.getElementById('mensaje');
const btnRecargar = document.getElementById('btn-recargar');
const serverStatus = document.getElementById('server-status');

// Verificar estado del servidor al cargar
async function verificarServidor() {
    try {
        const response = await fetch(`${API_URL}/leer-datos`);
        if (response.ok) {
            serverStatus.textContent = '✅ Conectado';
            serverStatus.className = 'online';
            cargarDatos();
        } else {
            mostrarErrorConexion();
        }
    } catch (error) {
        mostrarErrorConexion();
    }
}

function mostrarErrorConexion() {
    serverStatus.textContent = '❌ Desconectado';
    serverStatus.className = 'offline';
    mostrarMensaje('El servidor no está disponible. Asegúrate de ejecutar: npm start', 'error');
}

// Cargar datos desde la API
async function cargarDatos() {
    try {
        const response = await fetch(`${API_URL}/leer-datos`);
        if (!response.ok) throw new Error('Error al obtener datos');
        
        const datos = await response.json();
        mostrarDatos(datos);
    } catch (error) {
        console.error('Error al cargar datos:', error);
        mostrarMensaje('Error al cargar los datos', 'error');
    }
}

// Mostrar datos en la lista
function mostrarDatos(datos) {
    listaDatos.innerHTML = '';
    
    if (datos.length === 0) {
        listaDatos.innerHTML = '<div class="empty-state">No hay elementos para mostrar</div>';
        return;
    }
    
    datos.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="item-id">#${item.id}</span>
            <span class="item-nombre">${item.nombre}</span>
        `;
        listaDatos.appendChild(li);
    });
}

// Agregar nuevo elemento
async function agregarDato(nombre) {
    try {
        const response = await fetch(`${API_URL}/guardar-datos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.mensaje || 'Error al guardar');
        }
        
        const resultado = await response.json();
        mostrarMensaje(resultado.mensaje, 'success');
        cargarDatos();
        inputNombre.value = '';
        inputNombre.focus();
    } catch (error) {
        console.error('Error al agregar dato:', error);
        mostrarMensaje(error.message || 'Error al agregar el elemento', 'error');
    }
}

// Mostrar mensajes
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
    
    setTimeout(() => {
        mensaje.className = '';
        mensaje.textContent = '';
    }, 5000);
}

// Event listeners
formAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    
    if (!nombre) {
        mostrarMensaje('Por favor, ingresa un nombre', 'error');
        return;
    }
    
    agregarDato(nombre);
});

btnRecargar.addEventListener('click', () => {
    verificarServidor();
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', verificarServidor);
