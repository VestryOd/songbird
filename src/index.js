import data from '../cards-data';

// import Components
import { Nav } from "./js/Components/Nav";
import { CategoryLayout } from "./js/Components/CategoryLayout";

// handlers
import categoryClick from "./js/hadlers/categoryClick";
import handleModeSwitch from "./js/hadlers/handleModeSwitch";

// constants and variables
const CATEGORIES_LAYOUT = ['layout-inline-flex'];

window.onload = function () {
  const CONTENT_CONTAINER = document.querySelector('#content-container .wrapper');
  const HEADER_NAV = document.querySelector('#main-nav');
  const SWITCHER = this.document.querySelector('#toggleMode');

  // make nav
  const nav = new Nav(data);
  HEADER_NAV.append(nav.createInstance());
  HEADER_NAV.addEventListener('click', categoryClick);

  // make categories home page
  let homePageLayout = new CategoryLayout(data, 'train_mode', CATEGORIES_LAYOUT).createInstance();
  CONTENT_CONTAINER.append(homePageLayout);
  homePageLayout.addEventListener('click', categoryClick);

 SWITCHER.addEventListener('click', () => {
   handleModeSwitch();
 });


  // init localstorage
  localStorage.setItem('englishMode', 'train_mode');
  localStorage.setItem('isPlaying', false);
  localStorage.setItem('englishStats', '');
}
