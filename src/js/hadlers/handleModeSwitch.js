import cardTrainClick from "./cardTrainClick";
import cardPlayClick from "./cardPlayClick";

export default function handleModeSwitch() {
  let oldMode = null;
  let newHandler = null;
  let previousHandler = null;

  checkMode();
  if (document.querySelector('.cards-category__layout') !== null) {
    changeContentView();
    changeHandlers();
  }


  function checkMode() {
    oldMode = localStorage.englishMode;
    let newValue = null;

    if (oldMode === 'train_mode') {
      newValue = 'play_mode'
    } else {
      localStorage.isPlaying = JSON.stringify(false);
      clearCards();
      clearIndicators();
      changeIcons();
      newValue = 'train_mode';
    }
    localStorage.setItem('englishMode', newValue);
  }

  function changeContentView() {
    let rate = document.querySelector('.rate');
    if (rate) {
      rate.classList.toggle('invisible');
      rate.classList.toggle('hidden');
    }


    let cards = document.querySelectorAll('.card');
    cards.forEach(el => {
      el.classList.toggle('play_mode');
      el.classList.toggle('train_mode');
    });
  }

  function clearCards() {
    let cards = document.querySelectorAll('.card__guessed');
    cards.forEach(el => {
      if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
      }
    })
  }

  function clearIndicators() {
    let cards = document.querySelectorAll('.card');
    document.querySelector('#playmode-success').value = 0;
    document.querySelector('#playmode-error').value = 0;
    document.querySelector('#playmode-total').value = cards.length;
  }

  function changeIcons() {
    document.querySelector('.playmode-button__play').classList.toggle('invisible');
    document.querySelector('.playmode-button__repeat').classList.toggle('invisible');
  }

  function changeHandlers() {
    if (oldMode === 'train_mode') {
      newHandler = cardPlayClick;
      previousHandler = cardTrainClick
    } else {
      newHandler = cardTrainClick;
      previousHandler = cardPlayClick;
    }
    let container = document.querySelector('.cards-category__layout');
    container.removeEventListener('click', previousHandler);
    container.addEventListener('click', newHandler);
  }
}
