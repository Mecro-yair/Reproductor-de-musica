const audio = document.getElementById("audioPlayer");
const loopCheckbox = document.getElementById("loopCheckbox");
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.load();
  }
});

loopCheckbox.addEventListener("change", function () {
  audio.loop = this.checked;
});

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}
