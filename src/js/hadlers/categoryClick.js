import handleRouts from "./handleRouts";

export default function categoryClick(e) {
  let targetContainer = e.target.closest('.nav__link') || e.target.closest('.category ');
  let route = targetContainer.dataset.section;
  handleRouts(route);
}
