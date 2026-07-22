// ============================================================
// MusicIk - albumes.js
// Genera las tarjetas de los álbumes
// ============================================================

// Ruta de las imágenes
const IMG_BASE = "assets/images/covers/";

// Información de los álbumes
const albumes = [

    {
        name: "Un Verano Sin Ti",
        artist: "Bad Bunny",
        songs: 5,
        image: IMG_BASE + "un_verano_sin_ti.jpg"
    },

    {
        name: "Cocktail",
        artist: "Belanova",
        songs: 5,
        image: IMG_BASE + "cocktail.jpg"
    },

    {
        name: "Secretos",
        artist: "José José",
        songs: 5,
        image: IMG_BASE + "secretos.jpg"
    },

    {
        name: "La Arrolladora",
        artist: "La Arrolladora Banda El Limón",
        songs: 5,
        image: IMG_BASE + "arrolladora.jpg"
    }

];

// Contenedor
const albumGrid = document.getElementById("albumGrid");

// Crear tarjetas
albumes.forEach((album) => {

    albumGrid.innerHTML += `

        <div class="album-card"
     onclick="openAlbum('${album.name}')">

            <img src="${album.image}" alt="${album.name}">

            <div class="album-info">

                <h3>${album.name}</h3>

                <p>${album.artist}</p>

                <div class="album-footer">

                    <span>${album.songs} canciones</span>

                    <button
class="play-btn"
onclick="event.stopPropagation(); openAlbum('${album.name}')">

    ▶ Ver álbum

</button>

                </div>

            </div>

        </div>

    `;

});

// =====================================
// Abrir álbum
// =====================================

function openAlbum(name){

    window.location.href =
    "album.html?name=" + encodeURIComponent(name);

}