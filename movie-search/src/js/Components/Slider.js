import Swiper from 'swiper';
import { Slide } from "./Slide";
import createDomNode from "../services/createDomNode";
import options from "../services/sliderOptions";

export class Slider {
  constructor() {
    this.slides = [];
    this.data = null;
    this.amount = null;
    this.noRating = '-.-';
    this.swiperElement = null;
    this.container = null;
    this.instance = null;
    this.swiper = null;
    this.basis = null;
  }

  generateSlides() {
    const { data } = this;
    data.forEach(el => {
      this.slides.push(new Slide(el));
    });
  }

  insertSlides() {
    const { slides } = this;
    slides.forEach(el => {
      this.swiperElement.append(el.render());
    })
  }

  generateNavigation() {
    return `<div id="js-prev" class="swiper-button-prev"></div>
            <div id="js-next" class="swiper-button-next"></div>`;
  }

  generateSliderBasis() {
    const section = createDomNode(section, 'section', 'slider__wrapper');
    const wrapper = createDomNode(wrapper, 'div', 'wrapper');
    const swiperContainer = createDomNode(swiperContainer, 'div', 'swiper-container');
    wrapper.append(swiperContainer);
    const wrapperSwiper = createDomNode(wrapperSwiper, 'div', 'swiper-wrapper');
    swiperContainer.setAttribute('id', 'swiper');
    this.container = swiperContainer;
    this.swiperElement = wrapperSwiper;
    swiperContainer.append(wrapperSwiper);
    section.append(wrapper);
    return section;
  }

  prepare() {
    const basis = this.generateSliderBasis();
    this.basis = basis;
    return basis;
  }

  render(data) {
    this.data  = data;
    this.generateSlides();
    this.insertSlides();
    this.container.insertAdjacentHTML('beforeend', this.generateNavigation());
    this.swiper = new Swiper(this.container, options);
    console.log(options);
    this.swiper.init();
  }
}
