import { OMBdFetchApi } from "./js/Components/OMBdFetchApi";
import getData from "./js/services/getData";
import * as OPTIONS from './js/constants';
import regeneratorRuntime from "regenerator-runtime";
import Swiper from 'swiper';


window.onload = () => {

  const swiper = new Swiper('#swiper', {
    slidesPerView: 4,
    spaceBetween: 40,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    // },
    navigation: {
      nextEl: '#js-next',
      prevEl: '#js-prev',
    },
    breakpoints: {
      1300: {
        slidesPerView: 4
      },
      1020: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      414: {
        slidesPerView: 1
      }
    },

    a11y: true,
    keyboardControl: true,
    grabCursor: true,

  });
  swiper.init();

  let searchResults = null;
  const url = `${OPTIONS.OMDB_URL}?s=dream&apikey=${OPTIONS.OMDB_API_KEY}`;


  fetch(url)
    .then(responce => {
      console.log('responce', responce);
      return responce.json();
    })
    .then(data => {
      console.log('data', data);
      searchResults = data;
      console.log(searchResults);
    })
    .catch(error => {
      searchResults = error;
      console.log(searchResults.Error)
    })

  // console.log(getMovieTitle('dream'));

}
