let intervalo = null;
let contabilizar = 0;
let transcurrido = 0;
let inicio = false;

function formatoTiempo(totalMs) {
    const horas = String(Math.floor(totalMs / 3600000)).padStart(2, '0');
    const minutos = String(Math.floor((totalMs % 3600000) / 60000)).padStart(2, '0');
    const segundos = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, '0');
    const milisegundos = String(totalMs % 1000).padStart(3, '0');
    return `${horas}:${minutos}:${segundos}.${milisegundos}`;
}

function actualizarCronometro() {
    const totalMs = transcurrido + (contabilizar ? (Date.now() - contabilizar) : 0);
    const el = document.getElementById('cronometro');
    if (el) el.textContent = formatoTiempo(totalMs);
}

document.getElementById('iniciar').addEventListener('click', () => {
    inicio = true;
    if (!intervalo) {
        contabilizar = Date.now();
        intervalo = setInterval(actualizarCronometro, 33);
    }
});

document.getElementById('pausar').addEventListener('click', () => {
    if (!inicio) {
        return;
    } else {
        if (!intervalo) {
            contabilizar = Date.now();
            intervalo = setInterval(actualizarCronometro, 33);
            return;
        }
        clearInterval(intervalo);
        intervalo = null;
        transcurrido += Date.now() - contabilizar;
        contabilizar = 0;
        actualizarCronometro();
    }
});

document.getElementById('detener').addEventListener('click', () => {
    clearInterval(intervalo);
    intervalo = null;
    contabilizar = 0;
    transcurrido = 0;
    actualizarCronometro();
    inicio = false;
});

actualizarCronometro();