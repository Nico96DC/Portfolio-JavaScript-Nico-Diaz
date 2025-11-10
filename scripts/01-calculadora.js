export function calculadoraSimple() {
    console.log("** Miniproyecto 1: Calculadora simple **");

    const elNum1 = document.getElementById("num1");
    const elNum2 = document.getElementById("num2");
    const elOperacion = document.getElementById("operacion");
    const elResultado = document.getElementById("resultado");

    // intentar leer valores desde el DOM; si no son números válidos pedimos por prompt
    let num1 = elNum1 ? Number(elNum1.value) : NaN;
    let num2 = elNum2 ? Number(elNum2.value) : NaN;
    let operacion = elOperacion ? elOperacion.value : "";

    // pedir num1 si no es finito
    if (!Number.isFinite(num1)) {
        while (true) {
            const entrada = prompt("Calculadora simple\nIngrese el primer número:");
            if (entrada === null) return; // usuario canceló
            const parsed = Number(entrada.trim());
            if (Number.isFinite(parsed)) { num1 = parsed; break; }
            alert("Por favor, ingrese un número válido.");
        }
    }
    console.log(`Primer número ingresado: ${num1}`);

    // pedir num2 si no es finito
    if (!Number.isFinite(num2)) {
        while (true) {
            const entrada = prompt("Ingrese el segundo número:");
            if (entrada === null) return;
            const parsed = Number(entrada.trim());
            if (Number.isFinite(parsed)) { num2 = parsed; break; }
            alert("Por favor, ingrese un número válido.");
        }
    }
    console.log(`Segundo número ingresado: ${num2}`);

    // Opciones de operación (quita división si num2 === 0)
    const opciones = ["+", "-", "*"];
    if (num2 !== 0) opciones.push("/");

    // pedir operación si no está definida o no es válida
    while (true) {
        const textoOperaciones = `Ingrese una operación:\nSuma (+)\nResta (-)\nMultiplicación (*)${num2 !== 0 ? "\nDivisión (/)" : ""}`;
        const entrada = prompt(textoOperaciones);
        if (entrada === null) return;
        const op = entrada.trim();
        if (opciones.includes(op)) { operacion = op; break; }
        alert("Operación no válida. Por favor, ingrese +, -, * o / (si está disponible).");
    }

    // calcular resultado
    let valorResultado;
    switch (operacion) {
        case "+":
            valorResultado = num1 + num2;
            break;
        case "-":
            valorResultado = num1 - num2;
            break;
        case "*":
            valorResultado = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                alert("Error: división por cero no permitida.");
                return;
            }
            valorResultado = num1 / num2;
            break;
        default:
            alert("Operación no válida.");
            return;
    }

    const mensaje = `Resultado: ${num1} ${operacion} ${num2} = ${valorResultado}`;

    // mostrar resultado en el DOM si existe, si no con alert
    if (elResultado) {
        if ("value" in elResultado) elResultado.value = mensaje;
        else elResultado.textContent = mensaje;
    } else {
        alert(mensaje);
    }
}