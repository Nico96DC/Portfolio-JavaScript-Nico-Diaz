export function calculadoraSimple() {
    // Calculadora simple
    console.log("** Miniproyecto 1: Calculadora simple **");

    // Ingreso de valores numéricos
    let num1, num2, operacion;
    do {
        num1 = parseFloat(prompt("Calculadora simple\nIngrese el primer número:"));
        if (isNaN(num1)) {
            alert("Por favor, ingrese un número válido.");
        }
    } while (!Number.isFinite(num1));
    console.log(`Primer número ingresado: ${num1}`);

    do {
        num2 = parseFloat(prompt("Ingrese el segundo número:"));
        if (isNaN(num2)) {
            alert("Por favor, ingrese un número válido.");
        }
    } while (!Number.isFinite(num2));
    console.log(`Segundo número ingresado: ${num2}`);
    let resultado;

    // Indicación de operador
    const opciones = ["+", "-", "*"];
    if (num2 != 0) {
        opciones.push("/");
    }
    do {
        let textoOperaciones = "Ingrese una operación:\nSuma (+)\nResta (-)\nMultiplicación (*)";
        if (num2 != 0) {
            textoOperaciones += "\nDivisión (/)";
        }
        operacion = (prompt(textoOperaciones)).trim();
        if (!opciones.includes(operacion) && operacion != null) {
            alert("Operación no válida. Por favor, ingrese la opción correcta.");
        }
    } while (!opciones.includes(operacion));

    // Realización de la operación
    if (!operacion) return;
    switch (operacion) {
        case "+":
            resultado = num1 + num2;
            console.log(`${num1} + ${num2} = ${resultado}`);
            alert(`${num1} + ${num2} = ${resultado}`);
            break;
        case "-":
            resultado = num1 - num2;
            console.log(`${num1} - ${num2} = ${resultado}`);
            alert(`${num1} - ${num2} = ${resultado}`);
            break;
        case "*":
            resultado = num1 * num2;
            console.log(`${num1} * ${num2} = ${resultado}`);
            alert(`${num1} * ${num2} = ${resultado}`);
            break;
        case "/":
            resultado = num1 / num2;
            console.log(`${num1} / ${num2} = ${resultado}`);
            alert(`${num1} / ${num2} = ${resultado}`);
            break;
    }
}