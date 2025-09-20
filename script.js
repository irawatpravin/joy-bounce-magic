/* -------------------------
  CONFIG - replace these
---------------------------*/
const PLAYLIST_ID = "YOUR_PLAYLIST_ID";   // <-- REPLACE with your playlist ID (PLxxxx)
const NUM_VIDEOS = 12;                    // <-- REPLACE with how many videos in that playlist
// Note: if you change NUM_VIDEOS, the random index generation below will use that number.
/* -------------------------
  End of config
---------------------------*/

document.getElementById("startBtn").addEventListener("click", startMagic);
document.getElementById("downloadCardBtn").addEventListener("click", downloadCard);

// STORYLINES (4 flavors) - these will be used as text + TTS during the book animation
const STORYLINES = [
  [ // playful / upbeat
    name => `This story is for ${name}!`,
    name => `Welcome, ${name}, to our joyful page!`,
    name => `Songs, giggles and bright surprises just for you, ${name}!`,
    name => `A special book for ${name} — made with love by Joy Bounce TV.`
  ],
  [ // lullaby / dreamy
    name => `Shh... this page is for ${name}.`,
    name => `${name}, the stars whisper bedtime songs.`,
    name => `Soft dreams and gentle hugs are coming your way, ${name}.`,
    name => `Sweet dreams, ${name}. From Joy Bounce TV with love.`
  ],
  [ // dance / party
    name => `Party time for ${name}!`,
    name => `Jump, clap and spin — the fun is all yours, ${name}!`,
    name => `Dance like the star you are, ${name}!`,
    name => `Thanks for the dance, ${name}! Share the joy with your family.`
  ],
  [ // adventure
    name => `Brave ${name}, your adventure begins!`,
    name => `Through forests and clouds we travel — come join, ${name}!`,
    name => `You are the hero of this little tale, ${name}.`,
    name => `The quest ends here with a magic card for ${name}.`
  ]
];

function startMagic(){
  const nameEl = document.getElementById("kidName");
  const name = nameEl.value.trim();
  if(!name){ alert("Please enter your child's name."); nameEl.focus(); return; }

  // UI: hide input, show book
  document.getElementById("inputSection").classList.add("hidden");
  const bookSection = document.getElementById("bookSection");
  bookSection.classList.remove("hidden");

  // pick a random storyline flavor
  const flavorIndex = Math.floor(Math.random() * STORYLINES.length);
  const linesF = STORYLINES[flavorIndex];

  // show the video (single book.mp4 used). If you have different videos per flavor,
  // you can set bookVideo.src = `videos/book_${flavorIndex}.mp4`
  const bookVideo = document.getElementById("bookVideo");
  bookVideo.currentTime = 0;
  bookVideo.muted = false; // you can mute if the animation contains audio, else leave unmuted
  bookVideo.play().catch(()=>{ /* autoplay may be blocked on some browsers */ });

  // We'll time 4 text lines to show during the animation.
  const bookText = document.getElementById("bookText");

  // function to show + speak a line
  function showLine(fn){
    const text = fn(name);
    bookText.innerText = text;
    speak(text);
  }

  // sequence timings (ms) - tweak if your video length differs
  // 0s: show first line
  showLine(linesF[0]);

  // 4s show second
  setTimeout(()=> showLine(linesF[1]), 4000);

  // 9s show third
  setTimeout(()=> showLine(linesF[2]), 9000);

  // 14s closing line
  setTimeout(()=> showLine(linesF[3]), 14000);

  // after ~18s (book finished) -> reveal magic card and player
  setTimeout(()=> {
    showMagicCard(name);
    showYouTubePlayer(); // automatically show embedded playlist (random start)
  }, 18000);
}

// Simple TTS helper
function speak(text){
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1.0;
    // Optionally prefer a childlike voice by trying to pick a higher-pitched voice:
    const voices = speechSynthesis.getVoices();
    if(voices && voices.length){
      // try to pick a voice that mentions "child" or "young", fallback to first voice
      let v = voices.find(v => /child|young|kids|female|female 1/i.test(v.name)) || voices[0];
      if(v) u.voice = v;
    }
    speechSynthesis.speak(u);
  } catch (e) {
    console.warn("TTS failed:", e);
  }
}

/* -------- Magic Card rendering -------- */
function showMagicCard(name){
  document.getElementById("magicCard").classList.remove("hidden");
  const canvas = document.getElementById("cardCanvas");
  const ctx = canvas.getContext("2d");
  // clear
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // If you have a designed card image, draw it first:
  const bg = new Image();
  bg.src = "images/card.png"; // OPTIONAL: if exists, will draw under text; if not, fallback to simple design
  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    drawCardText(ctx, name);
  };
  bg.onerror = () => {
    // simple fallback card
    ctx.fillStyle = "#fffbe6";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 8;
    ctx.strokeRect(8,8,canvas.width-16,canvas.height-16);
    drawCardText(ctx, name);
  };

  function drawCardText(ctx, name){
    ctx.fillStyle = "#2d3436";
    ctx.font = "28px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText("✨ Special Magic Card ✨", canvas.width/2, 80);

    ctx.font = "26px Comic Sans MS";
    ctx.fillText(`For: ${name}`, canvas.width/2, 150);

    ctx.font = "18px Comic Sans MS";
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, canvas.width/2, 190);
    ctx.fillText("From: Joy Bounce TV", canvas.width/2, 220);
  }
}

function downloadCard(){
  const canvas = document.getElementById("cardCanvas");
  const link = document.createElement("a");
  link.download = `joy-bounce-card.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/* ------- show embedded YouTube playlist player with random start ------- */
function showYouTubePlayer(){
  document.getElementById("playerSection").classList.remove("hidden");
  const player = document.getElementById("ytPlayer");
  // pick a random index (0-based) — set NUM_VIDEOS to your playlist video count
  const idx = Math.floor(Math.random() * Math.max(1, Number(NUM_VIDEOS)));
  // Use embed videoseries URL — this will autoplay the playlist starting at 'idx'
  player.src = `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(PLAYLIST_ID)}&index=${idx}&autoplay=1`;
}
