document.addEventListener("DOMContentLoaded", () => {

    const IMG_BASE = "../assets/images/covers/";
    const AUDIO_BASE = "../assets/audio/";

    const podcasts = [
        { title: "Hablemos de Tecnología", author: "MusicIk", duration: "45 min", image: IMG_BASE + "dreams.jpg", audio: AUDIO_BASE + "efecto.mp3" },
        { title: "Programando con JavaScript", author: "DevCast", duration: "38 min", image: IMG_BASE + "infinity.jpg", audio: AUDIO_BASE + "me_rehuso.mp3" },
        { title: "Inteligencia Artificial", author: "AI Podcast", duration: "52 min", image: IMG_BASE + "ocean.jpg", audio: AUDIO_BASE + "sentimental.mp3" },
        { title: "Café con Música", author: "MusicIk", duration: "29 min", image: IMG_BASE + "universe.jpg", audio: AUDIO_BASE + "por_verte_feliz.mp3" }
    ];

    const podcastGrid = document.getElementById("podcastGrid");

    podcasts.forEach((podcast, index) => {
        podcastGrid.innerHTML += `
            <div class="podcast-card" data-index="${index}">
                <img src="${podcast.image}" alt="${podcast.title}">
                <h3>${podcast.title}</h3>
                <p>${podcast.author}</p>
                <span>${podcast.duration}</span>
                <button class="play-btn" data-index="${index}">▶ Escuchar</button>
            </div>
        `;
    });

    document.body.addEventListener("click", (e) => {

        const btn = e.target.closest(".play-btn");
        if (!btn) return;

        const index = Number(btn.dataset.index);
        const podcast = podcasts[index];

        const song = {
            title: podcast.title,
            artist: "Podcast",
            image: podcast.image,
            audio: podcast.audio
        };

        if (window.parent && window.parent.MusicikPlayer) {
            window.parent.MusicikPlayer.setAllSongs([song]);
            window.parent.MusicikPlayer.playSong(song, 0);
        }

    });

});