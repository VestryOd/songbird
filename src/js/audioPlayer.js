export default function audioPlayer(pathToFile) {
  let audio = new Audio(pathToFile);
  audio.autoplay = true;
  audio.onended = function () {
    audio.remove()
  };
}
