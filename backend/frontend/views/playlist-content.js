// ============================================================
// MusicIk - playlist-content.js
// Vive DENTRO del iframe. El reproductor real vive en el shell.
// ============================================================

const params = new URLSearchParams(window.location.search);
const playlistName = params.get("name");

const IMG_BASE = "../assets/images/covers/";
const AUDIO_BASE = "../assets/audio/";

const playlists = {

    "Para bailar": {
        image: IMG_BASE + "para_bailar.jpg",
        description: "Las mejores canciones para bailar y disfrutar.",
        songs: [
            { titulo: "Quiero Bailar", artista: "Ivy Queen", imagen: IMG_BASE + "quiero_bailar.jpg", audio: AUDIO_BASE + "quiero_bailar.mp3" },
            { titulo: "DÁKITI", artista: "Bad Bunny", imagen: IMG_BASE + "dakiti.jpg", audio: AUDIO_BASE + "dakiti.mp3" },
            { titulo: "Inténtalo", artista: "El Bebeto", imagen: IMG_BASE + "intentalo.jpg", audio: AUDIO_BASE + "intentalo.mp3" },
            { titulo: "Almas Gemelas", artista: "El Trono de México", imagen: IMG_BASE + "almas_gemelas.jpg", audio: AUDIO_BASE + "almas_gemelas.mp3" },
            { titulo: "Sangoloteadito", artista: "Joan Sebastian", imagen: IMG_BASE + "sangoloteadito.jpg", audio: AUDIO_BASE + "sangoloteadito.mp3" },
            { titulo: "Danza Kuduro", artista: "Don Omar", imagen: IMG_BASE + "danza_kuduro.jpg", audio: AUDIO_BASE + "danza_kuduro.mp3" }
        ]
    },

    "Para llorar": {
        image: IMG_BASE + "para_llorar.jpg",
        description: "Canciones para sacar los sentimientos.",
        songs: [
            { titulo: "Rosa Pastel", artista: "Belanova", imagen: IMG_BASE + "rosa_pastel.jpg", audio: AUDIO_BASE + "rosa_pastel.mp3" },
            { titulo: "Si Estuviésemos Juntos", artista: "Bad Bunny", imagen: IMG_BASE + "si_estuviesemos_juntos.jpg", audio: AUDIO_BASE + "si_estuviesemos_juntos.mp3" },
            { titulo: "Cada Que...", artista: "Belanova", imagen: IMG_BASE + "cada_que.jpg", audio: AUDIO_BASE + "cada_que.mp3" },
            { titulo: "Otro Atardecer", artista: "Bad Bunny", imagen: IMG_BASE + "otro_atardecer.jpg", audio: AUDIO_BASE + "otro_atardecer.mp3" },
            { titulo: "Rosas", artista: "La Oreja de Van Gogh", imagen: IMG_BASE + "rosas.jpg", audio: AUDIO_BASE + "rosas.mp3" },
            { titulo: "A Lo Mejor", artista: "Banda MS", imagen: IMG_BASE + "a_lo_mejor.jpg", audio: AUDIO_BASE + "a_lo_mejor.mp3" }
        ]
    },

    "Bonitas": {
        image: IMG_BASE + "bonitas.jpg",
        description: "Canciones bonitas para cantar todo el día.",
        songs: [
            { titulo: "Baila Mi Corazón", artista: "Belanova", imagen: IMG_BASE + "baila_mi_corazon.jpg", audio: AUDIO_BASE + "baila_mi_corazon.mp3" },
            { titulo: "Dembow", artista: "Danny Ocean", imagen: IMG_BASE + "dembow.jpg", audio: AUDIO_BASE + "dembow.mp3" },
            { titulo: "El Sol No Regresa", artista: "La Quinta Estación", imagen: IMG_BASE + "el_sol_no_regresa.jpg", audio: AUDIO_BASE + "el_sol_no_regresa.mp3" },
            { titulo: "Picky", artista: "Joey Montana", imagen: IMG_BASE + "picky.jpg", audio: AUDIO_BASE + "picky.mp3" },
            { titulo: "Cada Día Más", artista: "Remmy Valenzuela", imagen: IMG_BASE + "cada_dia_mas.jpg", audio: AUDIO_BASE + "cada_dia_mas.mp3" }
        ]
    },

    "Para lavar ropa": {
        image: IMG_BASE + "para_lavar_ropa.jpg",
        description: "Porque hasta lavar ropa se disfruta con buena música.",
        songs: [
            { titulo: "De Contrabando", artista: "Jenni Rivera", imagen: IMG_BASE + "de_contrabando.jpg", audio: AUDIO_BASE + "de_contrabando.mp3" },
            { titulo: "Más Allá del Sol", artista: "Joan Sebastian", imagen: IMG_BASE + "mas_alla_del_sol.jpg", audio: AUDIO_BASE + "mas_alla_del_sol.mp3" },
            { titulo: "Con Los Ojos Cerrados", artista: "Gloria Trevi", imagen: IMG_BASE + "con_los_ojos_cerrados.jpg", audio: AUDIO_BASE + "con_los_ojos_cerrados.mp3" },
            { titulo: "Oye Mi Amor", artista: "Maná", imagen: IMG_BASE + "oye_mi_amor.jpg", audio: AUDIO_BASE + "oye_mi_amor.mp3" },
            { titulo: "La Canción", artista: "J Balvin & Bad Bunny", imagen: IMG_BASE + "la_cancion.jpg", audio: AUDIO_BASE + "la_cancion.mp3" }
        ]
    }

};

const playlist = playlists[playlistName];

if (!playlist) {
    document.body.innerHTML = `<h1 style="color:white;text-align:center;margin-top:100px;">Playlist no encontrada</h1>`;
    throw new Error("Playlist no encontrada");
}

document.getElementById("playlistTitle").textContent = playlistName;
document.getElementById("playlistDescription").textContent = playlist.description;
document.getElementById("playlistImage").src = playlist.image;

const songsContainer = document.getElementById("songsContainer");

playlist.songs.forEach((song, index) => {
    songsContainer.innerHTML += `
        <div class="song">
            <div class="song-info">
                <img src="${song.imagen}" class="song-cover" alt="${song.titulo}">
                <div>
                    <h3>${song.titulo}</h3>
                    <p>${song.artista}</p>
                </div>
            </div>
            <div class="song-buttons">
                <button class="favoriteBtn" data-index="${index}">♡</button>
                <button class="playSong" data-index="${index}">▶</button>
            </div>
        </div>
    `;
});

// Avisa al shell la lista completa (para next/prev)
if (window.parent && window.parent.MusicikPlayer) {
    window.parent.MusicikPlayer.setAllSongs(playlist.songs);
}

function playSong(index) {
    const song = playlist.songs[index];
    if (window.parent && window.parent.MusicikPlayer) {
        window.parent.MusicikPlayer.playSong(song, index);
    }
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("playSong")) {
        const index = Number(e.target.dataset.index);
        playSong(index);
    }
});

document.getElementById("playAllBtn").addEventListener("click", () => {
    playSong(0);
});

// ---- Favoritos (guardados localmente, como en el original) ----
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelectorAll(".favoriteBtn").forEach(btn => {
    const index = Number(btn.dataset.index);
    const song = playlist.songs[index];
    const existe = favorites.some(f => f.titulo === song.titulo && f.artista === song.artista);
    if (existe) {
        btn.textContent = "❤";
        btn.classList.add("active");
    }
});

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("favoriteBtn")) return;

    const index = Number(e.target.dataset.index);
    const song = playlist.songs[index];
    const existe = favorites.find(f => f.titulo === song.titulo && f.artista === song.artista);

    if (existe) {
        favorites = favorites.filter(f => !(f.titulo === song.titulo && f.artista === song.artista));
        e.target.textContent = "♡";
        e.target.classList.remove("active");
    } else {
        favorites.push(song);
        e.target.textContent = "❤";
        e.target.classList.add("active");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
});