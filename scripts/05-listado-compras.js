// Debo continuar esto
export function listadoCompras() {
    const lista = [];
    let pregunta;

    pregunta = prompt("Lista de compras\n¿Qué acción desea realizar?\n1. Agregar artículos a la lista\n2. Eliminar artículos\n3. Buscar artículos\n4. Filtrar artículos por precio\n5. Mostrar lista de compras con un orden específico\nSeleccione alguna otra opción o pulse Cancelar para salir.");

/*
    switch (pregunta) {
        case "1":
            while (true) {
                const entradaItem = prompt("Ingrese un artículo para agregar a la lista de compras o presione Cancelar para finalizar:");
                if (entradaItem === null) break;
                const item = entradaItem.trim();
                if (!item) {
                    alert("Nombre de artículo inválido");
                    continue;
                }

                const entradaPrecio = prompt("Ingrese el precio del artículo:");
                if (entradaPrecio === null) continue;
                const precio = Number(entradaPrecio.replace(",", "."));
                if (!Number.isFinite(precio) || precio <= 0) {
                    alert("Precio inválido");
                    continue;
                }

                const entradaCantidad = prompt("Ingrese la cantidad del artículo:");
                if (entradaCantidad === null) break;
                const cantidad = parseInt(entradaCantidad, 10);
                if (!Number.isFinite(cantidad) || cantidad <= 0) {
                    alert("Cantidad inválida");
                    continue;
                }
            }
            break;

        case "2":
            if (lista.length === 0) {
                alert("La lista de compras está vacía. No hay artículos para eliminar.");
                break;
            }
            while (true) {
                const elemento = prompt("Ingrese un artículo para eliminar de la lista de compras o presione Cancelar para finalizar:");
                if (elemento === null) break;
                const item = elemento.trim();
                if (!item) {
                    alert("Nombre de artículo inválido");
                    continue;
                }
                const index = lista.findIndex((articulo) => articulo.toLowerCase() === item.toLowerCase());
                if (index === -1) {
                    alert(`El artículo "${item}" no se encontró en la lista.`);
                    continue;
                }
                lista.splice(index, 1);
                alert(`El artículo "${item}" ha sido eliminado de la lista.`);
                if (lista.length === 0) {
                    alert("Ahora la lista de compras está vacía.");
                    break;
                }
            }
            break;

        case "3":
            const busqueda = prompt("Ingrese el nombre del artículo que desea buscar:");
            if (busqueda !== null) {
                const itemBuscado = busqueda.trim().toLowerCase();
                const encontrados = lista.filter((articulo) => articulo.toLowerCase().includes(itemBuscado));
                if (encontrados.length > 0) {
                    alert("Artículos encontrados:\n" + encontrados.join("\n"));
                } else {
                    alert(`No se encontraron artículos que coincidan con "${busqueda}".`);
                }
            }
            break;

        case "4":
            let eleccion = prompt("¿Desea filtrar por precio mínimo o máximo?\n1. Mínimo\n2. Máximo");
            if (eleccion === "1" || eleccion === "2") {
                const entradaPrecioFiltro = prompt("Ingrese el precio para filtrar:");
                if (entradaPrecioFiltro !== null) {
                    const precioFiltro = Number(entradaPrecioFiltro.replace(",", "."));
                    if (Number.isFinite(precioFiltro) && precioFiltro >= 0) {
                        const filtrados = lista.filter((articulo) => {
                            const precioArticulo = parseFloat(articulo.split(" - ")[1]);
                            return eleccion === "1" ? precioArticulo >= precioFiltro : precioArticulo <= precioFiltro;
                        });
                        if (filtrados.length > 0) {
                            alert("Artículos filtrados:\n" + filtrados.join("\n"));
                        } else {
                            alert("No se encontraron artículos que coincidan con el criterio de filtro.");
                        }
                    } else {
                        alert("Precio inválido para filtrar.");
                    }
                }
            }
            break;

        case "5":
            let orden = prompt("¿Cómo desea ordenar la lista?\n1. Alfabéticamente\n2. Por precio (de menor a mayor)\n3. Por precio (de mayor a menor)");
            if (orden === "1" || orden === "2" || orden === "3") {
                let listaOrdenada = [...lista];
                if (orden === "1") {
                    listaOrdenada.sort((a, b) => a.localeCompare(b));
                } else {
                    listaOrdenada.sort((a, b) => {
                        const precioA = parseFloat(a.split(" - ")[1]);
                        const precioB = parseFloat(b.split(" - ")[1]);
                        return orden === "2" ? precioA - precioB : precioB - precioA;
                    });
                }
                alert("Lista de compras ordenada:\n" + listaOrdenada.join("\n"));
            }
            break;

        default:
            alert("Saliendo de la lista de compras.");
            break;
    }
*/
}