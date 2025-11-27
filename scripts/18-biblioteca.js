export function bibliotecaVirtual() {
    class Autor {
        constructor(nombre) {
            this.nombre = nombre;
            this.cantidadLibros = 0;
        }
    }

    class Libro {
        constructor(titulo, autor) {
            this.titulo = titulo;
            this.autor = autor;
            autor.cantidadLibros++;
        }

        mostrarInfo() {
            console.log(`Título: ${this.titulo}, Autor: ${this.autor.nombre}`);
        }
    }

    const autor1 = new Autor("Gabriel García Márquez");
    const libro1 = new Libro("Cien Años de Soledad", autor1);
    const libro2 = new Libro("El Amor en los Tiempos del Cólera", autor1);

    libro1.mostrarInfo();
    libro2.mostrarInfo();

    console.log(`Cantidad de libros del autor ${autor1.nombre}: ${autor1.cantidadLibros}`);
}
