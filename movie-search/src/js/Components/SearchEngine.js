import checkString from "../services/checkString";
import { getFullMovie, getTranslate } from "../services/getData";

export class SearchEngine {
  constructor(query, searchForm, infoPanel, slider) {
    this.movies = null;
    this.amount = null;
    this.movies = null;
    this.pageCounter = 1;
    this.query = query;
    this.searchForm = searchForm;
    this.infoPanel = infoPanel;
    this.slider = slider;
    this.slidesBeforeLoad = 4;
    this.isFetching - false;
  }

  firstLoad() {
    this.pageCounter = 1;
    this.render();
  }

  handleErrors(error) {
    this.isFetching = false;
    if (error.message === 'Movie not found!') {
      this.infoPanel.errorInfo(this.query);
    } else {
      this.infoPanel.errorInfo(error);
    }
    this.searchForm.changeStatus('no');
  }

  addSliderEventListeners() {
    this.slider.swiper.on('sliderMove', () => {
      this.checkNextPagesToLoad();
    });
    this.slider.next.addEventListener('click', () => {
      this.checkNextPagesToLoad();
    });
    this.slider.swiper.update();
  }

  checkNextPagesToLoad() {
    const swiper = this.slider.swiper;
    if ((swiper.progress > 1 - (1 / swiper.slides.length) * this.slidesBeforeLoad) && !this.isFetching) {
      this.pageCounter++;
      this.searchForm.changeStatus('loading');
      this.render();
    }
  }

  handleSuccess(res, text) {
    this.isFetching = false;
    this.amount = res.totalResults;
    if (this.pageCounter === 1) {
      this.slider.updateSlider(res);
      this.searchForm.keyboardLayout.classList.remove('keyboard-show');
    } else {
      this.slider.render(res);
    }
    this.isFirstRequestProcessing = false;
    this.infoPanel.successInfo(`${res.totalResults} results of "${text}"`);
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
            this.query = data.text[0];
            this.firstLoad();
          })
          .catch(error => {
            this.handleErrors(error);
          });
      } else {
        this.query = checked;
        this.firstLoad();
      }
    } catch (error) {
      this.handleErrors(error);
    }
  }

  render() {
    this.isFetching = true;
    const query = this.query;
    try {
      getFullMovie(this.pageCounter, query).then(res => {
        this.handleSuccess(res, query);
      })
        .catch(error => this.handleErrors(error));
    } catch (error) {
      this.handleErrors(error);
    }

  }
}
