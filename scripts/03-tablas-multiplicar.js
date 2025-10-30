export function generadorTablas() {
    let numero = parseInt(prompt("Ingrese el número para generar su tabla de multiplicar"));
    let rango = parseInt(prompt("Ingrese el rango hasta donde desea multiplicar"));
    let tabla = [];

    console.log(`Tabla de multiplicar del ${numero} desde el 0 hasta el ${rango}:`);

    if (rango < 0) {
        for (let i = 0; i >= rango; i--) {
            tabla.push(`${numero} x ${i} = ${numero * i}`);
        }
    } else {
        for (let i = 0; i <= rango; i++) {
            tabla.push(`${numero} x ${i} = ${numero * i}`);
        }
    }

    alert("Tabla resultante:\n" + tabla.join("\n"));
    console.log("Tabla resultante:\n" + tabla.join("\n"));
}