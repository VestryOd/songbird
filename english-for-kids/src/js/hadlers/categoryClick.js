import handleRouts from "./handleRouts";

export default function categoryClick(e) {
  if (!(e.target.closest('.nav__link') || e.target.closest('.category '))) {
    return false;
  }
  let targetContainer = e.target.closest('.nav__link') || e.target.closest('.category ');
  let route = targetContainer.dataset.section;
  handleRouts(route);
}
