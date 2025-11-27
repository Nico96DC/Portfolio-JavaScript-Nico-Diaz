const pantalla = document.getElementById('pantalla');
// seleccionar botones: preferir el contenedor con id "botones" pero
// usar como fallback cualquier botón dentro de `.calculadora`
const botones = document.querySelectorAll('#botones button, .calculadora button');

let necesitaBorrar = false; // true después de mostrar resultado o "Error"

if (!pantalla) {
    console.error('No se encontró el elemento #pantalla');
} else {
    // helpers
    function esOperador(valor) {
        return ['+', '-', '*', '/', '(', ')'].includes(valor);
    }

    function evaluarExpresion() {
        try {
            const expr = pantalla.value.replace(/,/g, '.');
            const resultado = eval(expr); // uso local; evitar con datos externos
            pantalla.value = Number.isFinite(resultado) ? String(resultado) : 'Error';
        } catch {
            pantalla.value = 'Error';
        }
        necesitaBorrar = true;
    }

    function cambioSigno() {
        const texto = pantalla.value.trim();
        const num = Number(texto.replace(/,/g, '.'));
        if (Number.isFinite(num)) {
            pantalla.value = String(-num);
            necesitaBorrar = true;
            return;
        }
        try {
            const res = eval(texto.replace(/,/g, '.'));
            if (Number.isFinite(res)) {
                pantalla.value = String(-res);
                necesitaBorrar = true;
            }
        } catch {
        }
    }

    function manejarEntrada(valor) {
        if (valor === 'C') {
            pantalla.value = '';
            necesitaBorrar = false;
            return;
        }
        if (valor === '=') {
            evaluarExpresion();
            return;
        }
        if (valor === '+/-') {
            cambioSigno();
            return;
        }

        // Si la pantalla muestra "Error", limpiar antes de cualquier cosa
        if (pantalla.value === 'Error') {
            pantalla.value = '';
            necesitaBorrar = false;
        }

        // Si el contenido actual es resultado/error y no es operador, borrar antes de añadir.
        // Permitir operadores para continuar operaciones sobre el resultado.
        if (necesitaBorrar) {
            if (esOperador(valor)) {
                // mantener el resultado y permitir concatenar el operador
                necesitaBorrar = false;
            } else {
                // para cualquier otra entrada (número, coma, etc.) empezar de nuevo
                pantalla.value = '';
                necesitaBorrar = false;
            }
        }

        if (valor === ',') {
            // representar decimal con punto internamente
            pantalla.value += '.';
            return;
        }
        // por defecto añadir número u operador
        pantalla.value += valor;
    }

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const valor = boton.textContent.trim();
            manejarEntrada(valor);
        });
    });

    // Soporte teclado
    document.addEventListener('keydown', (evento) => {
        if (evento.ctrlKey || evento.metaKey) return; // dejar atajos del sistema
        const tecla = evento.key;

        // Si la pantalla muestra "Error", limpiar antes de procesar
        if (pantalla.value === 'Error') {
            pantalla.value = '';
            necesitaBorrar = false;
        }

        // Comportamiento tras resultado: permitir operadores para continuar, pero
        // números/punto deben limpiar la pantalla (iniciar nueva entrada).
        if (necesitaBorrar) {
            if (['+', '-', '*', '/', '(', ')'].includes(tecla)) {
                // permitir concatenar operador al resultado
                necesitaBorrar = false;
                // seguir procesando abajo para añadir el operador
            } else if (tecla === 'Backspace') {
                // Backspace debe borrar la pantalla (comportamiento deseado)
                pantalla.value = '';
                necesitaBorrar = false;
                evento.preventDefault();
                return;
            } else if (tecla === 'Enter' || tecla === '=') {
                // dejar que Enter evalúe de nuevo si se desea
                // no limpiar aquí
            } else {
                // número, punto, letras, etc. => limpiar y continuar
                pantalla.value = '';
                necesitaBorrar = false;
            }
        }

        if (/^[0-9]$/.test(tecla)) {
            pantalla.value += tecla;
            evento.preventDefault();
            return;
        }

        if (['+', '-', '*', '/', '(', ')'].includes(tecla)) {
            pantalla.value += tecla;
            evento.preventDefault();
            return;
        }

        if (tecla === 'Enter' || tecla === '=') {
            evaluarExpresion();
            evento.preventDefault();
            return;
        }

        if (tecla === 'Backspace') {
            // borrar último carácter
            pantalla.value = pantalla.value.slice(0, -1);
            evento.preventDefault();
            return;
        }

        if (tecla === 'Escape' || tecla === 'Delete' || tecla.toLowerCase() === 'c') {
            pantalla.value = '';
            necesitaBorrar = false;
            evento.preventDefault();
            return;
        }

        if (tecla === '.' || tecla === ',') {
            pantalla.value += '.';
            evento.preventDefault();
            return;
        }

        if (tecla.toLowerCase() === 'p' || tecla === 'F9') {
            cambioSigno();
            evento.preventDefault();
            return;
        }
    });
}