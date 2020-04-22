import data from '../cards-data';
import audioPlayer from './js/audioPlayer';
import randomizeCardsOrder from './js/randomizeCardsOrder';

// import Components
import { Nav } from "./js/Components/Nav";
import { CategoryLayout } from "./js/Components/CategoryLayout";

// handlers
import categoryClick from "./js/hadlers/categoryClick";
import handleModeSwitch from "./js/hadlers/handleModeSwitch";
import handleRouts from "./js/hadlers/handleRouts";

// constants and variables
const CATEGORIES_LAYOUT = ['layout-inline-flex'];
let mode = 'train_mode';

window.onload = function () {
  const CONTENT_CONTAINER = document.querySelector('#content-container .wrapper');
  const HEADER_NAV = document.querySelector('#main-nav');
  const SWITCHER = this.document.querySelector('#toggleMode');

  // make nav
  const nav = new Nav(data);
  HEADER_NAV.append(nav.createInstance());
  HEADER_NAV.addEventListener('click', categoryClick);

  // make categories home page
  let homePageLayout = new CategoryLayout(data, mode, CATEGORIES_LAYOUT).createInstance();
  CONTENT_CONTAINER.append(homePageLayout);
  homePageLayout.addEventListener('click', categoryClick);

 SWITCHER.addEventListener('click', () => {
   handleModeSwitch();
 });

}




