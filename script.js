// =============== CONFIGURATION ===================

// Google Drive direct links for magic book videos
const VIDEOS = [
  "https://drive.google.com/uc?export=download&id=1Bf0h2-Px1abcd12345", // replace with actual file IDs
  "https://drive.google.com/uc?export=download&id=1Bf0h2-Px1abcd67890",
  "https://drive.google.com/uc?export=download&id=1Bf0h2-Px1abcd11223"
];

// Google Drive direct link for magic card image
const CARD_IMAGE = "https://drive.google.com/uc?export=download&id=1Bf0h2-Px1abcd44455";

// YouTube playlist
const PLAYLIST_ID = "PLzWh30TTppb3qCxF-xvgDCiRN2QujgQtC";

// Number of videos in your playlist
const NUM_VIDEOS = 9; // Replace with actual number of videos in playlist

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

  // After 18 seconds, redirect to random YouTube playlist video
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * NUM_VIDEOS);
    const youtubeUrl = `https://www.youtube.com/watch?v=&list=${PLAYLIST_ID}&index=${randomIndex}&autoplay=1`;
    window.location.href = youtubeUrl;
  }, 18000);
}
