class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    mostrarInfo() {
        return `${this.nombre} - $${this.precio.toFixed(2)}`;
    }
}

let productos = [];

// Elementos del DOM
const formProducto = document.getElementById('form-producto');
const inputNombre = document.getElementById('nombre');
const inputPrecio = document.getElementById('precio');
const listaProductos = document.getElementById('lista-productos');
const mensaje = document.getElementById('mensaje');
const btnLimpiar = document.getElementById('btn-limpiar');
const totalProductos = document.getElementById('total-productos');
const precioTotal = document.getElementById('precio-total');

// Agregar producto
formProducto.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = inputNombre.value.trim();
    const precio = parseFloat(inputPrecio.value);
    
    if (!nombre || precio <= 0) {
        mostrarMensaje('Por favor, ingresa datos válidos', 'error');
        return;
    }
    
    const producto = new Producto(nombre, precio);
    productos.push(producto);
    
    mostrarMensaje('Producto agregado correctamente', 'success');
    inputNombre.value = '';
    inputPrecio.value = '';
    inputNombre.focus();
    
    actualizarLista();
});

// Mostrar lista de productos
function actualizarLista() {
    listaProductos.innerHTML = '';
    
    if (productos.length === 0) {
        listaProductos.innerHTML = '<div class="empty-state">No hay productos agregados</div>';
        totalProductos.textContent = '0';
        precioTotal.textContent = '$0.00';
        return;
    }
    
    productos.forEach((producto, index) => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <div class="producto-nombre">${producto.nombre}</div>
            <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
            <button class="btn-eliminar" onclick="eliminarProducto(${index})">🗑️ Eliminar</button>
        `;
        listaProductos.appendChild(card);
    });
    
    actualizarEstadisticas();
}

// Eliminar producto
function eliminarProducto(index) {
    productos.splice(index, 1);
    mostrarMensaje('Producto eliminado', 'success');
    actualizarLista();
}

// Actualizar estadísticas
function actualizarEstadisticas() {
    totalProductos.textContent = productos.length;
    const total = productos.reduce((sum, p) => sum + p.precio, 0);
    precioTotal.textContent = `$${total.toFixed(2)}`;
}

// Limpiar lista
btnLimpiar.addEventListener('click', () => {
    if (productos.length === 0) {
        mostrarMensaje('No hay productos para limpiar', 'error');
        return;
    }
    
    if (confirm('¿Estás seguro de que deseas limpiar la lista de productos?')) {
        productos = [];
        mostrarMensaje('Lista limpiada correctamente', 'success');
        actualizarLista();
    }
});

// Mostrar mensaje
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
    
    setTimeout(() => {
        mensaje.className = '';
        mensaje.textContent = '';
    }, 3000);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    actualizarLista();
});
