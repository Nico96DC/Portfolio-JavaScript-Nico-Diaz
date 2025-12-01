function clima() {
    const apiKey = "de2df8d1d8d77b010ac6183c0da377d2";

    document.getElementById("buscar").addEventListener("click", async () => {
        const ciudad = document.getElementById("ciudad").value.trim();
        if (!ciudad) return alert("Por favor, ingresa una ciudad.");

        try {
            const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`);
            const data = await respuesta.json();

            if (data.cod !== 200) {
                document.getElementById("resultado").innerHTML = `<p>Ciudad no encontrada. Por favor, verifica el nombre e intenta de nuevo.</p>`;
                return;
            }

            document.getElementById("resultado").innerHTML = `
                <h2>Clima en ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
                <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
                <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
                <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
            `;
        } catch (error) {
            document.getElementById("resultado").innerHTML = `<p>Error al obtener los datos del clima. Por favor, intenta de nuevo más tarde.</p>`;
            console.error("Error fetching weather data:", error);
        }
    });
}

clima();