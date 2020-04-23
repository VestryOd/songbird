import { Game } from "../Components/Game";

let isSpeaking = false;
let game = null;

export default function cardTrainClick(e) {
  if (checkClass(e, 'playmode-button__play') || checkClass(e, 'playmode-button__repeat')) {
    let isPlaying = JSON.parse(localStorage.isPlaying);
    if (!isPlaying) {

      game = new Game;
      game.createInstance();
      localStorage.isPlaying = JSON.stringify(true);
      return;
    } else {
      game.repeatWord();
      return;
    }
  }

  if (checkClass(e, 'card__front') || checkClass(e, 'card')) {
    if (isSpeaking) return;

    game.handleGuess(e.target.closest('.card'));
  }

  function checkClass(e, className) {
    return e.target.classList.contains(className);
  }
}
