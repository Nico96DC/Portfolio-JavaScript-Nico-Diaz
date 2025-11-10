const formulario = document.getElementById('formulario-registro');
const mensaje = document.getElementById('mensaje');
const key = 'usuarios_registrados';

function mostrarMensaje(texto, color = 'red') {
    // Mostrar inmediatamente
    mensaje.classList.remove('oculto');
    mensaje.style.color = color;
    mensaje.textContent = texto;

    // Limpiar timeout previo si existe
    if (mensaje._timeout) clearTimeout(mensaje._timeout);

    // Añadir clase 'oculto' después de 3s para iniciar la transición a transparente
    mensaje._timeout = setTimeout(() => mensaje.classList.add('oculto'), 3000);
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    mensaje.textContent = '';
    // Opcional: ocultar cualquier mensaje previo antes de validar
    mensaje.classList.add('oculto');

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let usuarios = JSON.parse(localStorage.getItem(key) || '[]');
    const usuarioExistente = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!nombre || !email || !password) {
        mostrarMensaje('Por favor, complete todos los campos.');
        return;
    }

    if (password.length < 6) {
        mostrarMensaje('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        mostrarMensaje('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    if (usuarioExistente) {
        mostrarMensaje('El correo electrónico ya está registrado.');
        return;
    }

    mostrarMensaje(`Registro exitoso. ¡Le damos la bienvenida, ${nombre}!`, 'lightgreen');

    usuarios.push({ nombre, email, password, registradoEn: Date.now() });
    localStorage.setItem(key, JSON.stringify(usuarios));

    formulario.reset();
});
