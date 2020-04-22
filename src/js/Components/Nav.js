import createDomNode from '../createDomNode';

export class Nav {
  constructor(data) {
    this.data = data;
    this.nav = '';
  }

  generateNav(data) {
    let nav = createDomNode(nav, 'ul', 'nav');
    nav.append(this.generateHomeItem());
    nav = this.generateItems(nav, data);
    nav.append(this.generateStatsItem());
    return nav;
  }

  generateHomeItem() {
    let li = createDomNode(li, 'li', 'nav__link');
    li.dataset.section = 'category';
    li.innerHTML = `<span class="nav_icon" style="background-image: url('/assets/img/icons/home.svg');"></span>
                    <span class="nav_content">homepage</span>`;
    return li;
  }

  generateStatsItem() {
    let li = createDomNode(li, 'li', 'nav__link');
    li.dataset.section = 'statistics';
    li.innerHTML = `<span class="nav_icon" style="background-image: url('/assets/img/icons/stats.svg');"></span>
                    <span class="nav_content">statistics</span>`;
    return li;
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

  mountNav() {
    this.nav.addEventListener('click', (event) => {
      this.autoCloseNav();
    })
  }

  createInstance() {
    this.nav = this.generateNav(this.data);
    this.mountNav();
    return this.nav;
  }
}
