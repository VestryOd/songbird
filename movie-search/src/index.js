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

  console.log(searchEngine);

  searchForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchEngine.searchRequest(e.target);
  });

  searchForm.keyboardButton.addEventListener('click', () => {
    searchForm.keyboardLayout.classList.toggle('keyboard-show');
  })

  searchForm.keyboardLayout.addEventListener('click', () => {
    console.log(searchForm.input);
    searchForm.input.dispatchEvent(new Event('input'));
  })

  document.querySelector('.keyboard__key[data-code="Enter"]').addEventListener('click', () => {
    searchEngine.searchRequest(searchForm.form);
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      searchForm.keyboardLayout.classList.remove('keyboard-show');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.keyboard') && !e.target.classList.contains('icon__keyboard')) {
      searchForm.keyboardLayout.classList.remove('keyboard-show');
    }
  })

  searchForm.input.addEventListener('input', ()=> {
    searchForm.input.focus();
  });
}
