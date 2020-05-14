import createDomNode from "../services/createDomNode";
import addDomNodeAttributes from "../services/addDomNodeAttributes";
import data from "./VirtualKeyboard/data";
import exceptions from "./VirtualKeyboard/exceptions";
import { VirtualKeyboard } from "./VirtualKeyboard/Components/VirtualKeyboard";

export class SearchForm {
  constructor() {
    this.status = null;
    this.clear = null;
    this.keyboardButton = null;
    this.form = null;
    this.input = null;
    this.keyboardLayout = null;
    this.keyboardInstance = null;
    this.changeStatus.bind(this);
    this.clearStatus.bind(this);
  }

  generateSearchInput() {
    const inputWrapper = createDomNode(inputWrapper, 'div', 'search-input__wrapper');
    const label = createDomNode(label, 'label', 'icon', 'icon__search');
    label.setAttribute('for', 'movie-name');
    let input = createDomNode(input, 'input', 'search__input');
    input = addDomNodeAttributes(input, {
      name: "movie-name",
      type: "search",
      id: "movie-name",
      placeholder: "Search movie..."
    });
    this.input = input;
    inputWrapper.append(label, input);
    return inputWrapper;
  }

  generateOptions() {
    const options = createDomNode(options, 'div', 'search__options');
    const status = createDomNode(status, 'div', 'search__status');
    status.innerHTML = `<span class="icon icon__ok"></span>
                        <span class="icon icon__loading"></span>
                        <span class="icon icon__no"></span>`;
    this.status = status;
    let clear = createDomNode(clear, 'button', 'search__clear', 'icon', 'icon__clear');
    clear = addDomNodeAttributes(clear, { type: 'reset'});
    this.clear = clear;
    options.append(status, clear);
    return options;
  }

  generateKeyboardButton() {
    const wrapper = createDomNode(wrapper, 'div', 'virtual-keyboard__wrapper');
    let button = createDomNode(button, 'button', 'virtual-keyboard', 'icon', 'icon__keyboard');
    button = addDomNodeAttributes(button, { type: 'button' });
    this.keyboardButton = button;
    wrapper.append(button);
    return wrapper;
  }

  generateKeyboardLayout() {
    const layout = createDomNode(layout, 'div', 'keyboard-container');
    this.keyboardInstance = new VirtualKeyboard(data, exceptions, this.input);
    this.keyboardInstance.init();
    layout.append(this.keyboardInstance.render());
    this.keyboardLayout = layout;
    return layout;
  }

  generateInfo() {
    const info = createDomNode(info, 'div', 'search__info');
    const input = this.generateSearchInput();
    const options = this.generateOptions();
    const keyboard = this.generateKeyboardButton();
    info.append(input, options, keyboard);
    return info;
  }

  generateSubmit() {
    let submit = createDomNode(submit, 'button', 'search__send');
    submit = addDomNodeAttributes(submit, { type: 'submit' });
    submit.innerHTML = `search`;
    return submit;
  }

  generateForm() {
    const form = createDomNode(form, 'form', 'search__form');
    form.setAttribute('id', 'search');
    const info = this.generateInfo();
    const submit = this.generateSubmit();
    form.append(info, submit);
    this.form = form;
    return form;
  }

  generateSearch() {
    const search = createDomNode(search, 'div', 'search');
    const form = this.generateForm();
    const keyboard = this.generateKeyboardLayout();
    search.append(form, keyboard);
    return search;
  }

  render() {
    const layout = createDomNode(layout, 'section', 'search__wrapper');
    const wrapper = createDomNode(wrapper, 'div', 'wrapper');
    const search = this.generateSearch();
    wrapper.append(search);
    layout.append(wrapper);
    return layout;
  }

  clearStatus() {
    const icons = this.status.querySelectorAll('.icon');
    icons.forEach(el => el.classList.remove('shown'));
  }

  changeStatus(value) {
    this.clearStatus();
    const current = this.status.querySelector(`.icon__${value}`);
    current.classList.add('shown');
  }
}
