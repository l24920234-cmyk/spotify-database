document.addEventListener("DOMContentLoaded", () => {

    const IMG_BASE = "../assets/images/covers/";

    const artistas = [
        { nombre: "Bad Bunny", genero: "Reggaetón", canciones: 5, imagen: IMG_BASE + "bad_bunny.jpg" },
        { nombre: "Belanova", genero: "Pop", canciones: 5, imagen: IMG_BASE + "belanova.jpg" },
        { nombre: "José José", genero: "Balada", canciones: 5, imagen: IMG_BASE + "jose_jose.jpg" },
        { nombre: "La Arrolladora", genero: "Regional Mexicano", canciones: 5, imagen: IMG_BASE + "la_arrolladora.jpg" },
        { nombre: "Joan Sebastian", genero: "Regional Mexicano", canciones: 5, imagen: IMG_BASE + "joan_sebastian.jpg" },
        { nombre: "Los Parras", genero: "Regional Mexicano", canciones: 5, imagen: IMG_BASE + "los_parras.jpg" }
    ];

    const artistGrid = document.getElementById("artistGrid");

    artistas.forEach((artista, index) => {
        artistGrid.innerHTML += `
            <div class="artist-card" data-index="${index}">
                <div class="artist-image">
                    <img src="${artista.imagen}" alt="${artista.nombre}">
                    <button class="artist-play" data-index="${index}">▶</button>
                </div>
                <div class="artist-info">
                    <h3>${artista.nombre}</h3>
                    <p>${artista.genero}</p>
                    <span>${artista.canciones} canciones</span>
                </div>
            </div>
        `;
    });

    document.body.addEventListener("click", (e) => {

        const btn = e.target.closest(".artist-play");
        const card = e.target.closest(".artist-card");

        if (btn || card) {
            const index = Number((btn || card).dataset.index);
            const nombre = artistas[index].nombre;

            window.parent.document.getElementById("contentFrame").src =
                "views/artista-content.html?name=" + encodeURIComponent(nombre);
        }

    });

});