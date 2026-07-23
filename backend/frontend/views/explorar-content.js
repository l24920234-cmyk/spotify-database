document.addEventListener("DOMContentLoaded", () => {

    const IMG_BASE = "../assets/images/covers/";
    const AUDIO_BASE = "../assets/audio/";

    // ============================================
    // Datos (convertidos a español: titulo/artista/imagen/audio)
    // ============================================
    const recommended = [
        { titulo: "Efecto", artista: "Bad Bunny", imagen: IMG_BASE + "dreams.jpg", audio: AUDIO_BASE + "efecto.mp3" },
        { titulo: "Me rehúso", artista: "Danny Ocean", imagen: IMG_BASE + "infinity.jpg", audio: AUDIO_BASE + "me_rehuso.mp3" },
        { titulo: "Sentimental", artista: "Joan Sebastian", imagen: IMG_BASE + "ocean.jpg", audio: AUDIO_BASE + "sentimental.mp3" },
        { titulo: "Por Verte Feliz", artista: "Los Parras", imagen: IMG_BASE + "universe.jpg", audio: AUDIO_BASE + "por_verte_feliz.mp3" }
    ];

    const trending = [
        { titulo: "Amor prohibido", artista: "Selena", imagen: IMG_BASE + "summer.jpg", audio: AUDIO_BASE + "amor_prohibido.mp3" },
        { titulo: "Mil horas", artista: "Los Abuelos de la Nada", imagen: IMG_BASE + "moon.jpg", audio: AUDIO_BASE + "mil_horas.mp3" },
        { titulo: "Me voy", artista: "Julieta Venegas", imagen: IMG_BASE + "night.jpg", audio: AUDIO_BASE + "me_voy.mp3" },
        { titulo: "Oye mi amor", artista: "Maná", imagen: IMG_BASE + "sky.jpg", audio: AUDIO_BASE + "oye_mi_amor.mp3" }
    ];

    const songs = [
        ...recommended.map(s => ({ type: "song", ...s })),
        ...trending.map(s => ({ type: "song", ...s }))
    ];

    const albums = [
        { type: "album", titulo: "Un Verano Sin Ti", artista: "Bad Bunny", imagen: IMG_BASE + "dreams.jpg" },
        { type: "album", titulo: "Romances", artista: "Luis Miguel", imagen: IMG_BASE + "ocean.jpg" },
        { type: "album", titulo: "Workout Mix", artista: "MusicIk", imagen: IMG_BASE + "universe.jpg" }
    ];

    const artists = [
        { type: "artist", titulo: "Bad Bunny", artista: "Reggaetón", imagen: IMG_BASE + "dreams.jpg" },
        { type: "artist", titulo: "Luis Miguel", artista: "Baladas", imagen: IMG_BASE + "ocean.jpg" },
        { type: "artist", titulo: "Danny Ocean", artista: "Pop Latino", imagen: IMG_BASE + "infinity.jpg" }
    ];

    const podcasts = [
        { type: "podcast", titulo: "Hablemos de Tecnología", artista: "MusicIk", imagen: IMG_BASE + "summer.jpg" },
        { type: "podcast", titulo: "IA Podcast", artista: "Open AI", imagen: IMG_BASE + "moon.jpg" }
    ];

    const allItems = [...songs, ...albums, ...artists, ...podcasts];

    const grid = document.getElementById("exploreGrid");
    const input = document.getElementById("exploreInput");

    // ============================================
    // Dibujar tarjetas
    // ============================================
    function renderItems(lista) {

        grid.innerHTML = "";

        lista.forEach(item => {

            let etiqueta = "🎵 Canción";
            if (item.type === "album") etiqueta = "💿 Álbum";
            if (item.type === "artist") etiqueta = "🎤 Artista";
            if (item.type === "podcast") etiqueta = "🎙️ Podcast";

            grid.innerHTML += `
                <div class="card">
                    <div class="card-art">
                        <img src="${item.imagen}" alt="${item.titulo}">
                        ${item.audio ? `
                            <button class="card-play" data-titulo="${item.titulo}" data-artista="${item.artista}">
                                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </button>
                        ` : ""}
                    </div>
                    <div class="card-foot">
                        <small>${etiqueta}</small>
                        <p class="card-title">${item.titulo}</p>
                        <p class="card-artist">${item.artista}</p>
                    </div>
                </div>
            `;

        });

    }

    renderItems(allItems);

    // ============================================
    // Buscador
    // ============================================
    input.addEventListener("input", () => {
        const texto = input.value.toLowerCase();
        const resultado = allItems.filter(item =>
            item.titulo.toLowerCase().includes(texto) ||
            item.artista.toLowerCase().includes(texto)
        );
        renderItems(resultado);
    });

    // ============================================
    // Reproducir (avisa al shell)
    // ============================================
    document.body.addEventListener("click", (e) => {

        const btn = e.target.closest(".card-play");
        if (!btn) return;

        const index = songs.findIndex(c =>
            c.titulo === btn.dataset.titulo &&
            c.artista === btn.dataset.artista
        );

        if (index === -1) return;

        const song = songs[index];

        if (window.parent && window.parent.MusicikPlayer) {
            window.parent.MusicikPlayer.playSong(song, index);
        }
    });

});