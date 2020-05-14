async function changeVisibility(elemToHide, elemToShow) {

  setTimeout(() => {
    toggleOpacity(elemToHide);
    toggleOpacity(elemToShow);
  }, 0);

  function toggleOpacity(elem) {
    elem.classList.toggle('invisible');
  }
}

export default changeVisibility;
