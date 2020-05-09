import '@babel/polyfill';
import { Header } from "./js/Components/Header";
import { InfoPanel } from "./js/Components/InfoPanel";
import { SearchForm } from "./js/Components/SearchForm";
import { Footer } from "./js/Components/Footer";
import { Loader } from "./js/Components/Loader";
import { SearchEngine } from "./js/Components/SearchEngine";
// import { Slider } from "./js/Components/Slider";



window.onload = () => {

  const header = new Header();
  const infoPanel = new InfoPanel();
  const searchForm = new SearchForm();
  const loader = new Loader();
  const footer = new Footer();
  const searchEngine = new SearchEngine();

  // const slider = new Slider();
  document.body.append(
    header.render(),
    searchForm.render(),
    infoPanel.render(),
    // slider.render(),
    footer.render()
  );

  searchEngine.render();
  console.log(searchEngine);

}
