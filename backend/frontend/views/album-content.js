const params = new URLSearchParams(window.location.search);
const albumName = params.get("name");

const IMG_BASE = "../assets/images/covers/";
const AUDIO_BASE = "../assets/audio/";

const albums = {

    "Un Verano Sin Ti": {
        artist: "Bad Bunny",
        image: IMG_BASE + "un_verano_sin_ti.jpg",
        description: "Uno de los álbumes más exitosos de Bad Bunny.",
        songs: [
            { titulo: "Moscow Mule", artista: "Bad Bunny", imagen: IMG_BASE + "moscow_mule.jpg", audio: AUDIO_BASE + "moscow_mule.mp3" },
            { titulo: "Tití Me Preguntó", artista: "Bad Bunny", imagen: IMG_BASE + "titi_me_pregunto.jpg", audio: AUDIO_BASE + "titi_me_pregunto.mp3" },
            { titulo: "Efecto", artista: "Bad Bunny", imagen: IMG_BASE + "efecto.jpg", audio: AUDIO_BASE + "efecto.mp3" },
            { titulo: "Ojitos Lindos", artista: "Bad Bunny", imagen: IMG_BASE + "ojitos_lindos.jpg", audio: AUDIO_BASE + "ojitos_lindos.mp3" },
            { titulo: "Me Porto Bonito", artista: "Bad Bunny", imagen: IMG_BASE + "me_porto_bonito.jpg", audio: AUDIO_BASE + "me_porto_bonito.mp3" }
        ]
    },

    "Cocktail": {
        artist: "Belanova",
        image: IMG_BASE + "cocktail.jpg",
        description: "Grandes éxitos de Belanova.",
        songs: [
            { titulo: "Rosa Pastel", artista: "Belanova", imagen: IMG_BASE + "rosa_pastel.jpg", audio: AUDIO_BASE + "rosa_pastel.mp3" },
            { titulo: "Cada Que...", artista: "Belanova", imagen: IMG_BASE + "cada_que.jpg", audio: AUDIO_BASE + "cada_que.mp3" },
            { titulo: "Baila Mi Corazón", artista: "Belanova", imagen: IMG_BASE + "baila_mi_corazon.jpg", audio: AUDIO_BASE + "baila_mi_corazon.mp3" },
            { titulo: "Niño", artista: "Belanova", imagen: IMG_BASE + "nino.jpg", audio: AUDIO_BASE + "nino.mp3" },
            { titulo: "Me Pregunto", artista: "Belanova", imagen: IMG_BASE + "me_pregunto.jpg", audio: AUDIO_BASE + "me_pregunto.mp3" }
        ]
    },

    "Secretos": {
        artist: "José José",
        image: IMG_BASE + "secretos.jpg",
        description: "Los clásicos inolvidables de José José.",
        songs: [
            { titulo: "El Triste", artista: "José José", imagen: IMG_BASE + "el_triste.jpg", audio: AUDIO_BASE + "el_triste.mp3" },
            { titulo: "Lo Dudo", artista: "José José", imagen: IMG_BASE + "lo_dudo.jpg", audio: AUDIO_BASE + "lo_dudo.mp3" },
            { titulo: "Gavilán o Paloma", artista: "José José", imagen: IMG_BASE + "gavilan_o_paloma.jpg", audio: AUDIO_BASE + "gavilan_o_paloma.mp3" },
            { titulo: "Amar y Querer", artista: "José José", imagen: IMG_BASE + "amar_y_querer.jpg", audio: AUDIO_BASE + "amar_y_querer.mp3" },
            { titulo: "Almohada", artista: "José José", imagen: IMG_BASE + "almohada.jpg", audio: AUDIO_BASE + "almohada.mp3" }
        ]
    },

    "La Arrolladora": {
        artist: "La Arrolladora Banda El Limón",
        image: IMG_BASE + "arrolladora.jpg",
        description: "Los éxitos más populares de La Arrolladora.",
        songs: [
            { titulo: "Ya Es Muy Tarde", artista: "La Arrolladora", imagen: IMG_BASE + "ya_es_muy_tarde.jpg", audio: AUDIO_BASE + "ya_es_muy_tarde.mp3" },
            { titulo: "El Final de Nuestra Historia", artista: "La Arrolladora", imagen: IMG_BASE + "el_final_de_nuestra_historia.jpg", audio: AUDIO_BASE + "el_final_de_nuestra_historia.mp3" },
            { titulo: "Sobre Mis Pies", artista: "La Arrolladora", imagen: IMG_BASE + "sobre_mis_pies.jpg", audio: AUDIO_BASE + "sobre_mis_pies.mp3" },
            { titulo: "Llamada de Mi Ex", artista: "La Arrolladora", imagen: IMG_BASE + "llamada_de_mi_ex.jpg", audio: AUDIO_BASE + "llamada_de_mi_ex.mp3" },
            { titulo: "Mi Segunda Vida", artista: "La Arrolladora", imagen: IMG_BASE + "mi_segunda_vida.jpg", audio: AUDIO_BASE + "mi_segunda_vida.mp3" }
        ]
    }

};

const album = albums[albumName];

if (!album) {
    document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:120px;'>Álbum no encontrado</h1>";
    throw new Error("Álbum no encontrado");
}

document.getElementById("albumTitle").textContent = albumName;
document.getElementById("albumDescription").textContent = album.description;
document.getElementById("albumImage").src = album.image;

const songsContainer = document.getElementById("songsContainer");

album.songs.forEach((song, index) => {
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

if (window.parent && window.parent.MusicikPlayer) {
    window.parent.MusicikPlayer.setAllSongs(album.songs);
}

function playSong(index) {
    const song = album.songs[index];
    if (window.parent && window.parent.MusicikPlayer) {
        window.parent.MusicikPlayer.playSong(song, index);
    }
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("playSong")) {
        playSong(Number(e.target.dataset.index));
    }
});

document.getElementById("playAllBtn").addEventListener("click", () => {
    playSong(0);
});

// ---- Favoritos ----
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelectorAll(".favoriteBtn").forEach(btn => {
    const index = Number(btn.dataset.index);
    const song = album.songs[index];
    const existe = favorites.some(f => f.titulo === song.titulo && f.artista === song.artista);
    if (existe) {
        btn.textContent = "❤";
        btn.classList.add("active");
    }
});

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("favoriteBtn")) return;

    const index = Number(e.target.dataset.index);
    const song = album.songs[index];
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