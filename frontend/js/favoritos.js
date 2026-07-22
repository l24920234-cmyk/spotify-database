document.addEventListener("DOMContentLoaded", async () => {

    const usuario = JSON.parse(localStorage.getItem("musicik_usuario"));

    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    try {

        const respuesta = await fetch(
            `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/favoritos/${usuario.id}`
        );

        const canciones = await respuesta.json();

        const favoritosGrid = document.getElementById("favoritosGrid");

        if (canciones.length === 0) {
            favoritosGrid.innerHTML = "<h2>No tienes canciones favoritas.</h2>";
            return;
        }

        favoritosGrid.innerHTML = canciones.map(trackCard).join("");

    } catch (error) {

        console.error(error);

    }

});

function trackCard(t) {

    return `
        <div class="card">
            <div class="card-art">
                <img src="${t.imagen}" alt="${t.titulo}">
            </div>

            <div class="card-foot">
                <div>
                    <p class="card-title">${t.titulo}</p>
                    <p class="card-artist">${t.artista}</p>
                </div>
            </div>
        </div>
    `;

}