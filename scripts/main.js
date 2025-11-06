import { calculadoraSimple } from "./01-calculadora.js";
import { adivinanzaNumero } from "./02-adivinanza.js";
import { generadorTablas } from "./03-tablas-multiplicar.js";
import { conversorTemperatura } from "./04-conversor-temperatura.js";
import { listadoCompras } from "./05-listado-compras.js";
import { agendaContactos } from "./06-agenda-contactos.js";
import { relojDinamico } from "./07-reloj-dinamico.js";

document.addEventListener("DOMContentLoaded", () => {
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

    const btnMini7 = document.getElementById("mini7");
    if (btnMini7) btnMini7.addEventListener("click", relojDinamico);
});