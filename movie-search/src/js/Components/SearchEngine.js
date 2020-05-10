import createDomNode from "../services/createDomNode";
import checkString from "../services/checkString";
import { getFullMovie, getTranslate } from "../services/getData";

export class SearchEngine {
  constructor(searchForm, infoPanel, slider) {
    this.defaultText = 'Dream';
    this.movies = null;
    this.amount = null;
    this.ratings = null;
    this.keyboard = null;
    this.form = null;
    this.clear = null;
    this.movies = null;
    this.searchForm = searchForm;
    this.infoPanel = infoPanel;
    this.slider = slider;
  }

  handleErrors(error) {
    console.log(error.status, 'Someething went wrong');
  }

  handleSuccess(res, text) {
    this.infoPanel.successInfo(`${res.totalResults} results were found of "${text}"`);
    this.searchForm.changeStatus('ok');
  }

  searchRequest(target) {
    this.searchForm.changeStatus('loading');
    const formData = Object.fromEntries(new FormData(target).entries());
    const expression = formData['movie-name'];
    try {
      const checked = checkString(expression);
      if (checked.match(/[а-яА-Я]/)) {
        getTranslate(checked)
          .then(data => {
            if (data.Error) {
              throw new Error(data.Error);
            }
            this.infoPanel.successInfo(data.text[0]);
            //
          })
          .catch(error => {
            this.infoPanel.errorInfo(error);
          });
      } else {
        this.infoPanel.successInfo(checked);
      }
    } catch (error) {
      this.infoPanel.errorInfo(error);
    }
  }

  render(text) {
    const query = text || this.defaultText;
    if (!localStorage.movies) {
      try {
        getFullMovie(1, query).then(res => {
          localStorage.setItem('movies', JSON.stringify(res));
          console.log("data", res)
          this.handleSuccess(res, text);
        });
      } catch (error) {
        this.handleErrors(error);
      }
    } else {
      this.movies = JSON.parse(localStorage.getItem('movies'));
      console.log("data", this.movies);
      this.slider.render(this.movies.Search);
    }

  }
}
