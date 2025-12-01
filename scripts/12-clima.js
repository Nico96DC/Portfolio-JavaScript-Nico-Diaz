function clima() {
    const embeddedApiKey = "de2df8d1d8d77b010ac6183c0da377d2";
    const apiKey = window.OPENWEATHER_API_KEY || embeddedApiKey;

    const buscarBtn = document.getElementById("buscar");
    const ciudadInput = document.getElementById("ciudad");
    const resultadoEl = document.getElementById("resultado");

    if (!buscarBtn || !ciudadInput || !resultadoEl) {
        console.warn("Elementos requeridos no encontrados: 'buscar', 'ciudad' o 'resultado'");
        return;
    }

    async function fetchClima(ciudad) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`;
        const resp = await fetch(url);
        if (!resp.ok) {
            const errData = await resp.json().catch(() => null);
            const message = errData?.message || `Error ${resp.status}`;
            throw new Error(message);
        }
        return resp.json();
    }

    buscarBtn.addEventListener("click", async () => {
        const ciudad = ciudadInput.value.trim();
        if (!ciudad) {
            resultadoEl.innerHTML = `<p>Por favor, ingresa una ciudad.</p>`;
            return;
        }

        if (!apiKey) {
            resultadoEl.innerHTML = `<p>No hay API key configurada. Crea <code>scripts/config.js</code> siguiendo <code>scripts/config.example.js</code> o añade la variable <code>window.OPENWEATHER_API_KEY</code>.</p>`;
            return;
        }

        buscarBtn.disabled = true;
        resultadoEl.innerHTML = `<p>Cargando...</p>`;

        try {
            const data = await fetchClima(ciudad);
            resultadoEl.innerHTML = `
                <h2>Clima en ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
                <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
                <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
                <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
            `;
        } catch (error) {
            resultadoEl.innerHTML = `<p>Ciudad no encontrada o error en la API. Por favor, verifica el nombre e intenta de nuevo.</p>`;
            console.error("Error fetching weather data:", error);
        } finally {
            buscarBtn.disabled = false;
        }
    });

    ciudadInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") buscarBtn.click();
    });
}

clima();