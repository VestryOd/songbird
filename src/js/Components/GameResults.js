import createDomNode from "../createDomNode";

export class GameResults {
  constructor(type, successScore, errorScore) {
    this.type = type;
    this.successScore = successScore;
    this.errorScore = errorScore;
    this.layout = '';
  }

  generateOverlay() {
    let classes = ['results'];
    let overlay = createDomNode(overlay, 'div', ...classes);
    return overlay;
  }

  generateWrapper() {
    let classes = ['info__wrapper'];
    let infoWrapper = createDomNode(infoWrapper, 'div', ...classes);
    return infoWrapper;
  }

  generatetitle() {
    let classes = ['info__wrapper'];
    let title = createDomNode(title, 'div', ...classes);
    let text = this.type === 'success' ? 'Congratulations, you won' : 'You had errors, try again';
    title.innerHTML = text;
    return title;
  }

  generateDescription() {
    let classes = ['info__description'];
    let description = createDomNode(description, 'div', ...classes);
    description.innerHTML = `<span>You guessed 15 pictures, and made 0 errors</span>`;
    return description;
  }
  generateImage() {
    let classes = ['info__description'];
    let image = createDomNode(image, 'div', ...classes);
    image.style = `background-image: url(/assets/img/playmode/${this.type === 'success' ? 'win' : 'fail'}.png);`;
    return image;
  }

  buildLayout() {
    let overlay = this.generateOverlay();
    let wrapper = this.generateWrapper();
    wrapper.append(this.generatetitle());
    wrapper.append(this.generateDescription());
    wrapper.append(this.generateImage());
    overlay.append(wrapper);
    this.overlay = overlay;
  }

  createInstance() {
    this.buildLayout();
    return this.layout;
  }
}
