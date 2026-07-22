// =======================================================
// MusicIk - playlist.js
// Reproductor completo de Playlists
// =======================================================

// ======================================
// Obtener nombre de la playlist
// ======================================

const params = new URLSearchParams(window.location.search);
const playlistName = params.get("name");

// ======================================
// Información de las playlists
// ======================================

const playlists = {

    "Para bailar": {

        image: "assets/images/covers/para_bailar.jpg",

        description: "Las mejores canciones para bailar y disfrutar.",

        songs: [

            {
                title: "Quiero Bailar",
                artist: "Ivy Queen",
                image: "assets/images/covers/quiero_bailar.jpg",
                audio: "assets/audio/quiero_bailar.mp3"
            },

            {
                title: "DÁKITI",
                artist: "Bad Bunny",
                image: "assets/images/covers/dakiti.jpg",
                audio: "assets/audio/dakiti.mp3"
            },

            {
                title: "Inténtalo",
                artist: "El Bebeto",
                image: "assets/images/covers/intentalo.jpg",
                audio: "assets/audio/intentalo.mp3"
            },

            {
                title: "Almas Gemelas",
                artist: "El Trono de México",
                image: "assets/images/covers/almas_gemelas.jpg",
                audio: "assets/audio/almas_gemelas.mp3"
            },

            {
                title: "Sangoloteadito",
                artist: "Joan Sebastian",
                image: "assets/images/covers/sangoloteadito.jpg",
                audio: "assets/audio/sangoloteadito.mp3"
            },

            {
                title: "Danza Kuduro",
                artist: "Don Omar",
                image: "assets/images/covers/danza_kuduro.jpg",
                audio: "assets/audio/danza_kuduro.mp3"
            }

        ]

    },

    "Para llorar": {

        image: "assets/images/covers/para_llorar.jpg",

        description: "Canciones para sacar los sentimientos.",

        songs: [

            {
                title: "Rosa Pastel",
                artist: "Belanova",
                image: "assets/images/covers/rosa_pastel.jpg",
                audio: "assets/audio/rosa_pastel.mp3"
            },

            {
                title: "Si Estuviésemos Juntos",
                artist: "Bad Bunny",
                image: "assets/images/covers/si_estuviesemos_juntos.jpg",
                audio: "assets/audio/si_estuviesemos_juntos.mp3"
            },

            {
                title: "Cada Que...",
                artist: "Belanova",
                image: "assets/images/covers/cada_que.jpg",
                audio: "assets/audio/cada_que.mp3"
            },

            {
                title: "Otro Atardecer",
                artist: "Bad Bunny",
                image: "assets/images/covers/otro_atardecer.jpg",
                audio: "assets/audio/otro_atardecer.mp3"
            },

            {
                title: "Rosas",
                artist: "La Oreja de Van Gogh",
                image: "assets/images/covers/rosas.jpg",
                audio: "assets/audio/rosas.mp3"
            },

            {
                title: "A Lo Mejor",
                artist: "Banda MS",
                image: "assets/images/covers/a_lo_mejor.jpg",
                audio: "assets/audio/a_lo_mejor.mp3"
            }

        ]

    },

    "Bonitas": {

        image: "assets/images/covers/bonitas.jpg",

        description: "Canciones bonitas para cantar todo el día.",

        songs: [

            {
                title: "Baila Mi Corazón",
                artist: "Belanova",
                image: "assets/images/covers/baila_mi_corazon.jpg",
                audio: "assets/audio/baila_mi_corazon.mp3"
            },

            {
                title: "Dembow",
                artist: "Danny Ocean",
                image: "assets/images/covers/dembow.jpg",
                audio: "assets/audio/dembow.mp3"
            },

            {
                title: "El Sol No Regresa",
                artist: "La Quinta Estación",
                image: "assets/images/covers/el_sol_no_regresa.jpg",
                audio: "assets/audio/el_sol_no_regresa.mp3"
            },

            {
                title: "Picky",
                artist: "Joey Montana",
                image: "assets/images/covers/picky.jpg",
                audio: "assets/audio/picky.mp3"
            },

            {
                title: "Cada Día Más",
                artist: "Remmy Valenzuela",
                image: "assets/images/covers/cada_dia_mas.jpg",
                audio: "assets/audio/cada_dia_mas.mp3"
            }

        ]

    },

    "Para lavar ropa": {

        image: "assets/images/covers/para_lavar_ropa.jpg",

        description: "Porque hasta lavar ropa se disfruta con buena música.",

        songs: [

            {
                title: "De Contrabando",
                artist: "Jenni Rivera",
                image: "assets/images/covers/de_contrabando.jpg",
                audio: "assets/audio/de_contrabando.mp3"
            },

            {
                title: "Más Allá del Sol",
                artist: "Joan Sebastian",
                image: "assets/images/covers/mas_alla_del_sol.jpg",
                audio: "assets/audio/mas_alla_del_sol.mp3"
            },

            {
                title: "Con Los Ojos Cerrados",
                artist: "Gloria Trevi",
                image: "assets/images/covers/con_los_ojos_cerrados.jpg",
                audio: "assets/audio/con_los_ojos_cerrados.mp3"
            },

            {
                title: "Oye Mi Amor",
                artist: "Maná",
                image: "assets/images/covers/oye_mi_amor.jpg",
                audio: "assets/audio/oye_mi_amor.mp3"
            },

            {
                title: "La Canción",
                artist: "J Balvin & Bad Bunny",
                image: "assets/images/covers/la_cancion.jpg",
                audio: "assets/audio/la_cancion.mp3"
            }

        ]

    }

};

// ======================================
// Obtener la playlist seleccionada
// ======================================

const playlist = playlists[playlistName];

if (!playlist) {

    document.body.innerHTML = `
        <h1 style="color:white;text-align:center;margin-top:100px;">
            Playlist no encontrada
        </h1>
    `;

    throw new Error("Playlist no encontrada");

}

// =======================================================
// PARTE 2
// Variables del reproductor
// =======================================================

const audioPlayer = document.getElementById("audioPlayer");

const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const curTime = document.getElementById("curTime");
const durTime = document.getElementById("durTime");

const playAllBtn = document.getElementById("playAllBtn");

let currentSong = 0;

// ======================================
// Mostrar información de la playlist
// ======================================

document.getElementById("playlistTitle").textContent = playlistName;

document.getElementById("playlistDescription").textContent =
    playlist.description;

document.getElementById("playlistImage").src =
    playlist.image;

// ======================================
// Crear lista de canciones
// ======================================

const songsContainer = document.getElementById("songsContainer");

playlist.songs.forEach((song, index) => {

    songsContainer.innerHTML += `

        <div class="song">

            <div class="song-info">

                <img
                    src="${song.image}"
                    class="song-cover"
                    alt="${song.title}">

                <div>

                    <h3>${song.title}</h3>

                    <p>${song.artist}</p>

                </div>

            </div>

            <div class="song-buttons">

                <button
                    class="favoriteBtn"
                    data-index="${index}">
                    ♡
                </button>

                <button
                    class="playSong"
                    data-index="${index}">
                    ▶
                </button>

            </div>

        </div>

    `;

});

// =======================================================
// PARTE 3
// Reproducción de canciones
// =======================================================

// Función para reproducir una canción
function playSong(index) {

    currentSong = index;

    const song = playlist.songs[index];

    // Cambiar información del reproductor
    playerCover.src = song.image;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    // Cargar audio
    audioPlayer.src = song.audio;

    // Reproducir
    audioPlayer.play();

    // Cambiar botón principal
    playBtn.textContent = "⏸";

    // Girar portada
    playerCover.classList.add("playing");

    // Restaurar todos los botones
    document.querySelectorAll(".playSong").forEach(btn => {
        btn.textContent = "▶";
    });

    // Cambiar únicamente el botón de la canción actual
    const currentBtn = document.querySelector(
        `.playSong[data-index="${index}"]`
    );

    if (currentBtn) {
        currentBtn.textContent = "⏸";
    }

}

// ======================================
// Click en una canción
// ======================================

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("playSong")) {

        const index = Number(e.target.dataset.index);

        if (
            currentSong === index &&
            !audioPlayer.paused
        ) {

            audioPlayer.pause();

            playBtn.textContent = "▶";

            e.target.textContent = "▶";

            playerCover.classList.remove("playing");

        } else {

            playSong(index);

        }

    }

});

// ======================================
// Botón Play / Pause
// ======================================

playBtn.addEventListener("click", () => {

    if (!audioPlayer.src) return;

    if (audioPlayer.paused) {

        audioPlayer.play();

        playBtn.textContent = "⏸";

        playerCover.classList.add("playing");

    } else {

        audioPlayer.pause();

        playBtn.textContent = "▶";

        playerCover.classList.remove("playing");

    }

});

// ======================================
// Reproducir todo
// ======================================

playAllBtn.addEventListener("click", () => {

    playSong(0);

});

// ======================================
// Canción anterior
// ======================================

prevBtn.addEventListener("click", () => {

    if (currentSong > 0) {

        playSong(currentSong - 1);

    }

});

// ======================================
// Canción siguiente
// ======================================

nextBtn.addEventListener("click", () => {

    if (currentSong < playlist.songs.length - 1) {

        playSong(currentSong + 1);

    }

}); 

// =======================================================
// PARTE 4
// Barra de progreso, tiempo y favoritos
// =======================================================

// Cargar favoritos guardados
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Pintar corazones al cargar la página
document.querySelectorAll(".favoriteBtn").forEach(btn => {

    const index = Number(btn.dataset.index);

    const song = playlist.songs[index];

    const existe = favorites.some(f =>
        f.title === song.title &&
        f.artist === song.artist
    );

    if (existe) {
        btn.textContent = "❤";
        btn.classList.add("active");
    }

});

// ======================================
// Agregar / quitar favoritos
// ======================================

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("favoriteBtn")) return;

    const index = Number(e.target.dataset.index);

    const song = playlist.songs[index];

    const existe = favorites.find(f =>
        f.title === song.title &&
        f.artist === song.artist
    );

    if (existe) {

        favorites = favorites.filter(f =>
            !(f.title === song.title && f.artist === song.artist)
        );

        e.target.textContent = "♡";
        e.target.classList.remove("active");

    } else {

        favorites.push(song);

        e.target.textContent = "❤";
        e.target.classList.add("active");

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

});

// ======================================
// Duración de la canción
// ======================================

audioPlayer.addEventListener("loadedmetadata", () => {

    progressBar.max = Math.floor(audioPlayer.duration);

    durTime.textContent = formatTime(audioPlayer.duration);

});

// ======================================
// Actualizar barra de progreso
// ======================================

audioPlayer.addEventListener("timeupdate", () => {

    progressBar.value = Math.floor(audioPlayer.currentTime);

    curTime.textContent = formatTime(audioPlayer.currentTime);

});

// ======================================
// Mover la barra manualmente
// ======================================

progressBar.addEventListener("input", () => {

    audioPlayer.currentTime = progressBar.value;

});

// ======================================
// Cuando termina una canción
// ======================================

audioPlayer.addEventListener("ended", () => {

    if (currentSong < playlist.songs.length - 1) {

        playSong(currentSong + 1);

    } else {

        playBtn.textContent = "▶";

        playerCover.classList.remove("playing");

    }

});

// ======================================
// Formato mm:ss
// ======================================

function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

}