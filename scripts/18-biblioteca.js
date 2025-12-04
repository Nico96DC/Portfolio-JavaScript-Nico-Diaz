class Autor {
    constructor(nombre) {
        this.nombre = nombre;
        this.libros = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    eliminarLibro(index) {
        this.libros.splice(index, 1);
    }
}

class Libro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
    }

    mostrarInfo() {
        return `"${this.titulo}" de ${this.autor.nombre}`;
    }
}

let autores = [];

// Elementos del DOM
const formLibro = document.getElementById('form-libro');
const inputNombreAutor = document.getElementById('nombre-autor');
const inputTituloLibro = document.getElementById('titulo-libro');
const selectAutor = document.getElementById('autor-libro');
const listaAutores = document.getElementById('lista-autores');
const mensaje = document.getElementById('mensaje');
const btnLimpiar = document.getElementById('btn-limpiar');
const totalAutores = document.getElementById('total-autores');
const totalLibros = document.getElementById('total-libros');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const btnAgregarAutor = document.getElementById('btn-agregar-autor');
const btnAgregarLibro = document.getElementById('btn-agregar-libro');

// Cambiar tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tabName = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
    });
});

// Agregar autor
btnAgregarAutor.addEventListener('click', (e) => {
    e.preventDefault();
    
    const nombre = inputNombreAutor.value.trim();
    
    if (!nombre) {
        mostrarMensaje('Por favor, ingresa un nombre de autor', 'error');
        return;
    }
    
    // Verificar si el autor ya existe
    if (autores.find(a => a.nombre.toLowerCase() === nombre.toLowerCase())) {
        mostrarMensaje('Este autor ya está registrado', 'error');
        return;
    }
    
    const autor = new Autor(nombre);
    autores.push(autor);
    
    mostrarMensaje('Autor agregado correctamente', 'success');
    inputNombreAutor.value = '';
    inputNombreAutor.focus();
    
    actualizarLista();
    actualizarSelectAutores();
});

// Agregar libro
btnAgregarLibro.addEventListener('click', (e) => {
    e.preventDefault();
    
    const titulo = inputTituloLibro.value.trim();
    const autorIndex = selectAutor.value;
    
    if (!titulo) {
        mostrarMensaje('Por favor, ingresa un título', 'error');
        return;
    }
    
    if (autorIndex === '') {
        mostrarMensaje('Por favor, selecciona un autor', 'error');
        return;
    }
    
    const autor = autores[autorIndex];
    
    // Verificar si el libro ya existe para este autor
    if (autor.libros.find(l => l.titulo.toLowerCase() === titulo.toLowerCase())) {
        mostrarMensaje('Este libro ya existe para este autor', 'error');
        return;
    }
    
    const libro = new Libro(titulo, autor);
    autor.agregarLibro(libro);
    
    mostrarMensaje('Libro agregado correctamente', 'success');
    inputTituloLibro.value = '';
    selectAutor.value = '';
    inputTituloLibro.focus();
    
    actualizarLista();
});

// Actualizar lista de autores
function actualizarLista() {
    listaAutores.innerHTML = '';
    
    if (autores.length === 0) {
        listaAutores.innerHTML = '<div class="empty-state">No hay autores ni libros registrados</div>';
        totalAutores.textContent = '0';
        totalLibros.textContent = '0';
        return;
    }
    
    autores.forEach((autor, indexAutor) => {
        const card = document.createElement('div');
        card.className = 'autor-card';
        
        let librosHTML = '';
        if (autor.libros.length === 0) {
            librosHTML = '<p style="color: #999; font-style: italic; padding: 10px;">Sin libros registrados</p>';
        } else {
            librosHTML = `<ul class="libros-list">`;
            autor.libros.forEach((libro, indexLibro) => {
                librosHTML += `
                    <li class="libro-item">
                        <span class="libro-titulo">${libro.titulo}</span>
                        <button class="btn-eliminar-libro" onclick="eliminarLibro(${indexAutor}, ${indexLibro})">✕</button>
                    </li>
                `;
            });
            librosHTML += `</ul>`;
        }
        
        card.innerHTML = `
            <div class="autor-nombre">${autor.nombre}</div>
            ${librosHTML}
            <div class="cantidad-libros">
                <strong>${autor.libros.length}</strong> libro${autor.libros.length !== 1 ? 's' : ''}
            </div>
            <button class="btn-eliminar-autor" onclick="eliminarAutor(${indexAutor})">🗑️ Eliminar Autor</button>
        `;
        listaAutores.appendChild(card);
    });
    
    actualizarEstadisticas();
}

// Actualizar select de autores
function actualizarSelectAutores() {
    selectAutor.innerHTML = '<option value="">-- Selecciona un autor --</option>';
    autores.forEach((autor, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = autor.nombre;
        selectAutor.appendChild(option);
    });
}

// Eliminar libro
function eliminarLibro(indexAutor, indexLibro) {
    autores[indexAutor].eliminarLibro(indexLibro);
    mostrarMensaje('Libro eliminado', 'success');
    actualizarLista();
}

// Eliminar autor
function eliminarAutor(index) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${autores[index].nombre} y todos sus libros?`)) {
        autores.splice(index, 1);
        mostrarMensaje('Autor eliminado correctamente', 'success');
        actualizarLista();
        actualizarSelectAutores();
    }
}

// Actualizar estadísticas
function actualizarEstadisticas() {
    totalAutores.textContent = autores.length;
    const totalLibrosCuenta = autores.reduce((sum, a) => sum + a.libros.length, 0);
    totalLibros.textContent = totalLibrosCuenta;
}

// Limpiar biblioteca
btnLimpiar.addEventListener('click', () => {
    if (autores.length === 0) {
        mostrarMensaje('La biblioteca está vacía', 'error');
        return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar toda la biblioteca?')) {
        autores = [];
        mostrarMensaje('Biblioteca limpiada correctamente', 'success');
        actualizarLista();
        actualizarSelectAutores();
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
    actualizarSelectAutores();
});

export function bibliotecaVirtual() {
    // Esta función ya no es necesaria, pero se mantiene para compatibilidad
}
