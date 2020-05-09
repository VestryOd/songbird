import createDomNode from "../services/createDomNode";
import { getFullMovie, getTranslate } from "../services/getData";

export class SearchEngine {
  constructor() {
    this.defaultText = 'Dream';
    this.movies = null;
    this.amount = null;
    this.ratings = null;
    this.keyboard = null;
    this.form = null;
    this.status = null;
    this.clear = null;
    this.movies = null;
  }

  handleErrors(error) {
    console.log(error.status, 'Someething went wrong');
  }

  render(text) {
    const query = text || this.defaultText;
    if (!localStorage.movies) {
      try {
        getFullMovie(1, query).then(res => {
          localStorage.setItem('movies', JSON.stringify(res));
          console.log("data", res)
        });
      } catch (error) {
        this.handleErrors(error);
      }
    } else {
      this.movies = JSON.parse(localStorage.getItem('movies'));
      console.log("data", this.movies);
    }

  }
}
