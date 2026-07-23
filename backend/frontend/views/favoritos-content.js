document.addEventListener("DOMContentLoaded", async () => {

    const usuario = JSON.parse(localStorage.getItem("musicik_usuario"));

    if (!usuario) {
        // Redirige la ventana COMPLETA, no solo el iframe
        window.parent.location.href = "login.html";
        return;
    }

    const favoritosGrid = document.getElementById("favoritosGrid");

    try {

        const respuesta = await fetch(
            `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/favoritos/${usuario.id}`
        );

        const canciones = await respuesta.json();

        if (canciones.length === 0) {
            favoritosGrid.innerHTML = "<h2>No tienes canciones favoritas.</h2>";
            return;
        }

        // Le avisa al shell la lista completa (para next/prev)
        if (window.parent && window.parent.MusicikPlayer) {
            window.parent.MusicikPlayer.setAllSongs(canciones);
        }

        favoritosGrid.innerHTML = canciones.map(trackCard).join("");

        // Reproducir al hacer click
        document.body.addEventListener("click", (e) => {
            const btn = e.target.closest(".card-play");
            if (!btn) return;

            const index = Number(btn.dataset.index);
            const song = canciones[index];

            if (window.parent && window.parent.MusicikPlayer) {
                window.parent.MusicikPlayer.playSong(song, index);
            }
        });

    } catch (error) {

        console.error(error);
        favoritosGrid.innerHTML = "<h2>Ocurrió un error al cargar tus favoritos.</h2>";

    }

});

function trackCard(t, index) {

    return `
        <div class="card">
            <div class="card-art">
                <img src="../${t.imagen}" alt="${t.titulo}">
                <button class="card-play" data-index="${index}" aria-label="Reproducir ${t.titulo}">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
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