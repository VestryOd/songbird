import speak from "../voiceSpeak";

export default function cardTrainClick(e) {
  console.log(e.target);
  if (e.target.classList.contains('card__rotate-icon')) {
    rotateCard(e.target)
  } else {
    sayText(e.target)
  }

  function rotateCard(target) {
    let side = target.closest('.card__inner');
    console.log(side);
    side.classList.toggle('translate');
    side.onmouseleave = () => {
      side.classList.remove('translate');
      side.onmouseleave = null;
    }
  }

  function sayText(target) {
    let word = target.closest('.card').dataset.action;
    speak(word);
  }
}
