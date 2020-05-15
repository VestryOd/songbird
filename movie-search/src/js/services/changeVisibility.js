function changeVisibility(elemToShow, elemToHide) {

  function hideElem(elem) {
    elem.classList.add("hidden");
    return true;
  }
  function visibleElem(elem) {
    elem.classList.remove("hidden");
    return true;
  }
  function fadeIn(elem) {
    elem.classList.add("show");
    return true;
  }
  function fadeOut(elem) {
    elem.classList.remove("show");
    return true;
  }

  if (fadeOut(elemToHide)) {
    setTimeout(() => {
      if (visibleElem(elemToShow)) {
        fadeIn(elemToShow);
        hideElem(elemToHide);
      }
      fadeIn(elemToShow);
    }, 500);
  }
}

export default changeVisibility;
