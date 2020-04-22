import { GameResults } from "../Components/GameResults";
import randomize from "../randomizeCardsOrder";
import player from "../audioPlayer";
import speak from "../voiceSpeak";

let words, order, currenIndex, isPlaying, isSpeaking;

export default function cardTrainClick(e) {

  if (e.target.classList.contains('playmode-button__play') || e.target.classList.contains('playmode-button__repeat')) {


    if (isPlaying) {
      clearCards()
    } else {
      changeIcons();
    }
    isPlaying = true;
    initValues();
    newGameStep();
  } else if (e.target.classList.contains('card__front') || e.target.classList.contains('card')) {
    if (isSpeaking) return;
    handleGuess(e.target.closest('.card'))
  }

  console.log(e.target);




  function newGameStep() {
    console.log(`words=${words}, order=${order}`);
    let currentWord = sayWord(words[order[currenIndex]]);
    localStorage.setItem('englishWord', currentWord);
  }

  function prepareCards() {
    let cards = Array.from(document.querySelectorAll('.card'));
    let words = cards.map(el => el.dataset.action);
    return words;
  }

  function sayWord(word) {
    speak(word);
    isSpeaking = true;
    setTimeout(() => {
      isSpeaking = false;
    }, 300);
    console.log(word);
    return word;
  }

  function endOfGame() {
    let ok = document.querySelector('#playmode-success').value;
    let wrong = document.querySelector('#playmode-error').value;
    changeIcons();
    if (+document.querySelector('#playmode-error').value === 0) {
      player('assets/audio/win.mp3');
      showrResults('success', ok, wrong)
    } else {
      player('assets/audio/lose.mp3');
      showrResults('errors', ok, wrong)
    }
    isPlaying = false;
  }

  function showrResults(type, success, errors) {
    let results = new GameResults().createInstance()
    document.body.append(results);
    setTimeout(() => {
      results.remove();
    }, 1000);
  }

  function guessedRight(target) {
    if (currenIndex < words.length - 1) {
      player('assets/audio/success.mp3');
      currenIndex++;
      resolveTotal()
      resolveOk()
      markRightAnswer(target);
    } else {
      endOfGame();
    }
    setTimeout(() => {
      newGameStep();
    }, 500);
  }

  function resolveOk() {
    let elem = document.querySelector('#playmode-success');
    let previousSuccess = +elem.value;
    elem.value = previousSuccess + 1;
  }

  function resolveWrong() {
    let elem = document.querySelector('#playmode-error');
    let previousValue = +elem.value;
    elem.value = previousValue + 1;
  }

  function resolveTotal() {
    let elem = document.querySelector('#playmode-total');
    let previousTotal = +elem.value;
    elem.value = previousTotal - 1;
  }

  function notGuessed(errorElement) {
    player('assets/audio/error.mp3');
    resolveWrong();
  }

  function handleGuess(target) {
    let targetWord = target.dataset.action;
    console.log(targetWord, localStorage.englishWord);
    if (localStorage.englishWord === targetWord) {
      console.log('right');
      guessedRight(target);
    } else {
      console.log('wrong');
      notGuessed();
    }
  }

  function changeIcons() {
    document.querySelector('.playmode-button__play').classList.toggle('invisible');
    document.querySelector('.playmode-button__repeat').classList.toggle('invisible');
  }

  function markRightAnswer(target) {
    let child = target.querySelector('.card__guessed');
    child.classList.remove('hidden');
  }

  function initValues() {
    words = prepareCards();
    order = randomize(words);
    currenIndex = 0;
    isSpeaking = false;
  }

  function clearCards() {
    document.querySelectorAll('.card__guessed').forEach(el => {
      if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
      }
    })
  }
}
