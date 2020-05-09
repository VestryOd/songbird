import Swiper from 'swiper';
import 'swiper.min.css';
import { Slide } from "./Slide";
import createDomNode from "../services/createDomNode";
import options from "../services/sliderOptions";

export class Slider {
  constructor(data) {
    this.slides = [];
    this.data = data;
    this.amount = null;
    this.noPoster = '/assets/img/slider/no-poster.png';
    this.noRating = '-.-';
    this.swiperElement = null;
    this.instance = null;
    this.swiper = null;
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
    const swiper = createDomNode(swiper, 'div', 'swiper-container');
    const wrapper = createDomNode(wrapper, 'div', 'swiper-wrapper');
    wrapper.setAttribute('id', 'swiper');
    this.swiperElement = wrapper;
    swiper.append(wrapper);
    section.append(swiper);
    return section;
  }

  render() {
    const basis = this.generateSliderBasis();
    this.generateSlides();
    this.insertSlides();
    basis.insertAdjacentHTML('beforeend', this.generateNavigation());
    this.swiper = new Swiper(this.swiperElement, options);
    this.swiper.init();
  }
}
