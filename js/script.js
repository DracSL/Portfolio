const audioPlayer = document.getElementById('player_audio');
const progressBar = document.getElementById('progress-bar');
const trackTitle = document.getElementById("track-title");
let currentTrackIndex = 0; 

var bgm = document.getElementById("player_audio");
function bgmPlay() {
  bgm.play();
  $(".play").addClass("active");
  $(".cog-img").addClass("rotating");
  $(".stop").removeClass("active");
}
function bgmStop() {
  bgm.pause();
  bgm.currentTime = 0;
  $(".play").removeClass("active");
  $(".stop").addClass("active");
  $(".cog-img").removeClass("rotating");
  audioPlayer.pause();
    audioPlayer.currentTime = 0;
    progressBar.value = 0;
}

function updateProgressBar() {
  audioPlayer.addEventListener('timeupdate', () => {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.value = progress;
  });
}


progressBar.addEventListener('input', () => {
  const newTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
});

const tracks = [
  { src: "music/IntoTheWood.mp3", title: "Into The Wood" },
  { src: "music/Rainy_Autumn.mp3", title: "Rainy Autumn" },
  { src: "music/Solus_in_subterra.mp3", title: "Solus in Subterra" },
  { src: "music/capra.mp3", title: "Capra" },
  { src: "music/Where_the_butterflies_are.mp3", title: "Where the Butterflies Are" },
  { src: "music/Deep_Dive.mp3", title: "Deep Dive" },
  { src: "music/Humanity.mp3", title: "Humanity" }
];




// Function to load the current track
function loadTrack(index) {
  const track = tracks[index];
  audioPlayer.src = track.src;
  trackTitle.textContent = track.title;
  audioPlayer.load(); // Reload the audio element with the new source
}

// Function to play or pause the audio
function togglePlayPause() {
  if (audioPlayer.paused) {
      audioPlayer.play();
  } else {
      audioPlayer.pause();
  }
}

// Next track function
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Loop back to the start
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  $(".play").addClass("active");
  $(".cog-img").addClass("rotating");
  $(".stop").removeClass("active");
  progressBar.value = 0;
  updateProgressBar()
}

// Previous track function
function previousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Loop to the end if at start
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  $(".play").addClass("active");
  $(".cog-img").addClass("rotating");
  $(".stop").removeClass("active");
  progressBar.value = 0;
  updateProgressBar()
}

// Initialize with the first track
loadTrack(currentTrackIndex);