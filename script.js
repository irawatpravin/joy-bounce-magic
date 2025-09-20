// 🎥 Random videos from Google Drive (direct download links)
const VIDEOS = [
  "https://drive.google.com/uc?export=download&id=1vspBFMoKLNbUDQFxD-UdD2yOWIYrQF9e",
  "https://drive.google.com/uc?export=download&id=10g7QbNLkYLInxdqc6SQ43fI8Jjkw7Io8",
  "https://drive.google.com/uc?export=download&id=1GMkxkWbLMbuX0GHETQl_YVjBOHO9CTh_"
];

// 🎶 Music tracks in audio folder
const MUSIC = [
  "audio/music_folk.mp3",
  "audio/music_lullaby.mp3",
  "audio/music_dance.mp3",
  "audio/music_playful.mp3"
];

// 📌 YouTube Playlist
const PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLzWh30TTppb3qCxF-xvgDCiRN2QujgQtC";

// Sparkle positions randomization
function animateSparkles() {
  const sparkles = document.querySelectorAll(".sparkle");
  sparkles.forEach(sp => {
    sp.style.left = Math.random() * 80 + "%";
    sp.style.animationDuration = (2 + Math.random() * 2) + "s";
  });
}

function startMagic() {
  const kidName = document.getElementById("kidName").value;
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
  }, 3000);

  // Play random background music
  const randomMusic = MUSIC[Math.floor(Math.random() * MUSIC.length)];
  const audio = new Audio(randomMusic);
  audio.play();

  // After 5s → show random video
  setTimeout(() => {
    document.getElementById("videoContainer").classList.remove("hidden");
    const mascotVideo = document.getElementById("mascotVideo");
    mascotVideo.src = VIDEOS[Math.floor(Math.random() * VIDEOS.length)];
    mascotVideo.play();
  }, 5000);

  // Set YouTube playlist link
  document.getElementById("playlistLink").href = PLAYLIST_URL;
}
