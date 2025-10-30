export function conversorTemperatura() {
    let opcion, conversion, grados, resultado;

    do {
        opcion = prompt("Seleccione la temperatura inicial:\n1. Celsius\n2. Fahrenheit\n3. Kelvin");
        if (opcion == null) {
            alert("Operación cancelada.");
            return;
        }
    } while (opcion !== "1" && opcion !== "2" && opcion !== "3" && opcion !== null);

    do {
        conversion = prompt("Seleccione la temperatura a la que desea convertir:\n1. Celsius\n2. Fahrenheit\n3. Kelvin");
    
        if (conversion == null) {
            alert("Operación cancelada.");
            return;
        }
    } while (conversion !== "1" && conversion !== "2" && conversion !== "3" && conversion !== null);

    do {
        grados = parseFloat(prompt(`Ingrese el valor de la temperatura en ${opcion === 1 ? 'Celsius' : opcion === 2 ? 'Fahrenheit' : 'Kelvin'}:`));
        if (isNaN(grados)) {
            alert("Entrada inválida. Por favor, ingrese un número válido.");
        }
    } while (isNaN(grados));

    switch (opcion) {
        case "1":
            switch (conversion) {
                case "1":
                    resultado = grados;
                    break;
                case "2":
                    resultado = (grados * 9/5) + 32;
                    break;
                case "3":
                    resultado = grados + 273.15;
                    break;
            }
            break;

        case "2":
            switch (conversion) {
                case "1":
                    resultado = (grados - 32) * 5/9;
                    break;
                case "2":
                    resultado = grados;
                    break;
                case "3":
                    resultado = ((grados - 32) * 5/9) + 273.15;
                    break;
            }
            break;

        case "3":
            switch (conversion) {
                case "1":
                    resultado = grados - 273.15;
                    break;
                case "2":
                    resultado = ((grados - 273.15) * 9/5) + 32;
                    break;
                case "3":
                    resultado = grados;
                    break;
            }
            break;
    }

    alert(`Los ${grados}°${resultado === 1 ? 'C' : 'F'} son ${resultado.toFixed(2)}°${resultado === 1 ? 'F' : 'C'}`);
}