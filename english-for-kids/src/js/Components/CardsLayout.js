import createDomNode from '../createDomNode';
import { Card } from "./Card";
import { Rate } from "./Rate";

export class CardsLayout {
  constructor(obj, mode, classes) {
    this.obj = obj;
    this.mode = mode;
    this.classes = classes;
    this.ratesLayout = '';
    this.cardsLayout = '';
    this.layout = '';
  }

  generateWrapper() {
    let classes = ['cards-category__layout'];
    let cardsCategoryLayout = createDomNode(cardsCategoryLayout, 'div', ...classes);
    return cardsCategoryLayout;
  }

  generateCardsLayout(classes) {
    let layout = createDomNode(layout, 'div', ...classes);
    return layout;
  }

  generateRatesLayout(obj, mode) {
    this.rate = new Rate(obj, mode).createInstance();
    return this.rate;
  }

  addCardsToLayout(layout, obj, classConstructor, mode) {
    let { cards } = obj;
    let { imgPath, category } = obj;
    cards.forEach(elem => {
      layout.append(new classConstructor(elem, mode, imgPath, category).createInstance());
    });
  }

  buildLayout() {
    let wrapper = this.generateWrapper();
    this.ratesLayout = this.generateRatesLayout(this.obj, this.mode);
    wrapper.append(this.ratesLayout);
    this.cardsLayout = this.generateCardsLayout(this.classes);
    this.addCardsToLayout(this.cardsLayout, this.obj, Card, this.mode);
    wrapper.append(this.cardsLayout);
    this.layout = wrapper;
  }

  createInstance() {
    this.buildLayout();
    return this.layout;
  }
}
