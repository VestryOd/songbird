export default function audioPlayer(pathToFile) {
  let audio = new Audio(pathToFile);
  // audio.style.display = "none";
  audio.autoplay = true;
  audio.onended = function () {
    audio.remove()
  };
  // audio.play();
}
