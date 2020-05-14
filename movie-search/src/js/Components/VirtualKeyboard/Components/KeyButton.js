import createDomNode from "../../../services/createDomNode";

export class KeyButton {
  constructor(data) {
    this.data = data;
    this.code = data.code;
    this.classes = data.classes;
    this.value = data.value;
    this.ru = null;
    this.eng = null;
    this.lang = null;
    this.case = null;
    this.keyButton = null;
    this.shifted = false;
    this.capslocked = false;
  }

  generateButton() {
    let button = null;
    button = createDomNode(button, 'button', 'keyboard__key', ...this.classes);
    button.setAttribute('type', 'button');
    button.setAttribute('data-code', this.code);
    this.keyButton = button;
    typeof(this.value) === 'string' ? this.makeSpecialbutton() : this.makeSymbolButton();
  }

  makeSpecialbutton() {
    this.keyButton.innerHTML = this.data.value;
  }

  makeSymbolButton() {
    this.ru = this.data.value.ru;
    this.en = this.data.value.en;
    this.lang = localStorage.getItem('keyboardLanguage') || 'en';
    this.renderSymbolContent();
  }

  checkCase() {
    this.case = (this.capslocked && !this.shifted) || (this.shifted && !this.capslocked) ? 'up' : 'down';
  }

  renderSymbolContent() {
    if (this.case === null) {
      this.case = 'down';
    } else {
      this.checkCase();
    }
    this.keyButton.innerHTML = this[this.lang][this.case];
  }

  switchLanguage() {
    this.lang = localStorage.getItem('keyboardLanguage');
    this.renderSymbolContent();
  }

  keyShifted(value) {
    this.shifted = value;
    this.renderSymbolContent();
  }

  keyCapslocked(value) {
    this.capslocked = value;
    this.renderSymbolContent();
  }

  makeKeyButton() {
    this.generateButton();
    return this.keyButton;
  }
}
