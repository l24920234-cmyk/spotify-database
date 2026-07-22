// =======================================================
// MusicIk - album.js
// Reproductor de Álbumes
// =======================================================

// Obtener el nombre del álbum
const params = new URLSearchParams(window.location.search);
const albumName = params.get("name");

// ======================================
// Información de los álbumes
// ======================================

const albums = {

    "Un Verano Sin Ti": {

        artist: "Bad Bunny",

        image: "assets/images/covers/un_verano_sin_ti.jpg",

        description: "Uno de los álbumes más exitosos de Bad Bunny.",

        songs: [

            {
                title: "Moscow Mule",
                artist: "Bad Bunny",
                image: "assets/images/covers/moscow_mule.jpg",
                audio: "assets/audio/moscow_mule.mp3"
            },

            {
                title: "Tití Me Preguntó",
                artist: "Bad Bunny",
                image: "assets/images/covers/titi_me_pregunto.jpg",
                audio: "assets/audio/titi_me_pregunto.mp3"
            },

            {
                title: "Efecto",
                artist: "Bad Bunny",
                image: "assets/images/covers/efecto.jpg",
                audio: "assets/audio/efecto.mp3"
            },

            {
                title: "Ojitos Lindos",
                artist: "Bad Bunny",
                image: "assets/images/covers/ojitos_lindos.jpg",
                audio: "assets/audio/ojitos_lindos.mp3"
            },

            {
                title: "Me Porto Bonito",
                artist: "Bad Bunny",
                image: "assets/images/covers/me_porto_bonito.jpg",
                audio: "assets/audio/me_porto_bonito.mp3"
            }

        ]

    },

    "Cocktail": {

        artist: "Belanova",

        image: "assets/images/covers/cocktail.jpg",

        description: "Grandes éxitos de Belanova.",

        songs: [

            {
                title: "Rosa Pastel",
                artist: "Belanova",
                image: "assets/images/covers/rosa_pastel.jpg",
                audio: "assets/audio/rosa_pastel.mp3"
            },

            {
                title: "Cada Que...",
                artist: "Belanova",
                image: "assets/images/covers/cada_que.jpg",
                audio: "assets/audio/cada_que.mp3"
            },

            {
                title: "Baila Mi Corazón",
                artist: "Belanova",
                image: "assets/images/covers/baila_mi_corazon.jpg",
                audio: "assets/audio/baila_mi_corazon.mp3"
            },

            {
                title: "Niño",
                artist: "Belanova",
                image: "assets/images/covers/nino.jpg",
                audio: "assets/audio/nino.mp3"
            },

            {
                title: "Me Pregunto",
                artist: "Belanova",
                image: "assets/images/covers/me_pregunto.jpg",
                audio: "assets/audio/me_pregunto.mp3"
            }

        ]

    },

    "Secretos": {

        artist: "José José",

        image: "assets/images/covers/secretos.jpg",

        description: "Los clásicos inolvidables de José José.",

        songs: [

            {
                title: "El Triste",
                artist: "José José",
                image: "assets/images/covers/el_triste.jpg",
                audio: "assets/audio/el_triste.mp3"
            },

            {
                title: "Lo Dudo",
                artist: "José José",
                image: "assets/images/covers/lo_dudo.jpg",
                audio: "assets/audio/lo_dudo.mp3"
            },

            {
                title: "Gavilán o Paloma",
                artist: "José José",
                image: "assets/images/covers/gavilan_o_paloma.jpg",
                audio: "assets/audio/gavilan_o_paloma.mp3"
            },

            {
                title: "Amar y Querer",
                artist: "José José",
                image: "assets/images/covers/amar_y_querer.jpg",
                audio: "assets/audio/amar_y_querer.mp3"
            },

            {
                title: "Almohada",
                artist: "José José",
                image: "assets/images/covers/almohada.jpg",
                audio: "assets/audio/almohada.mp3"
            }

        ]

    },

    "La Arrolladora": {

        artist: "La Arrolladora Banda El Limón",

        image: "assets/images/covers/arrolladora.jpg",

        description: "Los éxitos más populares de La Arrolladora.",

        songs: [

            {
                title: "Ya Es Muy Tarde",
                artist: "La Arrolladora",
                image: "assets/images/covers/ya_es_muy_tarde.jpg",
                audio: "assets/audio/ya_es_muy_tarde.mp3"
            },

            {
                title: "El Final de Nuestra Historia",
                artist: "La Arrolladora",
                image: "assets/images/covers/el_final_de_nuestra_historia.jpg",
                audio: "assets/audio/el_final_de_nuestra_historia.mp3"
            },

            {
                title: "Sobre Mis Pies",
                artist: "La Arrolladora",
                image: "assets/images/covers/sobre_mis_pies.jpg",
                audio: "assets/audio/sobre_mis_pies.mp3"
            },

            {
                title: "Llamada de Mi Ex",
                artist: "La Arrolladora",
                image: "assets/images/covers/llamada_de_mi_ex.jpg",
                audio: "assets/audio/llamada_de_mi_ex.mp3"
            },

            {
                title: "Mi Segunda Vida",
                artist: "La Arrolladora",
                image: "assets/images/covers/mi_segunda_vida.jpg",
                audio: "assets/audio/mi_segunda_vida.mp3"
            }

        ]

    }

};

const album = albums[albumName];

if (!album) {

    document.body.innerHTML =
        "<h1 style='color:white;text-align:center;margin-top:120px;'>Álbum no encontrado</h1>";

    throw new Error("Álbum no encontrado");

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

// =======================================================
// Mostrar información del álbum
// =======================================================

document.getElementById("albumTitle").textContent = albumName;

document.getElementById("albumDescription").textContent =
    album.description;

document.getElementById("albumImage").src =
    album.image;

// =======================================================
// Crear lista de canciones
// =======================================================

const songsContainer = document.getElementById("songsContainer");

album.songs.forEach((song, index) => {

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
// Función para reproducir una canción
// =======================================================

function playSong(index){

    currentSong = index;

    const song = album.songs[index];

    playerCover.src = song.image;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    audioPlayer.src = song.audio;

    audioPlayer.play();

    playBtn.textContent = "⏸";

    playerCover.classList.add("playing");

    document.querySelectorAll(".playSong").forEach(btn=>{

        btn.textContent="▶";

    });

    const currentBtn=document.querySelector(
        `.playSong[data-index="${index}"]`
    );

    if(currentBtn){

        currentBtn.textContent="⏸";

    }

}

// =======================================================
// Reproducir una canción
// =======================================================

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("playSong")){

        playSong(Number(e.target.dataset.index));

    }

});

// =======================================================
// Reproducir todo el álbum
// =======================================================

playAllBtn.addEventListener("click",()=>{

    playSong(0);

});

// =======================================================
// Play / Pause
// =======================================================

playBtn.addEventListener("click",()=>{

    if(audioPlayer.src==="") return;

    if(audioPlayer.paused){

        audioPlayer.play();

        playBtn.textContent="⏸";

        playerCover.classList.add("playing");

    }else{

        audioPlayer.pause();

        playBtn.textContent="▶";

        playerCover.classList.remove("playing");

    }

});

// =======================================================
// Canción siguiente
// =======================================================

nextBtn.addEventListener("click",()=>{

    if(currentSong < album.songs.length-1){

        playSong(currentSong+1);

    }

});

// =======================================================
// Canción anterior
// =======================================================

prevBtn.addEventListener("click",()=>{

    if(currentSong>0){

        playSong(currentSong-1);

    }

});

// =======================================================
// PARTE 4
// Barra de progreso, tiempo y favoritos
// =======================================================

// Favoritos
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Pintar favoritos guardados
document.querySelectorAll(".favoriteBtn").forEach(btn => {

    const index = Number(btn.dataset.index);

    const song = album.songs[index];

    const existe = favorites.some(f =>
        f.title === song.title &&
        f.artist === song.artist
    );

    if (existe) {

        btn.textContent = "❤";
        btn.classList.add("active");

    }

});

// Agregar / quitar favoritos
document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("favoriteBtn")) return;

    const index = Number(e.target.dataset.index);

    const song = album.songs[index];

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
// Duración
// ======================================

audioPlayer.addEventListener("loadedmetadata", () => {

    progressBar.max = Math.floor(audioPlayer.duration);

    durTime.textContent = formatTime(audioPlayer.duration);

});

// ======================================
// Actualizar progreso
// ======================================

audioPlayer.addEventListener("timeupdate", () => {

    progressBar.value = Math.floor(audioPlayer.currentTime);

    curTime.textContent = formatTime(audioPlayer.currentTime);

});

// Mover la barra manualmente
progressBar.addEventListener("input", () => {

    audioPlayer.currentTime = progressBar.value;

});

// ======================================
// Cuando termina una canción
// ======================================

audioPlayer.addEventListener("ended", () => {

    if (currentSong < album.songs.length - 1) {

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