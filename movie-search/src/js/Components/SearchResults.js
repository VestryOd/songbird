import * as OPTIONS from "../constants";

export class SearchMovies {
  constructor() {
    this.defaultText = 'Dream';
  }

  handleError() {

  }

  search(text) {
    const queryUrl = `${OPTIONS.OMDB_URL}?s=${text || this.defaultText}&apikey=${OPTIONS.OMDB_API_KEY}`;
    fetch(queryUrl)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          this.handleError();
        }
      })
  }
}
