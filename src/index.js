import data from '../cards-data';
import speak from './js/voiceSpeak';
import audioPlayer from './js/audioPlayer';
import randomizeCardsOrder from './js/randomizeCardsOrder';
import generateContent from './js/generateContent';
import changeContent from "./js/changeContent";

// import Components
import { Nav } from "./js/Components/Nav";
import { CardsLayout } from "./js/Components/CardsLayout";
import { CategoryLayout } from "./js/Components/CategoryLayout";
import { Breadcrumbs } from "./js/Components/Breadcrumbs";

// handlers
import categoryClick from "./js/eventHadlers/categoryClick";

// constants and variables
const CATEGORIES_LAYOUT = ['layout-inline-flex'];
const CARDS_LAYOUT = ['layout-4-column', 'content__wrapper'];
const DELAY = 500;
let isAnimated = false;
let mode = 'play_mode';

window.onload = function () {
  const CONTENT_CONTAINER = document.querySelector('#content-container .wrapper');
  const HEADER_NAV = document.querySelector('#main-nav');
  const BREADCRUMDS_CONTAINER = document.querySelector('.breadcrumbs__wrapper');


  // make nav
  const nav = new Nav(data);
  HEADER_NAV.append(nav.createInstance());
  HEADER_NAV.addEventListener('click', categoryClick);

  // make categories home page
  let homePageLayout = new CategoryLayout(data, mode, CATEGORIES_LAYOUT).createInstance();

  CONTENT_CONTAINER.append(homePageLayout);

  /////////// Listeners
  // CONTENT_CONTAINER.addEventListener('click', (e) => {
  //   if (e.target.classList.contains('card__rotate-icon')) {
  //     rotateCard(e.target)
  //   } else {
  //     sayText(e.target)
  //   }
  // });

  document.addEventListener('click', () => {
    let animals = getCategoryFromData(data, 'animals');
    let cards = new CardsLayout(animals, mode, CARDS_LAYOUT).createInstance();
    changeContent('#content-container .wrapper', cards, isAnimated, DELAY, 'disappear');

    //Breadcrumbs BREADCRUMDS_WRAPPER
    let breadcrumbs = new Breadcrumbs(animals).createInstance();
    changeContent('.breadcrumbs__wrapper', breadcrumbs, isAnimated, DELAY, 'invisible');
    animationInProcess();
  });
  //, { once: true }
}




function rotateCard(target) {
  let side = target.closest('.card__inner');
  side.classList.toggle('translate');
  side.onmouseleave = () => {
    side.classList.remove('translate');
    side.onmouseleave = null;
  }
}

function sayText(target) {
  let word = target.closest('.card').dataset.action;
  console.log(word);
  speak(word);
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


function handleRouts(route) {
  if (!route === 'category') {
    let categoryObject = getCategoryFromData(data, route);
    let cards = new CardsLayout(categoryObject, mode, CARDS_LAYOUT).createInstance();
    changeContent('#content-container .wrapper', cards, isAnimated, DELAY);
  } else {
    let homePageLayout = new CategoryLayout(data, mode, CATEGORIES_LAYOUT).createInstance();
    changeContent('#content-container .wrapper', homePageLayout, isAnimated, DELAY);
  }
}

