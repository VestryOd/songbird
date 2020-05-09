import createDomNode from "../services/createDomNode";
import addDomNodeAttributes from "../services/addDomNodeAttributes";

export class SearchForm {
  constructor() {
    this.status = null;
    this.clear = null;
    this.keyboard = null;
    this.form = null;
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
    this.keyboard = button;
    wrapper.append(button);
    return wrapper;
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
    search.append(this.generateForm());
    return search;
  }

  render() {
    const layout = createDomNode(layout, 'section', 'search__wrapper');
    const wrapper = createDomNode(wrapper, 'div', 'wrapper');
    const search = this.generateSearch();
    wrapper.append(search);
    layout.append(wrapper);
    // const result = [
    //   search,
    //   this.status = null,
    //   this.clear = null,
    //   this.keyboard = null,
    //   this.form = null
    //   ];
    // return [...result];
    return layout;
  }
}
