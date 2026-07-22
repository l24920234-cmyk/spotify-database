// =======================================================
// MusicIk - artista.js
// =======================================================

// Obtener nombre del artista
const params = new URLSearchParams(window.location.search);
const artistName = params.get("name");

// =======================================================
// Base de datos de artistas
// =======================================================

const artists = {

    "Bad Bunny":{

        country:"🇵🇷 Puerto Rico",

        genre:"Reggaetón",

        followers:"56.3 M",

        albums:8,

        totalSongs:"140+",

        image:"assets/images/covers/bad_bunny.jpg",

        bio:"Benito Antonio Martínez Ocasio, conocido como Bad Bunny, es uno de los artistas latinos más exitosos del mundo. Ha ganado múltiples premios Grammy y Latin Grammy gracias a álbumes como Un Verano Sin Ti y Nadie Sabe Lo Que Va a Pasar Mañana.",

        songs:[

            {
                title:"Moscow Mule",
                artist:"Bad Bunny",
                image:"assets/images/covers/moscow_mule.jpg",
                audio:"assets/audio/moscow_mule.mp3"
            },

            {
                title:"Tití Me Preguntó",
                artist:"Bad Bunny",
                image:"assets/images/covers/titi_me_pregunto.jpg",
                audio:"assets/audio/titi_me_pregunto.mp3"
            },

            {
                title:"Efecto",
                artist:"Bad Bunny",
                image:"assets/images/covers/efecto.jpg",
                audio:"assets/audio/efecto.mp3"
            },

            {
                title:"Ojitos Lindos",
                artist:"Bad Bunny",
                image:"assets/images/covers/ojitos_lindos.jpg",
                audio:"assets/audio/ojitos_lindos.mp3"
            },

            {
                title:"Me Porto Bonito",
                artist:"Bad Bunny",
                image:"assets/images/covers/me_porto_bonito.jpg",
                audio:"assets/audio/me_porto_bonito.mp3"
            }

        ]

    },

    "Belanova":{

        country:"🇲🇽 México",

        genre:"Pop",

        followers:"8.7 M",

        albums:6,

        totalSongs:"70+",

        image:"assets/images/covers/belanova.jpg",

        bio:"Belanova es una agrupación mexicana originaria de Guadalajara. Alcanzó gran éxito con temas como Rosa Pastel, Niño y Baila Mi Corazón, convirtiéndose en uno de los grupos pop más importantes de México.",

        songs:[

            {
                title:"Rosa Pastel",
                artist:"Belanova",
                image:"assets/images/covers/rosa_pastel.jpg",
                audio:"assets/audio/rosa_pastel.mp3"
            },

            {
                title:"Cada Que...",
                artist:"Belanova",
                image:"assets/images/covers/cada_que.jpg",
                audio:"assets/audio/cada_que.mp3"
            },

            {
                title:"Baila Mi Corazón",
                artist:"Belanova",
                image:"assets/images/covers/baila_mi_corazon.jpg",
                audio:"assets/audio/baila_mi_corazon.mp3"
            },

            {
                title:"Niño",
                artist:"Belanova",
                image:"assets/images/covers/nino.jpg",
                audio:"assets/audio/nino.mp3"
            },

            {
                title:"Me Pregunto",
                artist:"Belanova",
                image:"assets/images/covers/me_pregunto.jpg",
                audio:"assets/audio/me_pregunto.mp3"
            }

        ]

    },

    "José José":{

        country:"🇲🇽 México",

        genre:"Balada",

        followers:"12.5 M",

        albums:35,

        totalSongs:"500+",

        image:"assets/images/covers/jose_jose.jpg",

        bio:"José José, conocido como 'El Príncipe de la Canción', fue uno de los intérpretes más importantes de la música en español. Su voz y sus baladas marcaron generaciones enteras.",

        songs:[

            {
                title:"El Triste",
                artist:"José José",
                image:"assets/images/covers/el_triste.jpg",
                audio:"assets/audio/el_triste.mp3"
            },

            {
                title:"Lo Dudo",
                artist:"José José",
                image:"assets/images/covers/lo_dudo.jpg",
                audio:"assets/audio/lo_dudo.mp3"
            },

            {
                title:"Gavilán o Paloma",
                artist:"José José",
                image:"assets/images/covers/gavilan_o_paloma.jpg",
                audio:"assets/audio/gavilan_o_paloma.mp3"
            },

            {
                title:"Amar y Querer",
                artist:"José José",
                image:"assets/images/covers/amar_y_querer.jpg",
                audio:"assets/audio/amar_y_querer.mp3"
            },

            {
                title:"Almohada",
                artist:"José José",
                image:"assets/images/covers/almohada.jpg",
                audio:"assets/audio/almohada.mp3"
            }

        ]

    },

    "La Arrolladora":{

        country:"🇲🇽 México",

        genre:"Regional Mexicano",

        followers:"9.2 M",

        albums:18,

        totalSongs:"250+",

        image:"assets/images/covers/la_arrolladora.jpg",

        bio:"La Arrolladora Banda El Limón es una de las agrupaciones de banda sinaloense más exitosas de México, reconocida por sus éxitos románticos y regionales.",

        songs:[

            {
                title:"Ya Es Muy Tarde",
                artist:"La Arrolladora",
                image:"assets/images/covers/ya_es_muy_tarde.jpg",
                audio:"assets/audio/ya_es_muy_tarde.mp3"
            },

            {
                title:"El Final de Nuestra Historia",
                artist:"La Arrolladora",
                image:"assets/images/covers/el_final_de_nuestra_historia.jpg",
                audio:"assets/audio/el_final_de_nuestra_historia.mp3"
            },

            {
                title:"Sobre Mis Pies",
                artist:"La Arrolladora",
                image:"assets/images/covers/sobre_mis_pies.jpg",
                audio:"assets/audio/sobre_mis_pies.mp3"
            },

            {
                title:"Llamada de Mi Ex",
                artist:"La Arrolladora",
                image:"assets/images/covers/llamada_de_mi_ex.jpg",
                audio:"assets/audio/llamada_de_mi_ex.mp3"
            },

            {
                title:"Mi Segunda Vida",
                artist:"La Arrolladora",
                image:"assets/images/covers/mi_segunda_vida.jpg",
                audio:"assets/audio/mi_segunda_vida.mp3"
            }

        ]

    },

    "Joan Sebastian":{

        country:"🇲🇽 México",

        genre:"Regional Mexicano",

        followers:"10.8 M",

        albums:42,

        totalSongs:"600+",

        image:"assets/images/covers/joan_sebastian.jpg",

        bio:"Joan Sebastian, conocido como 'El Poeta del Pueblo', fue uno de los compositores e intérpretes más importantes de la música regional mexicana. Ganó varios premios Grammy y Latin Grammy durante su carrera.",

        songs:[

            {
                title:"Tatuajes",
                artist:"Joan Sebastian",
                image:"assets/images/covers/tatuajes.jpg",
                audio:"assets/audio/tatuajes.mp3"
            },

            {
                title:"Secreto de Amor",
                artist:"Joan Sebastian",
                image:"assets/images/covers/secreto_de_amor.jpg",
                audio:"assets/audio/secreto_de_amor.mp3"
            },

            {
                title:"Eso y Más",
                artist:"Joan Sebastian",
                image:"assets/images/covers/eso_y_mas.jpg",
                audio:"assets/audio/eso_y_mas.mp3"
            },

            {
                title:"Te Irá Mejor Sin Mí",
                artist:"Joan Sebastian",
                image:"assets/images/covers/te_ira_mejor_sin_mi.jpg",
                audio:"assets/audio/te_ira_mejor_sin_mi.mp3"
            },

            {
                title:"25 Rosas",
                artist:"Joan Sebastian",
                image:"assets/images/covers/25_rosas.jpg",
                audio:"assets/audio/25_rosas.mp3"
            }

        ]

    },

    "Los Parras":{

        country:"🇲🇽 México",

        genre:"Regional Mexicano",

        followers:"2.5 M",

        albums:5,

        totalSongs:"60+",

        image:"assets/images/covers/los_parras.jpg",

        bio:"Los Parras es una agrupación mexicana de música regional que ha ganado popularidad por su estilo norteño y sus corridos románticos, conquistando a un público joven.",

        songs:[

            {
                title:"Por Verte Feliz",
                artist:"Los Parras",
                image:"assets/images/covers/por_verte_feliz.jpg",
                audio:"assets/audio/por_verte_feliz.mp3"
            },

            {
                title:"En Otra Vida",
                artist:"Los Parras",
                image:"assets/images/covers/en_otra_vida.jpg",
                audio:"assets/audio/en_otra_vida.mp3"
            },

            {
                title:"No Te Voy A Rogar",
                artist:"Los Parras",
                image:"assets/images/covers/no_te_voy_a_rogar.jpg",
                audio:"assets/audio/no_te_voy_a_rogar.mp3"
            },

            {
                title:"No Es Fácil",
                artist:"Los Parras",
                image:"assets/images/covers/no_es_facil.jpg",
                audio:"assets/audio/no_es_facil.mp3"
            },

            {
                title:"Qué Bonito",
                artist:"Los Parras",
                image:"assets/images/covers/que_bonito.jpg",
                audio:"assets/audio/que_bonito.mp3"
            }

        ]

    }

};

const artist = artists[artistName];

if(!artist){

    document.body.innerHTML="<h1 style='color:white;text-align:center;margin-top:120px;'>Artista no encontrado</h1>";

    throw new Error("Artista no encontrado");

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
// Información del artista
// =======================================================

document.getElementById("artistName").textContent = artistName;

document.getElementById("artistGenre").textContent =
    artist.genre;

document.getElementById("artistImage").src =
    artist.image;

document.getElementById("artistCountry").textContent =
    "🌎 " + artist.country;

document.getElementById("artistFollowers").textContent =
    "👥 " + artist.followers + " seguidores";

document.getElementById("artistAlbums").textContent =
    "💿 " + artist.albums + " álbumes";

document.getElementById("artistSongs").textContent =
    "🎵 " + artist.totalSongs;

document.getElementById("artistBio").textContent =
    artist.bio;

// =======================================================
// Crear lista de canciones
// =======================================================

const songsContainer = document.getElementById("songsContainer");

artist.songs.forEach((song,index)=>{

    songsContainer.innerHTML += `

    <div class="song">

        <div class="song-info">

            <img
                src="${song.image}"
                class="song-cover">

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
// Reproductor
// =======================================================

// Reproducir una canción
function playSong(index){

    currentSong = index;

    const song = artist.songs[index];

    // Actualizar reproductor inferior
    playerCover.src = song.image;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    // Cargar audio
    audioPlayer.src = song.audio;
    audioPlayer.play();

    // Cambiar botón principal
    playBtn.textContent = "⏸";

    // Girar imagen del artista
    document.getElementById("artistImage").classList.add("playing");

    // Reiniciar todos los botones
    document.querySelectorAll(".playSong").forEach(btn=>{

        btn.textContent="▶";

    });

    // Cambiar solo el botón de la canción actual
    const btnActual=document.querySelector(

        `.playSong[data-index="${index}"]`

    );

    if(btnActual){

        btnActual.textContent="⏸";

    }

}

// =======================================================
// Click en una canción
// =======================================================

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("playSong")){

        playSong(Number(e.target.dataset.index));

    }

});

// =======================================================
// Reproducir todo
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

        document.getElementById("artistImage")
            .classList.add("playing");

    }else{

        audioPlayer.pause();

        playBtn.textContent="▶";

        document.getElementById("artistImage")
            .classList.remove("playing");

    }

});

// =======================================================
// Canción siguiente
// =======================================================

nextBtn.addEventListener("click",()=>{

    if(currentSong < artist.songs.length-1){

        playSong(currentSong+1);

    }else{

        playSong(0);

    }

});

// =======================================================
// Canción anterior
// =======================================================

prevBtn.addEventListener("click",()=>{

    if(currentSong>0){

        playSong(currentSong-1);

    }else{

        playSong(artist.songs.length-1);

    }

});

// =======================================================
// Cuando termina una canción
// =======================================================

audioPlayer.addEventListener("ended",()=>{

    if(currentSong < artist.songs.length-1){

        playSong(currentSong+1);

    }else{

        playSong(0);

    }

});

// =======================================================
// PARTE 4
// Favoritos, barra de progreso y tiempo
// =======================================================

// Obtener favoritos guardados
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Marcar favoritos al cargar la página
document.querySelectorAll(".favoriteBtn").forEach(btn => {

    const index = Number(btn.dataset.index);

    const song = artist.songs[index];

    const existe = favorites.some(f =>
        f.title === song.title &&
        f.artist === song.artist
    );

    if (existe) {
        btn.textContent = "❤";
        btn.classList.add("active");
    }

});

// Agregar o quitar favoritos
document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("favoriteBtn")) return;

    const index = Number(e.target.dataset.index);

    const song = artist.songs[index];

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

// =========================================
// Duración de la canción
// =========================================

audioPlayer.addEventListener("loadedmetadata", () => {

    progressBar.max = Math.floor(audioPlayer.duration);

    durTime.textContent = formatTime(audioPlayer.duration);

});

// =========================================
// Actualizar barra y tiempo
// =========================================

audioPlayer.addEventListener("timeupdate", () => {

    progressBar.value = Math.floor(audioPlayer.currentTime);

    curTime.textContent = formatTime(audioPlayer.currentTime);

});

// =========================================
// Mover la barra manualmente
// =========================================

progressBar.addEventListener("input", () => {

    audioPlayer.currentTime = progressBar.value;

});

// =========================================
// Cuando se pausa la canción
// =========================================

audioPlayer.addEventListener("pause", () => {

    playBtn.textContent = "▶";

    document.getElementById("artistImage")
        .classList.remove("playing");

});

// =========================================
// Cuando vuelve a reproducirse
// =========================================

audioPlayer.addEventListener("play", () => {

    playBtn.textContent = "⏸";

    document.getElementById("artistImage")
        .classList.add("playing");

});

// =========================================
// Formato mm:ss
// =========================================

function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

}