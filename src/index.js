import data from '../cards-data';
import speak from './js/voiceSpeak';

window.onload = function () {
  const CONTENT_CONTAINER = document.querySelector('#content-container');
  const SWITCHER = document.querySelector('#toggleMode');
  let cardsSwitchMode = document.querySelectorAll('.card__inner');
  console.log('Hello, my checker)');

  CONTENT_CONTAINER.addEventListener('click', (e)=> {

    if (e.target.classList.contains('card__rotate-icon')) {
      rotateCard(e.target)
    } else {
      sayText(e.target)
    }
  })
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
  console.log(word);
  speak(word);
}

function randomizeCardsOrder(arr) {
  let indexArray = [];
  for (let i = 0; i < arr.length; i++) {
    indexArray.push(i);
  }
  let j, temp;
  for (let i = indexArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = indexArray[j];
    indexArray[j] = indexArray[i];
    indexArray[i] = temp;
  }
  return indexArray;
}
