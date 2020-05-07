export class OMBdFetchApi {
  constructor() {
    this.baseURL = 'http://www.omdbapi.com/';
    this.apiKey = 'apikey=424f14e6';
  }

  getSearchData(request) {
    return fetch(`${this.baseURL}?s=${request}&${this.apiKey}`)
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }

  getRatingData(imdbID) {
    return imdbID;
  }
}
