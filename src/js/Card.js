export class Card {
  constructor(mode, card) {
    this.cardData = card;
    this.mode = mode;
    this.card = '';
  }

  generateCard(word) {
    let card = createDomNode(this.card, 'div', 'card');
    card.setAttribute('data-action', word);
    return card;
  }

  generateCardInner(mode) {
    let inner = createDomNode(inner, 'div', 'card__inner', mode);
    return inner;
  }

  generateFront(word, image) {
    let front = createDomNode(front, 'div', 'card__front');
    front.setAttribute('style', `background-image: url(${image});`);
    front.innerHTML = `<span class="card__icon card__sound-icon"></span>
                      <span class="card__icon card__rotate-icon"></span>
                      <div class="card__title">${word}</div>`;
    return front;
  }

  generateBack(image, translation) {
    let back = createDomNode(front, 'div', 'card__back');
    back.setAttribute('style', `background-image: url(${image});`);
    back.innerHTML = `<span class="card__icon card__rotate-icon"></span>
                      <div class="card__title">${translation}</div>`;
    return back;
  }

  createDomNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node
  };

  buildCard() {
    const { data } = this.cardData;
    let card = this.generateCard(data.word);
    let inner = generateCardInner(this.mode);
    inner.append(this.generateFront(data.word, data.image));
    inner.append(this.generateBack(data.image, data.translation));
    card.appaned(inner);
    this.card = card;
  }

  mountCard(parentElement) {
    parentElement.apped(this.card);
  }

  unmountCard(parentElement) {
    parentElement.remove(this.card);
  }
}
