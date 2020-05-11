import '@babel/polyfill';
// import 'swiper.min.css';
import { Header } from "./js/Components/Header";
import { InfoPanel } from "./js/Components/InfoPanel";
import { SearchForm } from "./js/Components/SearchForm";
import { Footer } from "./js/Components/Footer";
import { SearchEngine } from "./js/Components/SearchEngine";
import { Slider } from "./js/Components/Slider";



window.onload = () => {

  const header = new Header();
  const infoPanel = new InfoPanel();
  const searchForm = new SearchForm();
  const footer = new Footer();
  const slider = new Slider();
  const searchEngine = new SearchEngine('plane', searchForm, infoPanel, slider);

  console.log(searchForm);
  document.body.append(
    header.render(),
    searchForm.render(),
    infoPanel.render(),
    slider.prepare(),
    footer.render()
  );

  slider.initSwiper();
  searchEngine.addSliderEventListener();
  searchEngine.render();
  // setTimeout(() => {
  //   slider.clearSlider();
  // }, 10000);

  console.log(searchEngine);

  searchForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchEngine.searchRequest(e.target);
  })

}
