const listaNotas = document.getElementById("listaNotas");
// Guardamos notas como objetos: { text: string, createdAt: ISOstring }
let notas = JSON.parse(localStorage.getItem("notas")) || [];

function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

function formatFecha(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    // formato dd/mm/yyyy hh:mm
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

function mostrarNotas() {
    listaNotas.innerHTML = "";
    notas.forEach((nota, index) => {
        const li = document.createElement("li");
        li.className = "nota-item";

        const texto = document.createElement("div");
        texto.className = "nota-text";
        texto.textContent = nota.text;

        const fecha = document.createElement("div");
        fecha.className = "nota-date";
        fecha.textContent = formatFecha(nota.createdAt);

        const acciones = document.createElement("div");
        acciones.className = "nota-actions";

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            notas.splice(index, 1);
            guardarNotas();
            mostrarNotas();
        });

        acciones.appendChild(btnEliminar);

        li.appendChild(texto);
        li.appendChild(fecha);
        li.appendChild(acciones);
        listaNotas.appendChild(li);
    });
}

// Listener correcto: el botón 'guardar' es un botón, usar 'click'
document.getElementById("guardar").addEventListener("click", (e) => {
    e.preventDefault();
    const notaText = document.getElementById("notas").value.trim();
    if (notaText) {
        const nuevo = { text: notaText, createdAt: new Date().toISOString() };
        notas.push(nuevo);
        guardarNotas();
        document.getElementById("notas").value = "";
        mostrarNotas();
    }
});

// Borrar todo — usar la misma clave 'notas'
document.getElementById("borrar").addEventListener("click", () => {
    localStorage.removeItem("notas");
    notas = [];
    mostrarNotas();
});

// Mostrar notas al cargar la página
mostrarNotas();