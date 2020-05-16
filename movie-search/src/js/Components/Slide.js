import addDomNodeAttributes from "../services/addDomNodeAttributes";
import createDomNode from "../services/createDomNode";
import * as OPTIONS from "../constants";

export class Slide {
  constructor(data) {
    this.data = data;
    this.noPoster = '/assets/img/slider/no-poster.png';
    this.card = null;
  }

  generateInput(data) {
    let input = createDomNode(input, 'input', 'toggle__more-info');
    input = addDomNodeAttributes(input, { type: "checkbox", id: data.imdbID});
    return input;
  }

  generateTitle(data) {
    const title = createDomNode(title, 'div', 'slide__title');
    title.innerHTML = `<a href="${OPTIONS.IMBD_URL}title/${data.imdbID}/videogallery/?ref_=tt_pv_vi_sm" target="_blank">${data.Title}</a>`;
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
    wrapper.innerHTML = `<p class="slide__year">${data.Year}</p>
                        <label class="slide__more" for="${data.imdbID}"></label>
                        <p class="slide__rating"><span class="icon__star">★</span><span>${data.imdbRating}</span></p>`;
      return wrapper;
  }

  generateActorsLinks(actors) {
    let actorsLinks = '';
    for (let el of actors) {
      const nameToRequest = el.split(' ').join('+');
      actorsLinks += `<a
                      href="${OPTIONS.IMBD_URL}find?q=${nameToRequest}&ref_=nv_sr_sm"
                      target="_blank"
                      class="actors__link"
                      >${el}</a
                    > `;
    }
    return actorsLinks;
  }

  generateMoreInfo(data) {
    const wrapper = createDomNode(wrapper, 'div', 'more__info');
    wrapper.innerHTML = `<h5 class="more__title">${data.Title}</h5>
                          <div class="more__plot">
                            <span class="more__heading">Plot: </span>
                            ${data.Plot}
                          </div>
                          <div class="more__genre">
                            <span class="more__heading">Genre: </span>
                            ${data.Genre}
                          </div>
                          <div class="more__type">
                            <span class="more__heading">Type: </span>
                            ${data.Type}
                          </div>
                          <div class="more__director">
                            <span class="more__heading">Director: </span>
                            ${data.Director}
                          </div>
                          <div class="more__released">
                            <span class="more__heading">Released: </span>
                            ${data.Released}
                          </div>
                          <div class="more__actors">
                            <span class="more__heading">Actors: </span>
                            ${this.generateActorsLinks(data.Actors)}
                          </div>
                        <label class="close__down" for="${data.imdbID}"></label>`;
    return wrapper;
  };

  generateCard() {
    const swiperSlide = createDomNode(swiperSlide, 'div', 'swiper-slide');
    const inner__wrapper = createDomNode(inner__wrapper, 'div', 'inner__wrapper');
    swiperSlide.append(inner__wrapper);
    inner__wrapper.append(
      this.generateInput(this.data),
      this.generateTitle(this.data),
      this.generateImage(this.data),
      this.generateInfo(this.data),
      this.generateMoreInfo(this.data)
    );
    this.card = swiperSlide;
  }

  render() {
    this.generateCard();
    return this.card;
  }
}
