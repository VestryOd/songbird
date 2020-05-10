import createDomNode from "../services/createDomNode";
import * as OPTIONS from "../constants";

export class Slide {
  constructor(data) {
    this.data = data;
    this.noPoster = '/assets/img/slider/no-poster.png';
    this.card = null;
  }

  generateTitle(data) {
    const title = createDomNode(title, 'div', 'slide__title');
    title.innerHTML = `<a href="${OPTIONS.IMBD_URL}${data.imdbID}/videogallery/?ref_=tt_pv_vi_sm">${data.Title}</a>`;
    return title;
  }

  generateImage(data) {
    const wrapper = createDomNode(wrapper, 'div', 'image__wrapper');
    const img = new Image();
    img.src = data.Poster;
    img.alt = data.Title;
    img.onerror = () => {
      img.src = this.noPoster;
    }
    wrapper.append(img);
    return wrapper;
  }

  generateInfo(data) {
    const wrapper = createDomNode(wrapper, 'div', 'slide__info');
    wrapper.innerHTML = `<span class="slide__year">${data.Year}</span>
                        <span class="slide__rating">${data.imdbRating}</span>`;
      return wrapper;
  }

  generateCard() {
    const swiperSlide = createDomNode(swiperSlide, 'div', 'swiper-slide');
    const inner__wrapper = createDomNode(inner__wrapper, 'div', 'inner__wrapper');
    swiperSlide.append(inner__wrapper);
    inner__wrapper.append(
      this.generateTitle(this.data),
      this.generateImage(this.data),
      this.generateInfo(this.data)
    );
    this.card = swiperSlide;
  }

  render() {
    this.generateCard();
    return this.card;
  }
}
