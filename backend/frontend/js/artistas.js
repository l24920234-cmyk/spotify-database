// ============================================================
// MusicIk - artistas.js
// Genera las tarjetas de los artistas y actualiza el
// reproductor cuando el usuario presiona "Escuchar".
// ============================================================

// Ruta donde están las imágenes
const IMG_BASE = "assets/images/covers/";

// Lista de artistas
const artistas = [

    {
        nombre: "Bad Bunny",
        genero: "Reggaetón",
        canciones: 5,
        imagen: IMG_BASE + "bad_bunny.jpg"
    },

    {
        nombre: "Belanova",
        genero: "Pop",
        canciones: 5,
        imagen: IMG_BASE + "belanova.jpg"
    },

    {
        nombre: "José José",
        genero: "Balada",
        canciones: 5,
        imagen: IMG_BASE + "jose_jose.jpg"
    },

    {
        nombre: "La Arrolladora",
        genero: "Regional Mexicano",
        canciones: 5,
        imagen: IMG_BASE + "la_arrolladora.jpg"
    }

];

// Contenedor
const artistGrid = document.getElementById("artistGrid");

// Crear tarjetas
artistas.forEach((artista) => {

    artistGrid.innerHTML += `

    <div
class="artist-card"
onclick="openArtist('${artista.nombre}')">

    <div class="artist-image">

        <img src="${artista.imagen}" alt="${artista.nombre}">

        <button
class="artist-play"
onclick="event.stopPropagation(); openArtist('${artista.nombre}')">

▶

</button>

    </div>

    <div class="artist-info">

        <h3>${artista.nombre}</h3>

        <p>${artista.genero}</p>

        <span>${artista.canciones} canciones</span>

    </div>

</div>

    `;

});

// Reproducir artista
function playArtist(nombre, imagen, audio){

    document.getElementById("playerCover").src = imagen;

    document.getElementById("playerTitle").textContent = nombre;

    document.getElementById("playerArtist").textContent = "Artista";

    const player = document.getElementById("audioPlayer");

    player.src = audio;

    player.play();

}

// =====================================
// Abrir artista
// =====================================

function openArtist(nombre){

    window.location.href =
    "artista.html?name=" + encodeURIComponent(nombre);

}