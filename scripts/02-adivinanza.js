export function adivinanzaNumero() {
  console.log("¡Bienvenido al juego de adivinanza de números!");
  const intentosIniciales = 5;

  // Pedir mínimo
  const rawMin = prompt("Ingrese el número mínimo del rango:");
  if (rawMin === null) return; // usuario canceló -> salida limpia

  const minTrim = rawMin.trim();
  if (minTrim === "") {
    alert("Entrada vacía. Saliendo.");
    return;
  }
  const minimo = parseInt(minTrim, 10);
  if (Number.isNaN(minimo)) {
    alert("Valor mínimo inválido. Saliendo.");
    return;
  }

  // Pedir máximo con validación y posibilidad de cancelar
  let maximo;
  while (true) {
    const rawMax = prompt("Ingrese el número máximo del rango:");
    if (rawMax === null) return; // cancelar -> salida

    const maxTrim = rawMax.trim();
    if (maxTrim === "") {
      alert("Entrada vacía. Intenta de nuevo o pulsa Cancelar para salir.");
      continue;
    }
    const parsedMax = parseInt(maxTrim, 10);
    if (Number.isNaN(parsedMax)) {
      alert("Valor máximo inválido. Intenta de nuevo.");
      continue;
    }
    if (parsedMax === minimo) {
      alert("El número máximo debe ser distinto al mínimo.");
      continue;
    }
    maximo = parsedMax;
    break;
  }

  const numeroSecreto = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  let intentos = intentosIniciales;

  while (intentos > 0) {
    const rawIntento = prompt(`Adivina el número entre ${minimo} y ${maximo}.\nTe quedan ${intentos} intento(s).`);
    if (rawIntento === null) {
      alert("Juego cancelado por el usuario.");
      return; // salida si el usuario cancela durante el juego
    }
    const intentoUsuario = parseInt(rawIntento.trim(), 10);
    if (Number.isNaN(intentoUsuario)) {
      alert("Entrada inválida. Intenta con un número.");
      continue;
    }

    if (intentoUsuario === numeroSecreto) {
      alert(`¡Felicidades! Has adivinado el número secreto: ${numeroSecreto}`);
      return;
    } else if (intentoUsuario < numeroSecreto) {
      alert("El número secreto es mayor.");
    } else {
      alert("El número secreto es menor.");
    }
    intentos--;
  }

  alert(`Lo siento, se han agotado los intentos.\nEl número secreto era: ${numeroSecreto}`);
}