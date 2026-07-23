const params = new URLSearchParams(window.location.search);
const artistName = params.get("name");

const IMG_BASE = "../assets/images/covers/";
const AUDIO_BASE = "../assets/audio/";

const artists = {

    "Bad Bunny": {
        country: "🇵🇷 Puerto Rico",
        genre: "Reggaetón",
        followers: "56.3 M",
        albums: 8,
        totalSongs: "140+",
        image: IMG_BASE + "bad_bunny.jpg",
        bio: "Benito Antonio Martínez Ocasio, conocido como Bad Bunny, es uno de los artistas latinos más exitosos del mundo. Ha ganado múltiples premios Grammy y Latin Grammy gracias a álbumes como Un Verano Sin Ti y Nadie Sabe Lo Que Va a Pasar Mañana.",
        songs: [
            { title: "Moscow Mule", artist: "Bad Bunny", image: IMG_BASE + "moscow_mule.jpg", audio: AUDIO_BASE + "moscow_mule.mp3" },
            { title: "Tití Me Preguntó", artist: "Bad Bunny", image: IMG_BASE + "titi_me_pregunto.jpg", audio: AUDIO_BASE + "titi_me_pregunto.mp3" },
            { title: "Efecto", artist: "Bad Bunny", image: IMG_BASE + "efecto.jpg", audio: AUDIO_BASE + "efecto.mp3" },
            { title: "Ojitos Lindos", artist: "Bad Bunny", image: IMG_BASE + "ojitos_lindos.jpg", audio: AUDIO_BASE + "ojitos_lindos.mp3" },
            { title: "Me Porto Bonito", artist: "Bad Bunny", image: IMG_BASE + "me_porto_bonito.jpg", audio: AUDIO_BASE + "me_porto_bonito.mp3" }
        ]
    },

    "Belanova": {
        country: "🇲🇽 México",
        genre: "Pop",
        followers: "8.7 M",
        albums: 6,
        totalSongs: "70+",
        image: IMG_BASE + "belanova.jpg",
        bio: "Belanova es una agrupación mexicana originaria de Guadalajara. Alcanzó gran éxito con temas como Rosa Pastel, Niño y Baila Mi Corazón, convirtiéndose en uno de los grupos pop más importantes de México.",
        songs: [
            { title: "Rosa Pastel", artist: "Belanova", image: IMG_BASE + "rosa_pastel.jpg", audio: AUDIO_BASE + "rosa_pastel.mp3" },
            { title: "Cada Que...", artist: "Belanova", image: IMG_BASE + "cada_que.jpg", audio: AUDIO_BASE + "cada_que.mp3" },
            { title: "Baila Mi Corazón", artist: "Belanova", image: IMG_BASE + "baila_mi_corazon.jpg", audio: AUDIO_BASE + "baila_mi_corazon.mp3" },
            { title: "Niño", artist: "Belanova", image: IMG_BASE + "nino.jpg", audio: AUDIO_BASE + "nino.mp3" },
            { title: "Me Pregunto", artist: "Belanova", image: IMG_BASE + "me_pregunto.jpg", audio: AUDIO_BASE + "me_pregunto.mp3" }
        ]
    },

    "José José": {
        country: "🇲🇽 México",
        genre: "Balada",
        followers: "12.5 M",
        albums: 35,
        totalSongs: "500+",
        image: IMG_BASE + "jose_jose.jpg",
        bio: "José José, conocido como 'El Príncipe de la Canción', fue uno de los intérpretes más importantes de la música en español. Su voz y sus baladas marcaron generaciones enteras.",
        songs: [
            { title: "El Triste", artist: "José José", image: IMG_BASE + "el_triste.jpg", audio: AUDIO_BASE + "el_triste.mp3" },
            { title: "Lo Dudo", artist: "José José", image: IMG_BASE + "lo_dudo.jpg", audio: AUDIO_BASE + "lo_dudo.mp3" },
            { title: "Gavilán o Paloma", artist: "José José", image: IMG_BASE + "gavilan_o_paloma.jpg", audio: AUDIO_BASE + "gavilan_o_paloma.mp3" },
            { title: "Amar y Querer", artist: "José José", image: IMG_BASE + "amar_y_querer.jpg", audio: AUDIO_BASE + "amar_y_querer.mp3" },
            { title: "Almohada", artist: "José José", image: IMG_BASE + "almohada.jpg", audio: AUDIO_BASE + "almohada.mp3" }
        ]
    },

    "La Arrolladora": {
        country: "🇲🇽 México",
        genre: "Regional Mexicano",
        followers: "9.2 M",
        albums: 18,
        totalSongs: "250+",
        image: IMG_BASE + "la_arrolladora.jpg",
        bio: "La Arrolladora Banda El Limón es una de las agrupaciones de banda sinaloense más exitosas de México, reconocida por sus éxitos románticos y regionales.",
        songs: [
            { title: "Ya Es Muy Tarde", artist: "La Arrolladora", image: IMG_BASE + "ya_es_muy_tarde.jpg", audio: AUDIO_BASE + "ya_es_muy_tarde.mp3" },
            { title: "El Final de Nuestra Historia", artist: "La Arrolladora", image: IMG_BASE + "el_final_de_nuestra_historia.jpg", audio: AUDIO_BASE + "el_final_de_nuestra_historia.mp3" },
            { title: "Sobre Mis Pies", artist: "La Arrolladora", image: IMG_BASE + "sobre_mis_pies.jpg", audio: AUDIO_BASE + "sobre_mis_pies.mp3" },
            { title: "Llamada de Mi Ex", artist: "La Arrolladora", image: IMG_BASE + "llamada_de_mi_ex.jpg", audio: AUDIO_BASE + "llamada_de_mi_ex.mp3" },
            { title: "Mi Segunda Vida", artist: "La Arrolladora", image: IMG_BASE + "mi_segunda_vida.jpg", audio: AUDIO_BASE + "mi_segunda_vida.mp3" }
        ]
    },

    "Joan Sebastian": {
        country: "🇲🇽 México",
        genre: "Regional Mexicano",
        followers: "10.8 M",
        albums: 42,
        totalSongs: "600+",
        image: IMG_BASE + "joan_sebastian.jpg",
        bio: "Joan Sebastian, conocido como 'El Poeta del Pueblo', fue uno de los compositores e intérpretes más importantes de la música regional mexicana. Ganó varios premios Grammy y Latin Grammy durante su carrera.",
        songs: [
            { title: "Tatuajes", artist: "Joan Sebastian", image: IMG_BASE + "tatuajes.jpg", audio: AUDIO_BASE + "tatuajes.mp3" },
            { title: "Secreto de Amor", artist: "Joan Sebastian", image: IMG_BASE + "secreto_de_amor.jpg", audio: AUDIO_BASE + "secreto_de_amor.mp3" },
            { title: "Eso y Más", artist: "Joan Sebastian", image: IMG_BASE + "eso_y_mas.jpg", audio: AUDIO_BASE + "eso_y_mas.mp3" },
            { title: "Te Irá Mejor Sin Mí", artist: "Joan Sebastian", image: IMG_BASE + "te_ira_mejor_sin_mi.jpg", audio: AUDIO_BASE + "te_ira_mejor_sin_mi.mp3" },
            { title: "25 Rosas", artist: "Joan Sebastian", image: IMG_BASE + "25_rosas.jpg", audio: AUDIO_BASE + "25_rosas.mp3" }
        ]
    },

    "Los Parras": {
        country: "🇲🇽 México",
        genre: "Regional Mexicano",
        followers: "2.5 M",
        albums: 5,
        totalSongs: "60+",
        image: IMG_BASE + "los_parras.jpg",
        bio: "Los Parras es una agrupación mexicana de música regional que ha ganado popularidad por su estilo norteño y sus corridos románticos, conquistando a un público joven.",
        songs: [
            { title: "Por Verte Feliz", artist: "Los Parras", image: IMG_BASE + "por_verte_feliz.jpg", audio: AUDIO_BASE + "por_verte_feliz.mp3" },
            { title: "En Otra Vida", artist: "Los Parras", image: IMG_BASE + "en_otra_vida.jpg", audio: AUDIO_BASE + "en_otra_vida.mp3" },
            { title: "No Te Voy A Rogar", artist: "Los Parras", image: IMG_BASE + "no_te_voy_a_rogar.jpg", audio: AUDIO_BASE + "no_te_voy_a_rogar.mp3" },
            { title: "No Es Fácil", artist: "Los Parras", image: IMG_BASE + "no_es_facil.jpg", audio: AUDIO_BASE + "no_es_facil.mp3" },
            { title: "Qué Bonito", artist: "Los Parras", image: IMG_BASE + "que_bonito.jpg", audio: AUDIO_BASE + "que_bonito.mp3" }
        ]
    }

};

const artist = artists[artistName];

if (!artist) {
    document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:120px;'>Artista no encontrado</h1>";
    throw new Error("Artista no encontrado");
}

document.getElementById("artistName").textContent = artistName;
document.getElementById("artistGenre").textContent = artist.genre;
document.getElementById("artistImage").src = artist.image;
document.getElementById("artistCountry").textContent = "🌎 " + artist.country;
document.getElementById("artistFollowers").textContent = "👥 " + artist.followers + " seguidores";
document.getElementById("artistAlbums").textContent = "💿 " + artist.albums + " álbumes";
document.getElementById("artistSongs").textContent = "🎵 " + artist.totalSongs;
document.getElementById("artistBio").textContent = artist.bio;

const songsContainer = document.getElementById("songsContainer");

artist.songs.forEach((song, index) => {
    songsContainer.innerHTML += `
        <div class="song">
            <div class="song-info">
                <img src="${song.image}" class="song-cover" alt="${song.title}">
                <div>
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
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
    window.parent.MusicikPlayer.setAllSongs(artist.songs);
}

function playSong(index) {
    const song = artist.songs[index];
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
    const song = artist.songs[index];
    const existe = favorites.some(f => f.title === song.title && f.artist === song.artist);
    if (existe) {
        btn.textContent = "❤";
        btn.classList.add("active");
    }
});

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("favoriteBtn")) return;

    const index = Number(e.target.dataset.index);
    const song = artist.songs[index];
    const existe = favorites.find(f => f.title === song.title && f.artist === song.artist);

    if (existe) {
        favorites = favorites.filter(f => !(f.title === song.title && f.artist === song.artist));
        e.target.textContent = "♡";
        e.target.classList.remove("active");
    } else {
        favorites.push(song);
        e.target.textContent = "❤";
        e.target.classList.add("active");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
});