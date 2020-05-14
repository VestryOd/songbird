const options = {
  spaceBetween: 40,
  slidesPerGroup: 1,
  loop: false,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '#js-next',
    prevEl: '#js-prev',
  },
  breakpoints: {
    1197: {
      slidesPerView: 3
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
  updateOnWindowResize: true,
  a11y: true,
  keyboardControl: true,
  grabCursor: true,

};

export default options;
