export function listaProductos() {
    class Producto {
        constructor(nombre, precio) {
            this.nombre = nombre;
            this.precio = precio;
        }

        mostrarInfo() {
            console.log(`Producto: ${this.nombre}, Precio: $${this.precio}`);
        }
    }

    const producto1 = new Producto("Camisa", 2500);
    const producto2 = new Producto("Pantalón", 4000);

    producto1.mostrarInfo();
    producto2.mostrarInfo();

    alert("Lista de productos mostrada en consola.");
}
