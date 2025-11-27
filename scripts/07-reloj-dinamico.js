export function iniciarReloj() {
    function actualizar() {
        const ahora = new Date();
        const horasNum = ahora.getHours();
        const horas = String(horasNum).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');

        const tiempo = document.getElementById('reloj');
        if (!tiempo) return; // protección si el elemento no existe
        tiempo.textContent = `${horas}:${minutos}:${segundos}`;

        // asignar clase en el <body> según la hora
        document.body.classList.remove('mañana', 'tarde', 'noche');
        if (horasNum >= 6 && horasNum < 12) document.body.classList.add('mañana');
        else if (horasNum >= 12 && horasNum < 18) document.body.classList.add('tarde');
        else document.body.classList.add('noche');
    }

    // actualización inmediata y cada segundo
    actualizar();
    return setInterval(actualizar, 1000);
}