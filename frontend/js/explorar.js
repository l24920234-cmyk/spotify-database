document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // Ruta de imágenes
    // ============================================
    const IMG_BASE = "assets/images/covers/";

    // ============================================
    // Canciones recomendadas
    // ============================================
    const recommended = [
        {
            title: "Efecto",
            artist: "Bad Bunny",
            img: IMG_BASE + "dreams.jpg",
            audio: "assets/audio/efecto.mp3"
        },
        {
            title: "Me rehúso",
            artist: "Danny Ocean",
            img: IMG_BASE + "infinity.jpg",
            audio: "assets/audio/me_rehuso.mp3"
        },
        {
            title: "Sentimental",
            artist: "Joan Sebastian",
            img: IMG_BASE + "ocean.jpg",
            audio: "assets/audio/sentimental.mp3"
        },
        {
            title: "Por Verte Feliz",
            artist: "Los Parras",
            img: IMG_BASE + "universe.jpg",
            audio: "assets/audio/por_verte_feliz.mp3"
        }
    ];

    // ============================================
    // Tendencias
    // ============================================
    const trending = [
        {
            title: "Amor prohibido",
            artist: "Selena",
            img: IMG_BASE + "summer.jpg",
            audio: "assets/audio/amor_prohibido.mp3"
        },
        {
            title: "Mil horas",
            artist: "Los Abuelos de la Nada",
            img: IMG_BASE + "moon.jpg",
            audio: "assets/audio/mil_horas.mp3"
        },
        {
            title: "Me voy",
            artist: "Julieta Venegas",
            img: IMG_BASE + "night.jpg",
            audio: "assets/audio/me_voy.mp3"
        },
        {
            title: "Oye mi amor",
            artist: "Maná",
            img: IMG_BASE + "sky.jpg",
            audio: "assets/audio/oye_mi_amor.mp3"
        }
    ];

    // ============================================
    // Convertir canciones a tipo "song"
    // ============================================
    const songs = [

        ...recommended.map(song => ({
            type: "song",
            ...song
        })),

        ...trending.map(song => ({
            type: "song",
            ...song
        }))

    ];

    // ============================================
    // Álbumes
    // ============================================
    const albums = [

        {
            type: "album",
            title: "Un Verano Sin Ti",
            artist: "Bad Bunny",
            img: IMG_BASE + "dreams.jpg"
        },

        {
            type: "album",
            title: "Romances",
            artist: "Luis Miguel",
            img: IMG_BASE + "ocean.jpg"
        },

        {
            type: "album",
            title: "Workout Mix",
            artist: "MusicIk",
            img: IMG_BASE + "universe.jpg"
        }

    ];

    // ============================================
    // Artistas
    // ============================================
    const artists = [

        {
            type: "artist",
            title: "Bad Bunny",
            artist: "Reggaetón",
            img: IMG_BASE + "dreams.jpg"
        },

        {
            type: "artist",
            title: "Luis Miguel",
            artist: "Baladas",
            img: IMG_BASE + "ocean.jpg"
        },

        {
            type: "artist",
            title: "Danny Ocean",
            artist: "Pop Latino",
            img: IMG_BASE + "infinity.jpg"
        }

    ];

    // ============================================
    // Podcasts
    // ============================================
    const podcasts = [

        {
            type: "podcast",
            title: "Hablemos de Tecnología",
            artist: "MusicIk",
            img: IMG_BASE + "summer.jpg"
        },

        {
            type: "podcast",
            title: "IA Podcast",
            artist: "Open AI",
            img: IMG_BASE + "moon.jpg"
        }

    ];

    // ============================================
    // Todos los elementos
    // ============================================
    const allItems = [

        ...songs,

        ...albums,

        ...artists,

        ...podcasts

    ];

    // ============================================
    // Elementos HTML
    // ============================================
    const grid = document.getElementById("exploreGrid");
    const input = document.getElementById("exploreInput");
    const audioPlayer = document.getElementById("audioPlayer");

    // ============================================
    // Dibujar tarjetas
    // ============================================
    function renderSongs(lista) {

        grid.innerHTML = "";

        lista.forEach(item => {

            let etiqueta = "🎵 Canción";

            if (item.type === "album") etiqueta = "💿 Álbum";
            if (item.type === "artist") etiqueta = "🎤 Artista";
            if (item.type === "podcast") etiqueta = "🎙️ Podcast";

            grid.innerHTML += `

            <div class="card">

                <div class="card-art">

                    <img src="${item.img}" alt="${item.title}">

                    ${item.audio ? `
                        <button
                            class="card-play"
                            data-title="${item.title}"
                            data-artist="${item.artist}">
                            ▶
                        </button>
                    ` : ""}

                </div>

                <div class="card-foot">

                    <small>${etiqueta}</small>

                    <p class="card-title">${item.title}</p>

                    <p class="card-artist">${item.artist}</p>

                </div>

            </div>

            `;

        });

    }

    // ============================================
    // Cambiar reproductor
    // ============================================
    function setNowPlaying(song) {

        document.getElementById("playerTitle").textContent = song.title;
        document.getElementById("playerArtist").textContent = song.artist;
        document.getElementById("playerCover").src = song.img;

        document.querySelector(".now-title").textContent = song.title;
        document.querySelector(".now-artist").textContent = song.artist;
        document.querySelector(".now-cover img").src = song.img;

        audioPlayer.src = song.audio;
        audioPlayer.play();

    }

    // Mostrar todo al abrir
    renderSongs(allItems);

    // ============================================
    // Buscador
    // ============================================
    input.addEventListener("input", () => {

        const texto = input.value.toLowerCase();

        const resultado = allItems.filter(item =>

            item.title.toLowerCase().includes(texto) ||
            item.artist.toLowerCase().includes(texto)

        );

        renderSongs(resultado);

    });

    // ============================================
    // Reproducir canciones
    // ============================================
    document.body.addEventListener("click", (e) => {

        const btn = e.target.closest(".card-play");

        if (!btn) return;

        const song = songs.find(c =>

            c.title === btn.dataset.title &&
            c.artist === btn.dataset.artist

        );

        if (song) {

            setNowPlaying(song);

        }

    });

});