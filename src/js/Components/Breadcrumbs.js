import createDomNode from '../createDomNode';

export class Breadcrumbs {
  constructor(data, parentElement = 'document') {
    this.parentElement = parentElement;
    this.data = data;
    this.category = '';
  }

  generateBreadcrumsWrapper() {
    let div = createDomNode(div, 'div', 'header__breadcrumbs');
    return div;
  }

  generateBreadcrums(obj) {
    let breadcrums = createDomNode(breadcrums, 'div', 'breadcrumbs__item');
    breadcrums.dataset.breadcrumbs = obj.category;
    breadcrums.innerHTML = `<span class="breadcrumbs__logo"
                              style="background-image: url('${obj.iconPath}${obj.category}_color.svg');"></span>
                            <div class="breadcrumbs__title">${obj.category}</div>`;
    return breadcrums;
  }

  buildBreadcrums() {
    let wrapper = this.generateBreadcrumsWrapper();
    wrapper.append(this.generateBreadcrums(this.data));
    this.category = wrapper;
  }

  createInstance() {
    this.buildBreadcrums();
    return this.category;
  }

  mountBreadcrums(parentElement) {
    parentElement.apped(this.breadcrums);
  }
}
