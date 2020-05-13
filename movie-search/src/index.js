import '@babel/polyfill';
import { MainLayout } from "./js/Components/MainLayout";
import { Header } from "./js/Components/Header";
import { InfoPanel } from "./js/Components/InfoPanel";
import { SearchForm } from "./js/Components/SearchForm";
import { Footer } from "./js/Components/Footer";
import { SearchEngine } from "./js/Components/SearchEngine";
import { Slider } from "./js/Components/Slider";



window.onload = () => {

  const main = new MainLayout();
  const header = new Header();
  const infoPanel = new InfoPanel();
  const searchForm = new SearchForm();
  const footer = new Footer();
  const slider = new Slider();
  const searchEngine = new SearchEngine('plane', searchForm, infoPanel, slider);

  const mainLayout = main.render();
  mainLayout.append(
    searchForm.render(),
    infoPanel.render(),
    slider.prepare(),
  );

  document.body.append(
    header.render(),
    mainLayout,
    footer.render()
  );

  slider.initSwiper();
  searchEngine.addSliderEventListeners();
  searchEngine.render();

  // alert('Привет дорогой друг (подруга)☺ Просьба начать проверку не раньше 12-13.05, т.к. при последнем деплое возникли проблемы с провайдером - обещали за день два починить). Просьба войти в положение. Для свизи ник в дискорде vestry_od, телега vestry_od. Заранее благодарю за понимание)');

  console.log(searchEngine);

  searchForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchEngine.searchRequest(e.target);
  });

}
