// ============================================================
// MusicIk - playlists.js
// ============================================================

const IMG_BASE = "assets/images/covers/";

const playlists = [

    {
        name: "Para bailar",
        description: "Las mejores canciones para bailar.",
        songs: 6,
        image: IMG_BASE + "para_bailar.jpg",
        audio: "assets/audio/quiero_bailar.mp3"
    },

    {
        name: "Para llorar",
        description: "Canciones para sacar los sentimientos.",
        songs: 6,
        image: IMG_BASE + "para_llorar.jpg",
        audio: "assets/audio/rosa_pastel.mp3"
    },

    {
        name: "Bonitas",
        description: "Canciones bonitas para cualquier momento.",
        songs: 5,
        image: IMG_BASE + "bonitas.jpg",
        audio: "assets/audio/baila_mi_corazon.mp3"
    },

    {
        name: "Para lavar ropa",
        description: "Porque hasta lavar ropa tiene su soundtrack.",
        songs: 5,
        image: IMG_BASE + "para_lavar_ropa.jpg",
        audio: "assets/audio/de_contrabando.mp3"
    }

];

const playlistGrid = document.getElementById("playlistGrid");

playlists.forEach((playlist) => {

    playlistGrid.innerHTML += `

    <div class="playlist-card" onclick="openPlaylist('${playlist.name}')">

        <img src="${playlist.image}" alt="${playlist.name}">

        <div class="playlist-info">

            <h3>${playlist.name}</h3>

            <p>${playlist.description}</p>

            <div class="playlist-footer">

                <span>${playlist.songs} canciones</span>

                <button
                    class="play-btn"
                    onclick="event.stopPropagation(); playPlaylist('${playlist.name}','${playlist.image}','${playlist.audio}')">
                    ▶ Reproducir
                </button>

            </div>

        </div>

    </div>

    `;

});

function playPlaylist(name,image,audio){

    document.getElementById("playerCover").src=image;
    document.getElementById("playerTitle").textContent=name;
    document.getElementById("playerArtist").textContent="Playlist de MusicIk";

    const player=document.getElementById("audioPlayer");

    player.src=audio;

    player.play();

}

function openPlaylist(name){

    window.location.href="playlist.html?name="+encodeURIComponent(name);

}