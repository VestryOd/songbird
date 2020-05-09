import createDomNode from "../services/createDomNode";
import * as OPTIONS from "../constants";

export class Slide {
  constructor(data) {
    this.data = data;
    this.card = null;
    this.rating = null;
  }

  getRating(imdbID) {
    const url = `${OPTIONS.OMDB_URL}?i=${imdbID}&apikey=${OMDB_API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.rating = data.imdbRating;
      })
      .catch(err =>{
        this.rating = '-.-';
      });
  }

  generateCard() {
    const {data} = this;
    this.getRating(data.imdbID);
    const swiperSlide = createDomNode(swiperSlide, 'div', 'swiper-slide');
    const content = `<div class="slide__title">
                      <a href="${OPTIONS.IMBD_URL}${data.imdbID}/videogallery/?ref_=tt_pv_vi_sm">${data.Title}</a>
                    </div>
                    <div class="image__wrapper"
                      style="background-image: url('${data.Poster}');">
                    </div>
                    <div class="slide__info">
                      <span class="slide__year">${data.Year}</span>
                      <span class="slide__rating">${this.rating}</span>
                    </div>
                  </div>`;
    swiperSlide.insertAdjacentHTML('afterbegin', content);
    this.card = swiperSlide;
  }

  render() {
    this.generateCard();
    return this.card;
  }
}
