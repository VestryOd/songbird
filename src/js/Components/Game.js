import { GameResults } from "./GameResults";
import randomize from "../randomizeCardsOrder";
import player from "../audioPlayer";
import speak from "../voiceSpeak";
import handleRouts from "../hadlers/handleRouts";

export class Game {
  constructor() {
    this.words = '';
    this.order = '';
    this.currenIndex = 0;
    this.elemSuccess = '';
    this.elemError = '';
    this.elemTotal = '';
    this.elemPlayButton = '';
    this.elemRepeatButton = '';
    this.elemsGuessedCards = [];
    this.isSpeaking = false;
    this.currentWord = '';
  }

  createInstance() {
    this.words = this.prepareCards();
    this.order = this.initOrder();
    this.initElements();
    this.changeIcons();
    this.newGameStep();
  }

  initOrder() {
    return randomize(this.words);
  }

  initElements() {
    this.elemSuccess = document.querySelector('#playmode-success');
    this.elemError = document.querySelector('#playmode-error');
    this.elemTotal = document.querySelector('#playmode-total');
    this.elemPlayButton = document.querySelector('.playmode-button__play');
    this.elemRepeatButton = document.querySelector('.playmode-button__repeat');
  }

  prepareCards() {
    let cards = Array.from(document.querySelectorAll('.card'));
    return cards.map(el => el.dataset.action);
  }

  sayWord(word) {
    console.log(`word is: ${word}`);
    this.isSpeaking = true;
    setTimeout(() => {
      speak(word);
    }, 300);
    setTimeout(() => {
      this.isSpeaking = false;
    }, 300);
    return word;
  }

  repeatWord() {
    this.sayWord(this.currentWord);
  }

  newGameStep() {
    let wordOrder = this.order[this.currenIndex];
    this.currentWord = this.sayWord(this.words[wordOrder]);
    // localStorage.setItem('englishWord', this.currentWord);
  }

  markRightAnswer(target) {
    let guessedCard = target.querySelector('.card__guessed');
    this.elemsGuessedCards.push(guessedCard);
    guessedCard.classList.remove('hidden');
  }

  handleGuess(target) {
    let targetWord = target.dataset.action;
    if (this.currentWord === targetWord) {
      this.rightGuess(target);
    } else {
      this.wrongGuess();
    }
  }

  rightGuess(target) {
    this.markRightAnswer(target);
    if (this.currenIndex < this.words.length - 1) {
      player('assets/audio/success.mp3');
      this.currenIndex++;
      this.changeValue('total');
      this.changeValue('success');
    } else {
      this.endOfGame();
      return;
    }
    setTimeout(() => {
      this.newGameStep();
    }, 500);
  }

  wrongGuess() {
    this.changeValue('error');
    player('assets/audio/error.mp3');
  }

  endOfGame() {
    let right = this.elemSuccess.value;
    let wrong = this.elemError.value;
    this.changeIcons();
    if (+wrong === 0) {
      player('assets/audio/win.mp3');
      this.showrResults('success', right, wrong);
    } else {
      player('assets/audio/lose.mp3');
      this.showrResults('errors', right, wrong);
    }
    this.isPlaying = false;
  }

  showrResults(type, success, errors) {
    let results = new GameResults(type, success, errors);
    let resultsLayout = results.createInstance();
    document.body.append(resultsLayout);
    setTimeout(() => {
      results.showInstance();
    }, 0);
    document.querySelector('#toggleMode').checked = false;
    localStorage.isPlaying = JSON.stringify(false);
    localStorage.setItem('englishMode', 'train_mode');
    handleRouts('category');
    setTimeout(() => {
      results.hideInstance();
    }, 2000);
  }

  changeValue(type) {
    let elemName = `elem${type.charAt(0).toUpperCase() + type.slice(1)}`;
    console.log(elemName);
    let previoysValue = +this[elemName].value;
    this[elemName].value = type === 'total' ? previoysValue - 1 : previoysValue + 1;
  }

  changeIcons() {
    this.elemPlayButton.classList.toggle('invisible');
    this.elemRepeatButton.classList.toggle('invisible');
  }

  clearCards() {
    this.elemsGuessedCards.forEach(el => {
      if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
      }
    })
  }
}
