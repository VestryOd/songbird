import createDomNode from '../createDomNode';

export class Category {
  constructor(data, mode) {
    this.data = data;
    this.mode = mode;
    this.category = '';
  }

  makeCleanWord(word) {
    return word.match(/_/g) ? word.split('_').join(' ') : word;
  }

  generateCategoryWrapper() {
    let wrapper = createDomNode(wrapper, 'div', 'category__wrapper');
    return wrapper;
  }

  generateCategory(obj, mode) {
    let category = createDomNode(category, 'div', 'category', `category__${mode}`);
    category.dataset.category = obj.category;
    let categoryTitle = this.makeCleanWord(obj.category);
    category.innerHTML = `<span class="category__logo category__logo_color"
                            style="background-image: url('${obj.iconPath}${obj.category}_color.svg');"></span>
                          <span class="category__logo category__logo_grey"
                            style="background-image: url('${obj.iconPath}${obj.category}_grey.svg');"></span>
                          <div class="category__title">${categoryTitle}</div>`;
    return category;
  }

  buildCategory() {
    let wrapper = this.generateCategoryWrapper();
    wrapper.append(this.generateCategory(this.data, this.mode));
    this.category = wrapper;
  }

  createInstance() {
    this.buildCategory();
    return this.category;
  }
}
