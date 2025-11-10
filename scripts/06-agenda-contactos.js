export function agendaContactos() {
    let agenda;

    let pregunta = prompt("Agenda de contactos\n¿Qué acción desea realizar?\n1. Agregar un nuevo contacto\n2. Eliminar un contacto\n3. Buscar un contacto\n4. Mostrar todos los contactos\n5. Exportar lista a un archivo JSON y mostrar en consola\nSeleccione alguna otra opción o pulse Cancelar para salir.");

    const datosGuardados = localStorage.getItem("agendaContactos");
    agenda = datosGuardados ? JSON.parse(datosGuardados) : [];

    switch (pregunta) {
        case "1":
            const nombreAgregar = prompt("Ingrese el nombre del contacto:");
            if (!nombreAgregar) {
                alert("Nombre inválido");
                break;
            }
            const telefonoAgregar = prompt("Ingrese el teléfono del contacto:");
            if (!telefonoAgregar) {
                alert("Teléfono inválido");
                break;
            }
            const emailAgregar = prompt("Ingrese el email del contacto:");
            if (!emailAgregar) {
                alert("Email inválido");
                break;
            }
            agregarContacto(nombreAgregar.trim(), telefonoAgregar.trim(), emailAgregar.trim());
            break;
        case "2":
            const nombreEliminar = prompt("Ingrese el nombre del contacto a eliminar:");
            if (!nombreEliminar) {
                alert("Nombre inválido");
                break;
            }
            eliminarContacto(nombreEliminar.trim());
            break;
        case "3":
            const nombreBuscar = prompt("Ingrese el nombre del contacto a buscar:");
            if (!nombreBuscar) {
                alert("Nombre inválido");
                break;
            }
            buscarContacto(nombreBuscar.trim());
            break;
        case "4":
            mostarAgenda();
            break;
        case "5":
            exportarAgenda();
            break;
        default:
            alert("Saliendo de la agenda de contactos.");
            break;
    }

    function agregarContacto(nombre, telefono, email) {
        const contacto = {nombre, telefono, email};
        agenda.push(contacto);
        localStorage.setItem("agendaContactos", JSON.stringify(agenda));
        console.log(`Contacto ${nombre} agregado.`);
    }

    function eliminarContacto(nombre) {
        const index = agenda.findIndex(c => c.nombre.toLowerCase() === nombre.toLowerCase());
        if (index !== -1) {
            const eliminado = agenda.splice(index, 1)[0];
            localStorage.removeItem("agendaContactos", JSON.stringify(agenda));
            console.log(`Contacto ${eliminado.nombre} eliminado.`);
        } else {
            console.log(`Contacto ${nombre} no encontrado.`);
        }
    }

    function mostarAgenda() {
        console.log("Agenda de Contactos:");
        agenda.forEach((contacto, index) => {
            console.log(`${index + 1}. Nombre: ${contacto.nombre}, teléfono: ${contacto.telefono}, email: ${contacto.email}`);
        });
    }

    function buscarContacto(nombre) {
        const contacto = agenda.find(c => c.nombre.toLowerCase() === nombre.toLowerCase());
        if (contacto) {
            console.log(`Contacto encontrado:\nNombre: ${contacto.nombre}, teléfono: ${contacto.telefono}, email: ${contacto.email}`);
        } else {
            console.log(`Contacto ${nombre} no encontrado.`);
        }
    }

    function exportarAgenda() {
        const datosJSON = JSON.stringify(agenda, null, 2);
        console.log("Exportando agenda a JSON:\n", datosJSON);
    }
}