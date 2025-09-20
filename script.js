// =============== CONFIGURATION ===================

// Google Drive direct links for magic book videos
const VIDEOS = [
  "https://drive.google.com/uc?export=download&id=1vspBFMoKLNbUDQFxD-UdD2yOWIYrQF9e",
  "https://drive.google.com/uc?export=download&id=10g7QbNLkYLInxdqc6SQ43fI8Jjkw7Io8",
  "https://drive.google.com/uc?export=download&id=1GMkxkWbLMbuX0GHETQl_YVjBOHO9CTh_"
];

// Google Drive direct link for magic card image
const CARD_IMAGE = "https://drive.google.com/uc?export=download&id=1oxMuNmblI3gz0awKFEUo5DRgBWAdF7_X";

// YouTube playlist link (redirect to playlist start)
const YOUTUBE_PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLzWh30TTppb3qCxF-xvgDCiRN2QujgQtC";

// =================================================

function startMagic() {
  const name = document.getElementById("kidName").value.trim();
  if (!name) { 
    alert("Please enter a name!"); 
    return; 
  }

  // Show mascot section and pick random video
  const mascotSection = document.getElementById("mascotSection");
  mascotSection.classList.remove("hidden");
  const mascotText = document.getElementById("mascotText");
  mascotText.innerText = `Hello ${name}! Enjoy the magic book ✨`;

  const mascotVideo = document.getElementById("mascotVideo");
  const randomVideo = VIDEOS[Math.floor(Math.random() * VIDEOS.length)];
  mascotVideo.src = randomVideo;
  mascotVideo.play();

  // After 15 seconds, show magic card
  setTimeout(() => {
    document.getElementById("magicCard").classList.remove("hidden");
    document.getElementById("cardImg").src = CARD_IMAGE;
  }, 15000);

  // After 18 seconds, redirect to YouTube playlist
  setTimeout(() => {
    window.location.href = YOUTUBE_PLAYLIST_URL;
  }, 18000);
}
