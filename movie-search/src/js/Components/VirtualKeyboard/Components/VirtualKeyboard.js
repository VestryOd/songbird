import createDomNode from "../../../services/createDomNode";
import { KeyButton } from "./KeyButton";

export class VirtualKeyboard {
  constructor(alphabets, exceptions, input) {
    this.defaultSet = alphabets;
    this.exceptions = exceptions;
    this.data = null;
    this.letters = [];
    this.digits = [];
    this.keyBoard = null;
    this.output = input;
    this.pressedButtons = null;
    this.capslocked = false;
  }

  checkKeyObjectForClasses(obj, keyButton) {
    const classes = obj.classes;
    if (!classes.includes('special')) {
      classes.includes('letter') ? this.letters.push(keyButton) : this.digits.push(keyButton);
    }
  }

  generateKeyboard() {
    const data = this.defaultSet;
    this.keyBoard = createDomNode(this.keyBoard, 'div', 'keyboard');
    data.forEach((elem) => {
      let keyButton = new KeyButton(elem);
      this.checkKeyObjectForClasses(elem, keyButton);
      this.keyBoard.append(keyButton.makeKeyButton());
    });
  }

  checkForExceptions(code) {
    return this.exceptions.includes(code);
  }

  checkForSwitchLang() {
    const conditionToSwitch = this.pressedButtons.has('ControlLeft') && this.pressedButtons.has('AltLeft');
    if (conditionToSwitch) this.switchLanguage();
  }

  handleSymbolDown(target) {
    const value = target.innerHTML;
    changeValue(value);
  }

  toggleActiveClass(target) {
    target.classList.toggle('active');
  }

  getKeyCode(e) {
    const code = e.code;
    const key = document.querySelector(`.keyboard__key[data-code="${code}"]`);
    return key;
  }

  checkForPressRepeating(key) {
    const code = key.dataset.code;
    if (!this.pressedButtons.has(code)) {
      this.pressedButtons.add(code);
      this.toggleActiveClass(key);
      this.checkForSwitchLang();
    }
  }

  clearPressedKey(key) {
    const code = key.dataset.code;
    if (this.pressedButtons.has(code)) {
      this.pressedButtons.delete(code);
      this.toggleActiveClass(key);
    }
  }

  addMouseDownListener() {
    this.keyBoard.addEventListener('mousedown', (e) => {
      this.handleKeyDown(e.target);
      this.toggleActiveClass(e.target);
      this.output.focus();
    });
  }

  addMouseUpListener() {
    this.keyBoard.addEventListener('mouseup', (e) => {
      const code = e.target.dataset.code;
      this.checkShiftUp(code);
      this.toggleActiveClass(e.target);
    });
  }

  checkShiftUp(code) {
    if (code === 'ShiftLeft' || code === 'ShiftRight') {
      this.shiftPressed(false);
    }
  }

  addListeners() {
    this.addMouseDownListener();
    this.addMouseUpListener();
  }

  changeValue(value) {
    let cursorPos = this.output.selectionStart;
    const left = this.output.value.slice(0, cursorPos);
    const right = this.output.value.slice(cursorPos);
    let positionFromLeft = null;

    switch (value) {
      case 'Tab':
        this.output.value = `${left}\t${right}`;
        cursorPos += 1;
        break;
      case 'Delete':
        this.output.value = `${left}${right.slice(1)}`;
        break;
      case 'Enter':
        this.output.value = `${left}${right}`;
        break;
      case 'Backspace':
        this.output.value = `${left.slice(0, -1)}${right}`;
        cursorPos -= 1;
        break;
      case 'Space':
        this.output.value = `${left} ${right}`;
        cursorPos += 1;
        break;
      case 'ArrowLeft':
        cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
        break;
      case 'ArrowRight':
        cursorPos += 1;
        break;
      case 'ArrowUp':
        positionFromLeft = this.output.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
        cursorPos -= positionFromLeft[0].length;
        break;
      case 'ArrowDown':
        positionFromLeft = this.output.value.slice(cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];
        cursorPos += positionFromLeft[0].length;
        break;
      default:
        if (value === '&amp;') {
          this.output.value = `${left}&${right}`;
          cursorPos += 1;
        } else {
          this.output.value = `${left}${value || ''}${right}`;
          cursorPos += 1;
        }
        break;
    }
    this.output.setSelectionRange(cursorPos, cursorPos);
  }

  switchLanguage() {
    localStorage.keyboardLanguage = localStorage.keyboardLanguage === 'ru' ? 'en' : 'ru';
    this.digits.forEach(el => el.switchLanguage());
    this.letters.forEach(el => el.switchLanguage());
  }

  shiftPressed(letterCase) {
    this.letters.forEach(el => el.keyShifted(letterCase));
    this.digits.forEach(el => el.keyShifted(letterCase));
  }

  capslockPressed(letterCase) {
    this.letters.forEach(el => el.keyCapslocked(letterCase));
  }

  init(data) {
    if (!localStorage.keyboardLanguage) {
      localStorage.keyboardLanguage = 'ru';
    }
    this.data = data || this.defaultSet;
    this.generateKeyboard();
    this.pressedButtons = new Set();
    this.addListeners();
  }

  render() {
    return this.keyBoard;
  }

  handleSymbolDown(target) {
    const value = target.innerHTML;
    this.changeValue(value);
  }

  handleKeyDown(key) {
    const button = key;
    if (button.classList.contains('keyboard__key')) {
      if (button.classList.contains('special')) {
        this.handleSpecialDown(button);
      } else {
        this.handleSymbolDown(button);
      }
    };
  }

  handleSpecialDown(target) {
    const special = target.dataset.code;
    switch (special) {
      case 'ContextMenu':
        this.switchLanguage();
        break;
      case 'CapsLock':
        this.capslocked = !this.capslocked;
        this.capslockPressed(this.capslocked);
        break;
      case 'ShiftLeft':
        this.shiftPressed(true)
        break;
      case 'ShiftRight':
        this.shiftPressed(true)
        break;
      default:
        this.changeValue(special);
        break;
    }
  };
}
