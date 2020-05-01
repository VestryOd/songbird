import { Game } from "../Components/Game";
import { SpeechVoice } from "../Components/SpeechVoice";

let game = null;

let voice = new SpeechVoice();
window.onbeforeunload = function () {
  voice.synth.cancel();
};

export default function cardTrainClick(e) {
  if (checkClass(e, 'playmode-button__play') || checkClass(e, 'playmode-button__repeat')) {
    let isPlaying = JSON.parse(localStorage.isPlaying);
    if (!isPlaying) {

      game = new Game(voice);
      game.createInstance();
      localStorage.isPlaying = JSON.stringify(true);
      return;
    } else {
      game.repeatWord();
      return;
    }
  }

  if (checkClass(e, 'card__front') || checkClass(e, 'card')) {
    game.handleGuess(e.target.closest('.card'));
  }

  function checkClass(e, className) {
    return e.target.classList.contains(className);
  }
}
