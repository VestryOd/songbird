
import { CategoryLayout } from "../Components/CategoryLayout";
import { CardsLayout } from "../Components/CardsLayout";
import { Breadcrumbs } from "../Components/Breadcrumbs";
import changeContent from "../changeContent";
import createDomNode from "../createDomNode";
import cardClick from "../hadlers/cardClick";
import categoryClick from "../hadlers/categoryClick";
import data from "../../../cards-data";

export default function handleRouts(route) {
  console.log(route);

  const CATEGORIES_LAYOUT = ['layout-inline-flex'];
  const CARDS_LAYOUT = ['layout-4-column', 'content__wrapper'];
  const DELAY = 500;
  let isAnimated = false;
  let mode = getModeValue();
  console.log(mode);

  if (route !== 'category' && route !== 'statistics') {
    handleCardsCategory(data, route, mode, isAnimated, CARDS_LAYOUT, DELAY);
  } else {
    handleCategoriesPage(data, route, mode, CATEGORIES_LAYOUT, DELAY);
  }

  function handleCardsCategory(data, route, mode, isAnimated, classes, delay) {
    let categoryObject = getCategoryFromData(data, route);
    let cards = new CardsLayout(categoryObject, mode, classes).createInstance();
    cards.addEventListener('click', cardClick);
    let breadcrumbs = new Breadcrumbs(categoryObject).createInstance();
    changeContent('#content-container .wrapper', cards, isAnimated, delay, 'disappear');
    changeContent('.breadcrumbs__wrapper', breadcrumbs, isAnimated, delay, 'invisible');
    animationInProcess();
  }

  function handleCategoriesPage(data, mode, isAnimated, classes, delay) {
    let homePageLayout = new CategoryLayout(data, mode, classes).createInstance();
    homePageLayout.addEventListener('click', categoryClick);
    let breadcrumbs = createDomNode(breadcrumbs, 'div', 'breadcrumbs__layout');
    breadcrumbs.innerHTML = `<div></div`;
    changeContent('#content-container .wrapper', homePageLayout, isAnimated, delay, 'disappear');
    changeContent('.breadcrumbs__wrapper', breadcrumbs, isAnimated, delay, 'invisible');
    animationInProcess();
  }

  function getCategoryFromData(data, category) {
    return data.find(el => el.category === category);
  }

  function animationInProcess() {
    console.log('start---', new Date().getMilliseconds());

    isAnimated = true;
    setTimeout(() => {
      isAnimated = false;
      console.log('end---', new Date().getMilliseconds());
    }, DELAY);
  }

  function getModeValue() {
    return document.querySelector('#toggleMode').checked !== true ? 'train_mode' : 'play_mode';
  }

}
