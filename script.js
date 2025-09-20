// 🎶 Music tracks hosted in repo audio folder
const MUSIC = [
  "audio/music_folk.mp3",
  "audio/music_lullaby.mp3",
  "audio/music_dance.mp3",
  "audio/music_playful.mp3"
];

// 📌 YouTube Playlist
const PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLzWh30TTppb3qCxF-xvgDCiRN2QujgQtC";

// Randomize sparkles positions
function animateSparkles() {
  const sparkles = document.querySelectorAll(".sparkle");
  sparkles.forEach(sp => {
    sp.style.left = Math.random() * 80 + "%";
    sp.style.animationDuration = (2 + Math.random() * 2) + "s";
  });
}

function startMagic() {
  const kidName = document.getElementById("kidName").value.trim();
  if (!kidName) {
    alert("Please enter your kid’s name!");
    return;
  }

  // Show Magic Book
  document.getElementById("bookContainer").classList.remove("hidden");

  // Show Magic Card & kid name after 3s
  setTimeout(() => {
    document.getElementById("cardContainer").classList.remove("hidden");
    document.getElementById("kidNameText").innerText = `✨ Hello ${kidName}! ✨`;

    // Show sparkles
    const sparklesContainer = document.getElementById("sparklesContainer");
    sparklesContainer.classList.remove("hidden");
    animateSparkles();

    // Show audio wave animation
    document.getElementById("audioWaveContainer").classList.remove("hidden");
  }, 3000);

  // Play ONE random track from the 4 audios
  const randomIndex = Math.floor(Math.random() * MUSIC.length);
  const audio = new Audio(MUSIC[randomIndex]);
  audio.play();

  // Set YouTube playlist link
  document.getElementById("playlistLink").href = PLAYLIST_URL;
}

