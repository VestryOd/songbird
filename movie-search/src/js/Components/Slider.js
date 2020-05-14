import Swiper from 'swiper';
import { Slide } from "./Slide";
import createDomNode from "../services/createDomNode";
import changeVisibility from "../services/changeVisibility";
import options from "../services/sliderOptions";

export class Slider {
  constructor() {
    this.slides = [];
    this.data = null;
    this.amount = null;
    this.swiperElement = null;
    this.container = null;
    this.instance = null;
    this.swiper = null;
    this.basis = null;
    this.prev = null;
    this.next = null;
    this.loader = null;
    this.delay = 1000;
    this.updateSlider.bind(this);
  }

  generateLoader() {
    const loaderWrapper = createDomNode(loaderWrapper, 'div', 'loader__container','invisible');
    const loader = createDomNode(loaderWrapper, 'div', 'loader');
    loaderWrapper.append(loader);
    this.loader = loaderWrapper;
    return loaderWrapper;
  }

  generateSlides() {
    const data = this.data.Search;
    data.forEach(el => {
      this.slides.push(new Slide(el).render());
    });
  }

  generateNavigation() {
    const prev = createDomNode(prev, 'div', 'swiper-button-prev');
    prev.setAttribute('id', 'js-prev');
    this.prev = prev;
    const next = createDomNode(next, 'div', 'swiper-button-next');
    next.setAttribute('id', 'js-next');
    this.next = next;
    return [prev, next];
  }

  generateSliderBasis() {
    const section = createDomNode(section, 'section', 'slider__wrapper');
    const wrapper = createDomNode(wrapper, 'div', 'wrapper');
    const swiperContainer = createDomNode(swiperContainer, 'div', 'swiper-container');
    const loader = this.generateLoader();
    wrapper.append(loader, swiperContainer);
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

  initSwiper() {
    this.container.append(...this.generateNavigation());
    this.swiper = new Swiper(this.container, options);
  }

  render(data) {
    this.data = data;
    this.generateSlides();
    this.swiper.appendSlide(this.slides);
    this.swiper.init();
  }

  updateSlider(data) {
    this.loaderShow();
    this.amount = null;
    this.slides = [];
    this.swiper.removeAllSlides();
    this.render(data);
    setTimeout(() => {
      this.loaderHide();
    }, this.delay);
  }

  loaderShow() {
    changeVisibility(this.container, this.loader);
  }

  async loaderHide() {
    changeVisibility(this.loader, this.container);
  }
}
