// ============================================================
// MUSICIK - PLAYER.JS (vive solo en el shell, nunca se recarga)
// ============================================================

(function () {

    let allSongs = [];
    let currentSongIndex = 0;
    let isPlaying = false;
    let progressTimer = null;

    const audioPlayer = document.getElementById("audioPlayer");
    const progressFill = document.getElementById("progressFill");
    const progressHandle = document.getElementById("progressHandle");
    const progressTrack = document.getElementById("progressTrack");
    const curTimeEl = document.getElementById("curTime");
    const durTimeEl = document.getElementById("durTime");

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    }

    function renderProgress() {
        if (!audioPlayer.duration) return;
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = percent + "%";
        progressHandle.style.left = percent + "%";
        curTimeEl.textContent = formatTime(audioPlayer.currentTime);
        durTimeEl.textContent = formatTime(audioPlayer.duration);
    }

    function startProgress() {
        clearInterval(progressTimer);
        progressTimer = setInterval(() => {
            if (isPlaying) renderProgress();
        }, 200);
    }

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
    }

    function pauseTrack() {
        isPlaying = false;
        document.getElementById("playIcon").style.display = "";
        document.getElementById("pauseIcon").style.display = "none";
        audioPlayer.pause();
        clearInterval(progressTimer);
    }

    document.getElementById("playBtn").addEventListener("click", () => {
        if (isPlaying) pauseTrack();
        else playTrack();
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (!allSongs.length) return;
        currentSongIndex = (currentSongIndex + 1) % allSongs.length;
        setNowPlaying(allSongs[currentSongIndex]);
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (!allSongs.length) return;
        currentSongIndex = (currentSongIndex - 1 + allSongs.length) % allSongs.length;
        setNowPlaying(allSongs[currentSongIndex]);
    });

    audioPlayer.addEventListener("ended", () => {
        if (!allSongs.length) return;
        currentSongIndex = (currentSongIndex + 1) % allSongs.length;
        setNowPlaying(allSongs[currentSongIndex]);
    });

    progressTrack.addEventListener("click", (e) => {
        if (!audioPlayer.duration) return;
        const rect = progressTrack.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = ratio * audioPlayer.duration;
        renderProgress();
    });

    audioPlayer.addEventListener("timeupdate", renderProgress);
    audioPlayer.addEventListener("loadedmetadata", renderProgress);

    // ---------- VOLUMEN ----------
    const volumeTrack = document.getElementById("volumeTrack");
    const volumeFill = document.getElementById("volumeFill");
    const volumeHandle = document.getElementById("volumeHandle");

    function setVolume(ratio) {
        ratio = Math.max(0, Math.min(1, ratio));
        audioPlayer.volume = ratio;
        volumeFill.style.width = ratio * 100 + "%";
        volumeHandle.style.left = ratio * 100 + "%";
    }

    volumeTrack.addEventListener("click", (e) => {
        const rect = volumeTrack.getBoundingClientRect();
        setVolume((e.clientX - rect.left) / rect.width);
    });

    setVolume(0.8);

    document.getElementById("shuffleBtn").addEventListener("click", function () {
        this.classList.toggle("active");
    });

    document.getElementById("repeatBtn").addEventListener("click", function () {
        this.classList.toggle("active");
    });

    // ---------- LOGOUT ----------
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("musicik_usuario");
            window.location.href = "login.html";
        });
    }

    // ---------- NAVEGACIÓN ENTRE SECCIONES (sin recargar el shell) ----------
    const contentFrame = document.getElementById("contentFrame");

    document.querySelectorAll(".nav-item[data-src]").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".nav-item").forEach((i) => i.classList.remove("active"));
            item.classList.add("active");
            contentFrame.src = item.dataset.src;
        });
    });

    // ---------- API QUE LAS PÁGINAS DENTRO DEL IFRAME PUEDEN USAR ----------
    window.MusicikPlayer = {

        setAllSongs(songs) {
            allSongs = songs;
        },

        playSong(song, index) {
            currentSongIndex = index;
            setNowPlaying(song);
        },

        playAll(songs) {
            if (!songs.length) return;
            allSongs = songs;
            currentSongIndex = 0;
            setNowPlaying(songs[0]);
        }

    };

})();