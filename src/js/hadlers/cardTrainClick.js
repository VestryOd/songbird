import speak from "../voiceSpeak";
import { Stats } from "../Components/Stats";
import data from "../../../cards-data";

let stats = new Stats(data);
stats.createInstance();

export default function cardTrainClick(e) {
  if (e.target.classList.contains('card__rotate-icon')) {
    rotateCard(e.target)
  } else {
    sayText(e.target)
  }

  function rotateCard(target) {
    let side = target.closest('.card__inner');
    side.classList.toggle('translate');
    side.onmouseleave = () => {
      side.classList.remove('translate');
      side.onmouseleave = null;
    }
  }

  function sayText(target) {
    let word = target.closest('.card').dataset.action;
    speak(word);
    sendStats(word, 'click')
  }

  function sendStats(word, type) {
    let category = localStorage.getItem('englishCategory');
    stats.updateStats(category, word, type);
  }
}
