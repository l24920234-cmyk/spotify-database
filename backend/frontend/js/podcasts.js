const IMG_BASE = "assets/images/covers/";

const podcasts = [

{
    title:"Hablemos de Tecnología",
    author:"MusicIk",
    duration:"45 min",
    image:IMG_BASE+"dreams.jpg",
    audio:"assets/audio/efecto.mp3"
},

{
    title:"Programando con JavaScript",
    author:"DevCast",
    duration:"38 min",
    image:IMG_BASE+"infinity.jpg",
    audio:"assets/audio/me_rehuso.mp3"
},

{
    title:"Inteligencia Artificial",
    author:"AI Podcast",
    duration:"52 min",
    image:IMG_BASE+"ocean.jpg",
    audio:"assets/audio/sentimental.mp3"
},

{
    title:"Café con Música",
    author:"MusicIk",
    duration:"29 min",
    image:IMG_BASE+"universe.jpg",
    audio:"assets/audio/por_verte_feliz.mp3"
}

];

const podcastGrid=document.getElementById("podcastGrid");

podcasts.forEach((podcast)=>{

podcastGrid.innerHTML+=`

<div class="podcast-card">

<img src="${podcast.image}">

<h3>${podcast.title}</h3>

<p>${podcast.author}</p>

<span>${podcast.duration}</span>

<button
class="play-btn"
onclick="playPodcast('${podcast.title}','${podcast.image}','${podcast.audio}')">

▶ Escuchar

</button>

</div>

`;

});

function playPodcast(title,image,audio){

document.getElementById("playerCover").src=image;

document.getElementById("playerTitle").textContent=title;

document.getElementById("playerArtist").textContent="Podcast";

const player=document.getElementById("audioPlayer");

player.src=audio;

player.play();

}