export function adivinanzaNumero() {
    console.log("¡Bienvenido al juego de adivinanza de números!");
    let minimo, maximo, numeroSecreto, intentos = 5, pluralN = "n", pluralS = "s";

    minimo = parseInt(prompt("¡Bienvenido al juego de adivinanza de números!\nIngrese el número mínimo del rango:"));
    do {
        maximo = parseInt(prompt("Ingrese el número máximo del rango:"));
        if (minimo > maximo) {
            let temp = minimo;
            minimo = maximo;
            maximo = temp;
        }
        if (minimo == maximo) {
            alert("El número máximo debe ser diferente al mínimo. Por favor, ingrese otro valor.");
        }
    } while (minimo == maximo);

    numeroSecreto = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;

    while (intentos > 0) {
        let intentoUsuario = parseInt(prompt(`Adivina el número entre ${minimo} y ${maximo}.\nTe queda${intentos === 1 ? '' : 'n'} ${intentos} intento${intentos === 1 ? '' : 's'}.`));

        if (intentoUsuario == numeroSecreto) {
            alert(`¡Felicidades! Has adivinado el número secreto: ${numeroSecreto}`);
            return;
        } else if (intentoUsuario < numeroSecreto) {
            alert("El número secreto es mayor.");
        } else {
            alert("El número secreto es menor.");
        }
    }

    alert(`Lo siento, se han agotado los intentos.\nEl número secreto era: ${numeroSecreto}`);
}