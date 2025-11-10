export function relojDinamico() {
    const ahora = new Date();
    const horas = ahora.getHours(); // número, no string
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    const tiempo = document.getElementById("reloj");
    const mensajeEl = document.getElementById("mensaje");
    if (!tiempo) return; // seguridad si no existe el elemento

    tiempo.textContent = `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;

    // aplicar la clase al body para que afecte a toda la página
    const body = document.body;
    body.classList.remove('mañana', 'tarde', 'noche');

    if (horas >= 6 && horas < 12) {
        body.classList.add('mañana');      // 06:00-11:59
        if (mensajeEl) mensajeEl.textContent = 'Buenos días';
    }
    else if (horas >= 12 && horas < 18) {
        body.classList.add('tarde'); // 12:00-17:59
        if (mensajeEl) mensajeEl.textContent = 'Buenas tardes';
    }
    else {
        body.classList.add('noche'); // 18:00-05:59
        if (mensajeEl) mensajeEl.textContent = 'Buenas noches';
    }
}

// función helper para arrancar el reloj sincronizado al siguiente segundo
export function iniciarReloj() {
    function reloj() {
        relojDinamico();
        const ahora = new Date();
        const delay = 1000 - ahora.getMilliseconds(); // esperar hasta el próximo segundo exacto
        setTimeout(reloj, delay);
    }
    reloj();
}