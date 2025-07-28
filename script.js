const audio = document.getElementById("audioPlayer");
const fileInput = document.getElementById("fileInput");
const loopCheckbox = document.getElementById("loopCheckbox");
const playlistUI = document.getElementById("playlist");
const currentSongLabel = document.getElementById("currentSong");

let playlist = [];
let currentIndex = 0;

// Cargar canciones guardadas (si hay)
if (localStorage.getItem("playlist")) {
  playlist = JSON.parse(localStorage.getItem("playlist"));
  updatePlaylistUI();
}

fileInput.addEventListener("change", function () {
  for (let file of this.files) {
    const url = URL.createObjectURL(file);
    playlist.push({ name: file.name, url });
  }
  savePlaylist();
  updatePlaylistUI();
});

loopCheckbox.addEventListener("change", () => {
  audio.loop = loopCheckbox.checked;
});

function updatePlaylistUI() {
  playlistUI.innerHTML = "";
  playlist.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.onclick = () => {
      currentIndex = index;
      loadAndPlay(track);
    };
    playlistUI.appendChild(li);
  });
}

function loadAndPlay(track) {
  audio.src = track.url;
  audio.play();
  currentSongLabel.textContent = "🎧 Reproduciendo: " + track.name;
}

function playAudio() {
  if (!audio.src && playlist.length > 0) {
    loadAndPlay(playlist[currentIndex]);
  } else {
    audio.play();
  }
}

function pauseAudio() {
  audio.pause();
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}

function nextSong() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex + 1) % playlist.length;
  loadAndPlay(playlist[currentIndex]);
}

function prevSong() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadAndPlay(playlist[currentIndex]);
}

function clearPlaylist() {
  playlist = [];
  currentIndex = 0;
  audio.src = "";
  currentSongLabel.textContent = "No hay canción seleccionada";
  updatePlaylistUI();
  localStorage.removeItem("playlist");
}

function savePlaylist() {
  localStorage.setItem("playlist", JSON.stringify(playlist));
}
