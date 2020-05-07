import createDomNode from "../services/createDomNode";

export class InfoPanel {
  constructor() {
    this.panel = null;
  }

  render() {
    const section = createDomNode(section, 'section', 'info-panel__wrapper');
    const wrapper = createDomNode(wrapper, 'div', 'wrapper');
    const title = createDomNode(title, 'h3', 'info-panel');
    this.panel = title;
    wrapper.append(title);
    section.append(wrapper);
    return section;
  }

  successInfo(query) {
    this.panel.classList.remove('error');
    this.panel.textContent = `Results of search "${query}"`;
  }

  errorInfo(query) {
    this.panel.classList.add('error');
    this.panel.textContent = `No results for "${query}"`;
  }
}
