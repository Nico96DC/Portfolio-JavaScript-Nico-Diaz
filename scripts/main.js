// importando desde scripts
import { calculadoraSimple } from "./01-calculadora.js";
import { adivinanzaNumero } from "./02-adivinanza.js";
import { generadorTablas } from "./03-tablas-multiplicar.js";
import { conversorTemperatura } from "./04-conversor-temperatura.js";
import { listadoCompras } from "./05-listado-compras.js";
import { agendaContactos } from "./06-agenda-contactos.js";

import { bibliotecaVirtual } from "./18-biblioteca.js";

// carga de miniproyectos
document.addEventListener("DOMContentLoaded", () => {
    // cargado de scripts
    const btnMini1 = document.getElementById("mini1");
    if (btnMini1) btnMini1.addEventListener("click", calculadoraSimple);

    const btnMini2 = document.getElementById("mini2");
    if (btnMini2) btnMini2.addEventListener("click", adivinanzaNumero);

    const btnMini3 = document.getElementById("mini3");
    if (btnMini3) btnMini3.addEventListener("click", generadorTablas);

    const btnMini4 = document.getElementById("mini4");
    if (btnMini4) btnMini4.addEventListener("click", conversorTemperatura);

    const btnMini5 = document.getElementById("mini5");
    if (btnMini5) btnMini5.addEventListener("click", listadoCompras);

    const btnMini6 = document.getElementById("mini6");
    if (btnMini6) btnMini6.addEventListener("click", agendaContactos);

    // cargado de html externos
    const btnMini7 = document.getElementById("mini7");
    if (btnMini7) btnMini7.addEventListener("click", () => {
        window.location.href = './html/07-reloj-dinamico.html';
    });

    const btnMini8 = document.getElementById("mini8");
    if (btnMini8) btnMini8.addEventListener("click", () => {
        window.location.href = './html/08-calculadora-grafica.html';
    });

    const btnMini9 = document.getElementById("mini9");
    if (btnMini9) btnMini9.addEventListener("click", () => {
        window.location.href = './html/09-lista-tareas.html';
    });

    const btnMini10 = document.getElementById("mini10");
    if (btnMini10) btnMini10.addEventListener("click", () => {
        window.location.href = './html/10-formulario-registro.html';
    });

    const btnMini11 = document.getElementById("mini11");
    if (btnMini11) btnMini11.addEventListener("click", () => {
        window.location.href = './html/11-cronometro.html';
    });

    const btnMini12 = document.getElementById("mini12");
    if (btnMini12) btnMini12.addEventListener("click", () => {
        window.location.href = './html/12-clima.html';
    });

    const btnMini13 = document.getElementById("mini13");
    if (btnMini13) btnMini13.addEventListener("click", () => {
        window.location.href = './html/13-buscador.html';
    });

    const btnMini14 = document.getElementById("mini14");
    if (btnMini14) btnMini14.addEventListener("click", () => {
        window.location.href = './html/14-notas.html';
    });

    const btnMini15 = document.getElementById("mini15");
    if (btnMini15) btnMini15.addEventListener("click", () => {
        window.location.href = './html/15-modulos-es.html';
    });

    const btnMini18 = document.getElementById("mini18");
    if (btnMini18) btnMini18.addEventListener("click", bibliotecaVirtual);
});