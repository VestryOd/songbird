import createDomNode from './createDomNode';

export default class Nivigation {
  constructor(containerElement, data, callback) {
    this.container = containerElement;
    this.data = data;
    this.callback = callback;
    this.nav = '';
  }

  generateNav(data) {
    let nav = createDomNode(nav, 'ul', 'nav');
    nav = this.generateItems(nav, data);
    return nav;
  }

  generateItems(nav, data) {
    data.forEach(el => {
      nav.append(this.createLiElem(el));
    })
    return nav;
  }

  createLiElem(obj) {
    let li = createDomNode(li, 'li', 'nav__link');
    li.dataset.section = obj.category;
    li.innerHTML = `<span class="nav_icon" style="background-image: url('${obj.iconPath}${obj.category}_contour.svg');"></span>
                    <span class="nav_content">${obj.category}</span>`;
    return li;
  }

  autoCloseNav() {
    let switcher = document.querySelector('#toggleNav');
    switcher.checked = false;
  }

  mountNav(containerElement) {
    containerElement.append(this.nav);
    this.nav.addEventListener('click', (event) => {
      this.callback(event);
      this.autoCloseNav();
    })
  }

  buildNav() {
    this.nav = this.generateNav(this.data);
    this.mountNav(this.containerElement);
  }

  createNavInstance() {
    this.buildNav();
  }
}
