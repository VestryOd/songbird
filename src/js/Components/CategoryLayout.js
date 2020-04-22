import createDomNode from '../createDomNode';
import { Category } from "./Category";

export class CategoryLayout {
  constructor(obj, mode, classes) {
    this.obj = obj;
    this.mode = mode;
    this.classes = classes;
    this.layout = '';
  }

  generateLayout(classes) {
    let layout = createDomNode(layout, 'div', ...classes);
    return layout;
  }

  addCategoriesToLayout(layout, arr, classConstructor, mode) {
    arr.forEach(elem => {
      layout.append(new classConstructor(elem, mode).createInstance());
    });
  }

  buildLayout() {
    this.layout = this.generateLayout(this.classes);
    this.addCategoriesToLayout(this.layout, this.obj, Category, this.mode);
  }

  createInstance() {
    this.buildLayout();
    return this.layout;
  }
}
