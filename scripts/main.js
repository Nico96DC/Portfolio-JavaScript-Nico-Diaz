import { calculadoraSimple } from "./01-calculadora.js";
// import { adivinanzaNumero } from "./02-adivinanza.js";

document.addEventListener("DOMContentLoaded", () => {
    const btnMini1 = document.getElementById("mini1");
    if (btnMini1) btnMini1.addEventListener("click", calculadoraSimple);
/*
    const btnMini2 = document.getElementById("mini2");
    if (btnMini2) btnMini2.addEventListener("click", adivinanzaNumero);
*/
});