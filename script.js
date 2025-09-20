// Audio files (short 20–25 sec music)
const MUSIC = [
  "audio/music_folk.mp3",
  "audio/music_lullaby.mp3",
  "audio/music_dance.mp3",
  "audio/music_playful.mp3"
];

// YouTube playlist
const YOUTUBE_PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLzWh30TTppb3qCxF-xvgDCiRN2QujgQtC";

function startMagic() {
  const name = document.getElementById("kidName").value.trim();
  if(!name) { alert("Please enter a name!"); return; }

  // Show animation section
  const animSection = document.getElementById("animationSection");
  animSection.classList.remove("hidden");

  // Display kid's name
  const nameText = document.getElementById("kidNameText");
  nameText.innerText = `✨ ${name} ✨`;

  // Add sparkles
  const sparklesDiv = document.getElementById("sparkles");
  for(let i=0;i<15;i++){
    const s = document.createElement("div");
    s.classList.add("sparkle");
    s.style.backgroundImage = `url('images/sparkle${(i%3)+1}.png')`;
    s.style.top = Math.random()*250 + "px";
    s.style.left = Math.random()*250 + "px";
    sparklesDiv.appendChild(s);
  }

  // Play random music
  const music = new Audio(MUSIC[Math.floor(Math.random()*MUSIC.length)]);
  music.play();

  // Redirect after 22 seconds
  setTimeout(() => {
    window.location.href = YOUTUBE_PLAYLIST_URL;
  }, 22000);
}
