document.getElementById("buscar").addEventListener("click", () => {
    const user = document.getElementById("usuario").value.trim();
    if (!user) {
        alert("Por favor, ingrese un nombre de usuario.");
        return;
    }

    document.getElementById("resultado").innerHTML = "Buscando...";

    fetch(`https://api.github.com/users/${user}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Usuario no encontrado");
            }
            return response.json();
        })
        .then(data => {
            const resultado = document.getElementById("resultado");
            resultado.innerHTML = `
                <h2>${data.login}</h2>
                <img src="${data.avatar_url}" alt="Avatar de ${data.login}" width="100">
                <p>Repositorios públicos: ${data.public_repos}</p>
                <p>Seguidores: ${data.followers}</p>
                <p>Siguiendo: ${data.following}</p>
                <a href="${data.html_url}" target="_blank">Ver perfil en GitHub</a>
            `;
        })
        .catch(error => {
            document.getElementById("resultado").innerHTML = `<p style="color:red;">${error.message}</p>`;
        })
        .finally(() => {
            console.log("Búsqueda finalizada");
        });
});