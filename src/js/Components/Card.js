import createDomNode from '../createDomNode';

export class Card {
  constructor(card, mode, imgPath, category) {
    this.category = category;
    this.imgPath = imgPath;
    this.cardData = card;
    this.mode = mode;
    this.card = '';
  }

  makeCleanWord(word) {
    return word.match(/_/g) ? word.split('_').join(' ') : word;
  }

  generateCard(word, mode) {
    let cleanWord = this.makeCleanWord(word);
    let card = createDomNode(this.card, 'div', 'card');
    card.classList.add(mode);
    card.setAttribute('data-action', cleanWord);
    return card;
  }

  generateCardInner() {
    let inner = createDomNode(inner, 'div', 'card__inner');
    return inner;
  }

  generateFront(category, word, imgPath) {
    let cleanWord = this.makeCleanWord(word);
    let front = createDomNode(front, 'div', 'card__front');
    front.setAttribute('style', `background-image: url(${imgPath}${category}/${word}.png);`);
    front.innerHTML = `<span class="card__icon card__sound-icon sound-icon_hidden"></span>
                      <span class="card__icon card__rotate-icon"></span>
                      <div class="card__title">${cleanWord}</div>`;
    return front;
  }

  generateBack(category, word, translation, imgPath) {
    let back = createDomNode(back, 'div', 'card__back');
    back.setAttribute('style', `background-image: url(${imgPath}${category}/${word}.png);`);
    back.innerHTML = `<span class="card__icon card__rotate-icon"></span>
                      <div class="card__title">${translation}</div>`;
    return back;
  }

  generateGuessed() {
    let guessed = createDomNode(guessed, 'div', 'card__guessed', 'hidden');
    let icon = createDomNode(guessed, 'span', 'guessed__icon');
    guessed.append(icon);
    return guessed;
  }

  buildCard() {
    const data = this.cardData;
    let card = this.generateCard(data.word, this.mode);
    let inner = this.generateCardInner();
    let guessed = this.generateGuessed();
    inner.append(this.generateFront(this.category, data.word, this.imgPath));
    inner.append(this.generateBack(this.category, data.word, data.translation, this.imgPath));
    inner.append(guessed);
    card.append(inner);
    this.card = card;
  }

  createInstance() {
    this.buildCard();
    return this.card;
  }
}
