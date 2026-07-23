// ============================================================
// MUSICIK - HOME-CONTENT.JS
// Vive DENTRO del iframe. Solo carga y muestra canciones;
// la reproducción real la maneja el shell (player.js) via
// parent.MusicikPlayer
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    let allSongs = [];

    const recGrid = document.getElementById("recommendedGrid");
    const trendGrid = document.getElementById("trendingGrid");

    // ---------- SALUDO ----------
    try {
        const usuario = JSON.parse(localStorage.getItem("musicik_usuario"));
        if (usuario && usuario.nombre) {
            const primerNombre = usuario.nombre.split(" ")[0];
            document.querySelector(".hero-greeting").innerHTML =
                `¡Hola, ${primerNombre}! <span class="wave">👋</span>`;
        }
    } catch (error) {
        console.log("No hay usuario en sesión.");
    }

    // ---------- IMÁGENES ROTAS ----------
    document.body.addEventListener("error", (e) => {
        if (e.target.tagName === "IMG") {
            e.target.classList.add("imagen-error");
            e.target.removeAttribute("src");
        }
    }, true);

    // ---------- CARGAR CANCIONES ----------
    async function cargarCanciones() {
        try {
            const usuario = JSON.parse(localStorage.getItem("musicik_usuario"));

            const respuestaCanciones = await fetch(
                `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/canciones`
            );
            const canciones = await respuestaCanciones.json();

            const respuestaFavoritos = await fetch(
                `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/favoritos/${usuario.id}`
            );
            const favoritos = await respuestaFavoritos.json();

            const idsFavoritos = favoritos.map(f => f.id);
            canciones.forEach(c => { c.liked = idsFavoritos.includes(c.id); });

            allSongs = canciones;

            // Le avisa al shell (afuera del iframe) cuál es la lista completa,
            // para que los botones de siguiente/anterior funcionen bien.
            if (window.parent && window.parent.MusicikPlayer) {
                window.parent.MusicikPlayer.setAllSongs(allSongs);
            }

            renderizarCanciones();

        } catch (error) {
            console.error("Error al cargar canciones:", error);
        }
    }

    function trackCard(t, delay = 0) {
        return `
            <div class="card" style="animation-delay:${delay}ms">
                <div class="card-art">
                    <img src="../${t.imagen}" alt="${t.titulo}" loading="lazy">
                    <button class="card-menu" aria-label="Más opciones">
                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="5" r="1.4"/>
                            <circle cx="12" cy="12" r="1.4"/>
                            <circle cx="12" cy="19" r="1.4"/>
                        </svg>
                    </button>
                    <button class="card-play" aria-label="Reproducir ${t.titulo}">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                </div>
                <div class="card-foot">
                    <div>
                        <p class="card-title">${t.titulo}</p>
                        <p class="card-artist">${t.artista}</p>
                    </div>
                    <button class="like-btn ${t.liked ? "active" : ""}" data-id="${t.id}" aria-label="Favorito">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 20s-7-4.35-9.5-8.5C.7 8 2 4.5 5.5 4.5 8 4.5 9.5 6 12 8.5c2.5-2.5 4-4 6.5-4C22 4.5 23.3 8 21.5 11.5 19 15.65 12 20 12 20z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    function renderizarCanciones() {
        if (recGrid) {
            recGrid.innerHTML = allSongs.slice(0, 4).map((c, i) => trackCard(c, i * 60)).join("");
        }
        if (trendGrid) {
            trendGrid.innerHTML = allSongs.slice(4).map((c, i) => trackCard(c, i * 60)).join("");
        }
    }

    // ---------- REPRODUCIR UNA TARJETA (avisa al shell) ----------
    document.body.addEventListener("click", (e) => {
        const playBtn = e.target.closest(".card-play");
        if (!playBtn) return;

        const card = playBtn.closest(".card");
        const cards = [...card.parentElement.children];
        let index = cards.indexOf(card);

        if (card.parentElement.id === "trendingGrid") {
            index += 4;
        }

        const song = allSongs[index];

        if (window.parent && window.parent.MusicikPlayer) {
            window.parent.MusicikPlayer.playSong(song, index);
        }
    });

    // ---------- REPRODUCIR TODO ----------
    const playAllBtn = document.getElementById("playAllBtn");
    if (playAllBtn) {
        playAllBtn.addEventListener("click", () => {
            if (window.parent && window.parent.MusicikPlayer) {
                window.parent.MusicikPlayer.playAll(allSongs);
            }
        });
    }

    // ---------- FAVORITOS ----------
    document.body.addEventListener("click", async (e) => {
        const btn = e.target.closest(".like-btn");
        if (!btn) return;

        const id = Number(btn.dataset.id);
        const usuario = JSON.parse(localStorage.getItem("musicik_usuario"));

        if (!usuario) {
            alert("Debes iniciar sesión.");
            return;
        }

        const datos = { usuario_id: usuario.id, cancion_id: id };
        const urlBase = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/favoritos`;

        if (btn.classList.contains("active")) {
            await fetch(urlBase, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
            btn.classList.remove("active");
        } else {
            await fetch(urlBase, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
            btn.classList.add("active");
        }
    });

    // ---------- HERO SLIDER ----------
    const heroImages = [
        "../assets/images/hero/hero-1.jpg",
        "../assets/images/hero/hero-2.jpg",
        "../assets/images/hero/hero-3.jpg"
    ];

    const heroSlide = document.querySelector(".hero-slide");
    const dots = document.querySelectorAll(".dot-ind");
    let heroIndex = 0;

    function goToSlide(index) {
        heroIndex = index;
        heroSlide.style.backgroundImage =
            `linear-gradient(180deg, rgba(12,10,20,.15), rgba(12,10,20,.75)), url('${heroImages[index]}')`;
        dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
    });

    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        goToSlide(heroIndex);
    }, 6000);

    // ---------- INICIALIZACIÓN ----------
    cargarCanciones();

});