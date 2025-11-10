(() => {
    const KEY = 'listaTareas';
    const form = document.getElementById('form-nueva-tarea');
    const input = document.getElementById('nueva-tarea');
    const listaEl = document.getElementById('lista-tareas');
    const limpiarBtn = document.getElementById('limpiar-completadas');
    const contador = document.getElementById('contador');

    if (!form || !input || !listaEl) return;

    let tareas = JSON.parse(localStorage.getItem(KEY) || '[]');

    function guardar() {
        localStorage.setItem(KEY, JSON.stringify(tareas));
    }

    function render() {
        listaEl.innerHTML = '';
        tareas.forEach((t, idx) => {
            const li = document.createElement('li');
            li.className = t.completada ? 'completada' : '';
            li.innerHTML = `
        <label>
            <input type="checkbox" data-idx="${idx}" ${t.completada ? 'checked' : ''}>
            <span class="texto">${escapeHtml(t.texto)}</span>
        </label>
        <button class="borrar" data-idx="${idx}" aria-label="Borrar tarea ${t.texto}">×</button>
        `;
            listaEl.appendChild(li);
        });
        const tot = tareas.length;
        const comp = tareas.filter(t => t.completada).length;
        if (contador) contador.textContent = `Total: ${tot} • Completadas: ${comp}`;
    }

    function escapeHtml(s) {
        return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = (input.value || '').trim();
        if (!texto) return;
        tareas.push({ texto, completada: false, creado: Date.now() });
        input.value = '';
        guardar();
        render();
    });

    listaEl.addEventListener('click', (e) => {
        const idx = e.target.dataset && e.target.dataset.idx;
        if (e.target.matches('input[type="checkbox"]') && typeof idx !== 'undefined') {
            tareas[idx].completada = e.target.checked;
            guardar();
            render();
        } else if (e.target.matches('.borrar') && typeof idx !== 'undefined') {
            tareas.splice(idx, 1);
            guardar();
            render();
        }
    });

    limpiarBtn && limpiarBtn.addEventListener('click', () => {
        tareas = tareas.filter(t => !t.completada);
        guardar();
        render();
    });

    // render inicial
    render();
})();