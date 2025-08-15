const images = [
    "https://via.placeholder.com/500x300?text=Image+1",
    "https://via.placeholder.com/500x300?text=Image+2",
    "https://via.placeholder.com/500x300?text=Image+3"
];

let currentIndex = 0;
const carouselImage = document.getElementById("carouselImage");

document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    carouselImage.src = images[currentIndex];
});

document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    carouselImage.src = images[currentIndex];
});

document.getElementById("getJoke").addEventListener("click", async () => {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const data = await res.json();
    document.getElementById("jokeText").textContent = data.joke;
});
