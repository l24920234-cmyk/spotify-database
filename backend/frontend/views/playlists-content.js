// ============================================================
// MusicIk - playlists-content.js
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    const IMG_BASE = "../assets/images/covers/";
    const AUDIO_BASE = "../assets/audio/";

    const playlists = [
        {
            name: "Para bailar",
            description: "Las mejores canciones para bailar.",
            songs: 6,
            image: IMG_BASE + "para_bailar.jpg",
            audio: AUDIO_BASE + "quiero_bailar.mp3"
        },
        {
            name: "Para llorar",
            description: "Canciones para sacar los sentimientos.",
            songs: 6,
            image: IMG_BASE + "para_llorar.jpg",
            audio: AUDIO_BASE + "rosa_pastel.mp3"
        },
        {
            name: "Bonitas",
            description: "Canciones bonitas para cualquier momento.",
            songs: 5,
            image: IMG_BASE + "bonitas.jpg",
            audio: AUDIO_BASE + "baila_mi_corazon.mp3"
        },
        {
            name: "Para lavar ropa",
            description: "Porque hasta lavar ropa tiene su soundtrack.",
            songs: 5,
            image: IMG_BASE + "para_lavar_ropa.jpg",
            audio: AUDIO_BASE + "de_contrabando.mp3"
        }
    ];

    const playlistGrid = document.getElementById("playlistGrid");

    playlists.forEach((playlist, index) => {

        playlistGrid.innerHTML += `
        <div class="playlist-card" data-index="${index}">
            <img src="${playlist.image}" alt="${playlist.name}">
            <div class="playlist-info">
                <h3>${playlist.name}</h3>
                <p>${playlist.description}</p>
                <div class="playlist-footer">
                    <span>${playlist.songs} canciones</span>
                    <button class="play-btn" data-index="${index}">
                        ▶ Reproducir
                    </button>
                </div>
            </div>
        </div>
        `;

    });

    // Reproducir (avisa al shell)
    document.body.addEventListener("click", (e) => {

        const playBtn = e.target.closest(".play-btn");
        if (playBtn) {
            const index = Number(playBtn.dataset.index);
            const p = playlists[index];

            const song = {
                titulo: p.name,
                artista: "Playlist de MusicIk",
                imagen: p.image,
                audio: p.audio
            };

            if (window.parent && window.parent.MusicikPlayer) {
                window.parent.MusicikPlayer.playSong(song, 0);
            }
            return;
        }

        // Click en la tarjeta (no en el botón) abre la playlist individual
        const card = e.target.closest(".playlist-card");
        if (card) {
            const index = Number(card.dataset.index);
            const nombre = playlists[index].name;
           window.parent.location.href = "../playlist.html?name=" + encodeURIComponent(nombre);
        }

    });

});