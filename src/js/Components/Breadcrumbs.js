import createDomNode from '../createDomNode';

export class Breadcrumbs {
  constructor(data) {
    this.data = data;
    this.layout = '';
  }

  makeCleanWord(word) {
    return word.match(/_/g) ? word.split('_').join(' ') : word;
  }

  generateBreadcrumsWrapper() {
    let div = createDomNode(div, 'div', 'header__breadcrumbs');
    return div;
  }

  generateLayout() {
    let layout = createDomNode(layout, 'div', 'breadcrumbs__layout');
    return layout;
  }

  generateBreadcrums(obj) {
    let breadcrums = createDomNode(breadcrums, 'div', 'breadcrumbs__item');
    breadcrums.dataset.breadcrumbs = obj.category;
    let categoryWords = this.makeCleanWord(obj.category)
    breadcrums.innerHTML = `<span class="breadcrumbs__logo"
                              style="background-image: url('${obj.iconPath}${obj.category}_color.svg');"></span>
                            <div class="breadcrumbs__title">${categoryWords}</div>`;
    return breadcrums;
  }

  buildBreadcrums() {
    let layout = this.generateLayout();
    let wrapper = this.generateBreadcrumsWrapper();
    wrapper.append(this.generateBreadcrums(this.data));
    layout.append(wrapper);
    // console.log(wrapper);
    this.layout = layout;
  }

  createInstance() {
    this.buildBreadcrums();
    return this.layout;
  }
}
