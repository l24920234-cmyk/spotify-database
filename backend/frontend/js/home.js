// ============================================================
// MUSICIK - HOME.JS
// Parte 1: Variables globales, saludo y carga de canciones
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  

    // ============================================================
    // VARIABLES GLOBALES
    // ============================================================

    let allSongs = [];
    let currentSongIndex = 0;

    let isPlaying = false;
    let progressTimer = null;

    const audioPlayer = document.getElementById("audioPlayer");

    const PLAYER_STATE_KEY = "musicik_player_state";

    function guardarEstadoReproductor() {
        if (!audioPlayer.src) return;
        localStorage.setItem(PLAYER_STATE_KEY, JSON.stringify({
            src: audioPlayer.src,
            time: audioPlayer.currentTime,
            playing: isPlaying,
            titulo: document.getElementById("playerTitle").textContent,
            artista: document.getElementById("playerArtist").textContent,
            imagen: document.getElementById("playerCover").src
        }));
    }

    function restaurarEstadoReproductor() {
        const guardado = localStorage.getItem(PLAYER_STATE_KEY);
        if (!guardado) return;

        try {
            const estado = JSON.parse(guardado);
            if (!estado.src) return;

            audioPlayer.src = estado.src;
            audioPlayer.currentTime = estado.time || 0;

            document.getElementById("playerTitle").textContent = estado.titulo;
            document.getElementById("playerArtist").textContent = estado.artista;
            document.getElementById("playerCover").src = estado.imagen;

            if (estado.playing) {
                audioPlayer.play().then(() => {
                    isPlaying = true;
                    document.getElementById("playIcon").style.display = "none";
                    document.getElementById("pauseIcon").style.display = "";
                    startProgress();
                }).catch(() => {
                    // El navegador bloqueó el autoplay; se queda pausado
                    isPlaying = false;
                });
            }
        } catch (error) {
            console.error("No se pudo restaurar el reproductor:", error);
        }
    }

    const recGrid = document.getElementById("recommendedGrid");
    const trendGrid = document.getElementById("trendingGrid");
    const exploreGrid = document.getElementById("exploreGrid");


    // ============================================================
    // SALUDO DEL USUARIO
    // ============================================================

    try {

        const usuario = JSON.parse(localStorage.getItem("musicik_usuario"));

        if (usuario && usuario.nombre) {

            const primerNombre = usuario.nombre.split(" ")[0];

            document
                .querySelectorAll(".hero-greeting, .profile span")
                .forEach(el => {

                    if (el.classList.contains("hero-greeting")) {

                        el.innerHTML =
                            `¡Hola, ${primerNombre}! <span class="wave">👋</span>`;

                    } else {

                        el.textContent = primerNombre;

                    }

                });

        }

    } catch (error) {

        console.log("No hay usuario en sesión.");

    }


    // ============================================================
    // RESPALDO PARA IMÁGENES ROTAS
    // ============================================================

    document.body.addEventListener("error", (e) => {

        if (e.target.tagName === "IMG") {

            e.target.classList.add("imagen-error");
            e.target.removeAttribute("src");

        }

    }, true);


    // ============================================================
    // CARGAR CANCIONES DESDE MYSQL
    // ============================================================

    async function cargarCanciones() {

        try {

            const usuario = JSON.parse(
                localStorage.getItem("musicik_usuario")
            );

            // Obtener canciones
            const respuestaCanciones =
                await fetch(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/canciones`);

            const canciones = await respuestaCanciones.json();

            // Obtener favoritos
            const respuestaFavoritos =
                await fetch(
                    `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/favoritos/${usuario.id}`
                );

            const favoritos = await respuestaFavoritos.json();

            // Guardar ids favoritos
            const idsFavoritos = favoritos.map(f => f.id);

            // Marcar canciones favoritas
            canciones.forEach(c => {

                c.liked = idsFavoritos.includes(c.id);

            });

            allSongs = canciones;

            renderizarCanciones();

        } catch (error) {

            console.error("Error al cargar canciones:", error);

        }

    }
        // ============================================================
    // TARJETA DE CANCIÓN
    // ============================================================

    function trackCard(t, delay = 0) {

        return `
            <div class="card" style="animation-delay:${delay}ms">

                <div class="card-art">

                    <img src="${t.imagen}" alt="${t.titulo}" loading="lazy">

                    <button class="card-menu" aria-label="Más opciones">
                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="5" r="1.4"/>
                            <circle cx="12" cy="12" r="1.4"/>
                            <circle cx="12" cy="19" r="1.4"/>
                        </svg>
                    </button>

                    <button class="card-play" aria-label="Reproducir ${t.titulo}">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>

                </div>

                <div class="card-foot">

                    <div>
                        <p class="card-title">${t.titulo}</p>
                        <p class="card-artist">${t.artista}</p>
                    </div>

                    <button
                        class="like-btn ${t.liked ? "active" : ""}"
                        data-id="${t.id}"
                        aria-label="Favorito">

                        <svg viewBox="0 0 24 24">
                            <path d="M12 20s-7-4.35-9.5-8.5C.7 8 2 4.5 5.5 4.5 8 4.5 9.5 6 12 8.5c2.5-2.5 4-4 6.5-4C22 4.5 23.3 8 21.5 11.5 19 15.65 12 20 12 20z"/>
                        </svg>

                    </button>

                </div>

            </div>
        `;

    }


    // ============================================================
    // RENDERIZAR CANCIONES
    // ============================================================

    function renderizarCanciones() {

        if (recGrid) {

            recGrid.innerHTML = allSongs
                .slice(0, 4)
                .map((c, i) => trackCard(c, i * 60))
                .join("");

        }

        if (trendGrid) {

            trendGrid.innerHTML = allSongs
                .slice(4)
                .map((c, i) => trackCard(c, i * 60))
                .join("");

        }

        if (exploreGrid) {

            exploreGrid.innerHTML = allSongs
                .map((c, i) => trackCard(c, i * 40))
                .join("");

        }

    }


    // ============================================================
    // ESCUCHADO RECIENTEMENTE
    // ============================================================

    const recentlyPlayed = [

        {
            titulo:"Suspiros",
            artista:"El Coyote",
            imagen:"assets/images/covers/recent1.jpg"
        },

        {
            titulo:"Sangoloteadito",
            artista:"Joan Sebastian",
            imagen:"assets/images/covers/recent2.jpg"
        },

        {
            titulo:"Viento",
            artista:"Caifanes",
            imagen:"assets/images/covers/recent3.jpg"
        },

        {
            titulo:"Rosa pastel",
            artista:"Belanova",
            imagen:"assets/images/covers/recent4.jpg"
        }

    ];


    document.getElementById("recentList").innerHTML =
        recentlyPlayed.map(t => `

        <li>

            <img src="${t.imagen}" alt="${t.titulo}">

            <div>

                <p class="mini-titulo">${t.titulo}</p>
                <p class="mini-sub">${t.artista}</p>

            </div>

        </li>

    `).join("");
        // ============================================================
    // REPRODUCTOR
    // ============================================================

   function setNowPlaying(song) {

    if (!song) return;

    document.getElementById("playerTitle").textContent = song.titulo;
    document.getElementById("playerArtist").textContent = song.artista;
    document.getElementById("playerCover").src = song.imagen;

    audioPlayer.src = song.audio;

    playTrack();
}


 function playTrack() {

        isPlaying = true;

        document.getElementById("playIcon").style.display = "none";
        document.getElementById("pauseIcon").style.display = "";

        audioPlayer.play();

        startProgress();

        guardarEstadoReproductor();

    }


   function pauseTrack() {

        isPlaying = false;

        document.getElementById("playIcon").style.display = "";
        document.getElementById("pauseIcon").style.display = "none";

        audioPlayer.pause();

        clearInterval(progressTimer);

        guardarEstadoReproductor();

    }


    // ============================================================
    // BOTÓN PLAY / PAUSE
    // ============================================================

    document.getElementById("playBtn").addEventListener("click", () => {

        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }

    });


    // ============================================================
    // REPRODUCIR UNA TARJETA
    // ============================================================

    document.body.addEventListener("click", (e) => {

        const playBtn = e.target.closest(".card-play");

        if (!playBtn) return;

        const card = playBtn.closest(".card");

        const cards = [...card.parentElement.children];

        currentSongIndex = cards.indexOf(card);

        if (card.parentElement.id === "trendingGrid") {
            currentSongIndex += 4;
        }

        const song = allSongs[currentSongIndex];

        setNowPlaying(song);

    });


    // ============================================================
    // BOTÓN PLAY ALL
    // ============================================================

    document.getElementById("playAllBtn").addEventListener("click", () => {

        if (allSongs.length === 0) return;

        currentSongIndex = 0;

        setNowPlaying(allSongs[0]);

    });


    // ============================================================
    // SIGUIENTE
    // ============================================================

    document.getElementById("nextBtn").addEventListener("click", () => {

        currentSongIndex++;

        if (currentSongIndex >= allSongs.length) {
            currentSongIndex = 0;
        }

        setNowPlaying(allSongs[currentSongIndex]);

    });


    // ============================================================
    // ANTERIOR
    // ============================================================

    document.getElementById("prevBtn").addEventListener("click", () => {

        currentSongIndex--;

        if (currentSongIndex < 0) {
            currentSongIndex = allSongs.length - 1;
        }

        setNowPlaying(allSongs[currentSongIndex]);

    });


    // ============================================================
    // CUANDO TERMINA LA CANCIÓN
    // ============================================================

    audioPlayer.addEventListener("ended", () => {

        currentSongIndex++;

        if (currentSongIndex >= allSongs.length) {
            currentSongIndex = 0;
        }

        setNowPlaying(allSongs[currentSongIndex]);

    });
        // ============================================================
    // BARRA DE PROGRESO
    // ============================================================

    const progressFill = document.getElementById("progressFill");
    const progressHandle = document.getElementById("progressHandle");
    const progressTrack = document.getElementById("progressTrack");

    const curTimeEl = document.getElementById("curTime");
    const durTimeEl = document.getElementById("durTime");


    function formatTime(seconds) {

        if (isNaN(seconds)) return "0:00";

        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

        return `${min}:${sec}`;

    }


    function renderProgress() {

        if (!audioPlayer.duration) return;

        const percent =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;

        progressFill.style.width = percent + "%";
        progressHandle.style.left = percent + "%";

        curTimeEl.textContent =
            formatTime(audioPlayer.currentTime);

        durTimeEl.textContent =
            formatTime(audioPlayer.duration);

    }


    function startProgress() {

        clearInterval(progressTimer);

        goToSlide(0);

        progressTimer = setInterval(() => {

            if (isPlaying) {

                renderProgress();

            }

        }, 200);

    }


    progressTrack.addEventListener("click", (e) => {

        if (!audioPlayer.duration) return;

        const rect = progressTrack.getBoundingClientRect();

        const ratio =
            (e.clientX - rect.left) / rect.width;

        audioPlayer.currentTime =
            ratio * audioPlayer.duration;

        renderProgress();

    });


    audioPlayer.addEventListener("timeupdate", renderProgress);
    audioPlayer.addEventListener("timeupdate", () => {
        if (Math.floor(audioPlayer.currentTime) % 3 === 0) {
            guardarEstadoReproductor();
        }
    });

    audioPlayer.addEventListener("loadedmetadata", renderProgress);



    // ============================================================
    // VOLUMEN
    // ============================================================

    const volumeTrack = document.getElementById("volumeTrack");
    const volumeFill = document.getElementById("volumeFill");
    const volumeHandle = document.getElementById("volumeHandle");

    audioPlayer.volume = 0.8;


    function setVolume(ratio) {

        ratio = Math.max(0, Math.min(1, ratio));

        audioPlayer.volume = ratio;

        const percent = ratio * 100;

        volumeFill.style.width = percent + "%";
        volumeHandle.style.left = percent + "%";

    }


    volumeTrack.addEventListener("click", (e) => {

        const rect = volumeTrack.getBoundingClientRect();

        const ratio =
            (e.clientX - rect.left) / rect.width;

        setVolume(ratio);

    });


    setVolume(0.8);



    // ============================================================
    // SHUFFLE Y REPEAT
    // ============================================================

    document
        .getElementById("shuffleBtn")
        .addEventListener("click", function () {

            this.classList.toggle("active");

        });


    document
        .getElementById("repeatBtn")
        .addEventListener("click", function () {

            this.classList.toggle("active");

        });

            // ============================================================
    // HERO SLIDER
    // ============================================================

    const heroImages = [
        "assets/images/hero/hero-1.jpg",
        "assets/images/hero/hero-2.jpg",
        "assets/images/hero/hero-3.jpg"
    ];

    const heroSlide = document.querySelector(".hero-slide");
    const dots = document.querySelectorAll(".dot-ind");

    let heroIndex = 0;

    function goToSlide(index) {

        heroIndex = index;

        heroSlide.style.backgroundImage =
            `linear-gradient(180deg, rgba(12,10,20,.15), rgba(12,10,20,.75)),
            url('${heroImages[index]}')`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

    }

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            goToSlide(index);

        });

    });

    setInterval(() => {

        heroIndex++;

        if (heroIndex >= heroImages.length) {

            heroIndex = 0;

        }

        goToSlide(heroIndex);

    }, 6000);



    // ============================================================
    // BOTÓN BAJAR
    // ============================================================

    const scrollArea = document.querySelector(".scroll-area");
    const scrollHint = document.getElementById("scrollHint");


    function updateScrollHint() {

        if (!scrollArea || !scrollHint) return;

        const atBottom =
            scrollArea.scrollTop + scrollArea.clientHeight >=
            scrollArea.scrollHeight - 20;

        const needsScroll =
            scrollArea.scrollHeight >
            scrollArea.clientHeight + 20;

        scrollHint.classList.toggle(
            "hidden",
            atBottom || !needsScroll
        );

    }


    if (scrollHint) {

        scrollHint.addEventListener("click", () => {

            scrollArea.scrollBy({

                top: scrollArea.clientHeight * 0.8,

                behavior: "smooth"

            });

        });

    }


    if (scrollArea) {

        scrollArea.addEventListener(
            "scroll",
            updateScrollHint
        );

    }


    window.addEventListener(
        "resize",
        updateScrollHint
    );


    window.addEventListener(
        "load",
        updateScrollHint
    );


    if ("ResizeObserver" in window && scrollArea) {

        new ResizeObserver(updateScrollHint)
            .observe(scrollArea);

    }

    setTimeout(updateScrollHint, 300);

    setTimeout(updateScrollHint, 1000);



  // ============================================================
    // INICIALIZACIÓN
    // ============================================================

    restaurarEstadoReproductor();

    cargarCanciones();

    renderProgress();

    updateScrollHint();

    window.addEventListener("beforeunload", guardarEstadoReproductor);

});

// ============================================================
// FAVORITOS
// ============================================================

document.body.addEventListener("click", async (e) => {

    const btn = e.target.closest(".like-btn");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    const usuario = JSON.parse(localStorage.getItem("musicik_usuario"));

    if (!usuario) {
        alert("Debes iniciar sesión.");
        return;
    }

    const datos = {
        usuario_id: usuario.id,
        cancion_id: id
    };

    if (btn.classList.contains("active")) {

      await fetch(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/favoritos`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        btn.classList.remove("active");

    } else {

        await fetch(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/favoritos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        btn.classList.add("active");

    }

});

// ============================================================
// CERRAR SESIÓN
// ============================================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("musicik_usuario");

        window.location.href = "login.html";

    });

}