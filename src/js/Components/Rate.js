import createDomNode from '../createDomNode';

export class Rate {
  constructor(obj, mode) {
    this.mode = mode;
    this.obj = obj;
    this.rate = '';
  }

  generateLayout() {
    let layout = createDomNode(layout, 'div', 'rate');
    if (this.mode !== 'play_mode') layout.classList.add('hidden');
    return layout;
  }

  generateRateRank() {
    let rank = createDomNode(rank, 'form', 'rate__rank');
    rank.setAttribute('id', 'playmode');
    return rank;
  }

  generateRateScore(obj) {
    let score = createDomNode(score, 'div', 'rate__score');
    const cardsCount = obj.cards.length;
    score.append(this.generateRatePoint('success'));
    score.append(this.generateRatePoint('error'));
    score.append(this.generateRatePoint('total', cardsCount));
    return score;
  }

  generateRatePoint(pointRole, value = 0) {
    let point = createDomNode(point, 'div', 'rate__point');
    point.innerHTML = `<label class="rate__label rate-status_${pointRole}" for="playmode-${pointRole}"></label>
                      <input class="rate__indicator" type="text" name="${pointRole}" id="playmode-${pointRole}" disabled value="${value}">`;
    return point;
  }

  generateButtonWrapper() {
    let wrapper = createDomNode(wrapper, 'div', 'playmode-button__wrapper');
    return wrapper;
  }

  generatePlayButton() {
    let button = createDomNode(button, 'button', 'playmode-button');
    button.innerHTML = `<span class="playmode-button__play"></span>
                        <span class="playmode-button__repeat hidden"></span>`
    return button;
  }

  buildButton() {
    let button = this.generateButtonWrapper();
    button.append(this.generatePlayButton());
    return button;
  }

  buildRate() {
    let rate = this.generateLayout();
    let rank = this.generateRateRank();
    rank.append(this.generateRateScore(this.obj));
    rank.append(this.buildButton());
    rate.append(rank);
    this.rate = rate;
  }

  createInstance() {
    this.buildRate();
    return this.rate;
  }
}
