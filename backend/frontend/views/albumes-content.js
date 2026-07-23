document.addEventListener("DOMContentLoaded", () => {

    const IMG_BASE = "../assets/images/covers/";

    const albumes = [
        { name: "Un Verano Sin Ti", artist: "Bad Bunny", songs: 5, image: IMG_BASE + "un_verano_sin_ti.jpg" },
        { name: "Cocktail", artist: "Belanova", songs: 5, image: IMG_BASE + "cocktail.jpg" },
        { name: "Secretos", artist: "José José", songs: 5, image: IMG_BASE + "secretos.jpg" },
        { name: "La Arrolladora", artist: "La Arrolladora Banda El Limón", songs: 5, image: IMG_BASE + "arrolladora.jpg" }
    ];

    const albumGrid = document.getElementById("albumGrid");

    albumes.forEach((album, index) => {
        albumGrid.innerHTML += `
            <div class="album-card" data-index="${index}">
                <img src="${album.image}" alt="${album.name}">
                <div class="album-info">
                    <h3>${album.name}</h3>
                    <p>${album.artist}</p>
                    <div class="album-footer">
                        <span>${album.songs} canciones</span>
                        <button class="play-btn" data-index="${index}">▶ Ver álbum</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.body.addEventListener("click", (e) => {

        const btn = e.target.closest(".play-btn");
        const card = e.target.closest(".album-card");

        if (btn || card) {
            const index = Number((btn || card).dataset.index);
            const nombre = albumes[index].name;

            window.parent.document.getElementById("contentFrame").src =
                "views/album-content.html?name=" + encodeURIComponent(nombre);
        }

    });

});