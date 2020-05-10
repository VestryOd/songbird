import createDomNode from "../services/createDomNode";

export class InfoPanel {
  constructor() {
    this.panel = null;
    this.successInfo.bind(this);
    this.errorInfo.bind(this);
  }

  render() {
    const section = createDomNode(section, 'section', 'info-panel__wrapper');
    const wrapper = createDomNode(wrapper, 'div', 'wrapper');
    const title = createDomNode(title, 'h3', 'info-panel');
    const infoWrapper = createDomNode(infoWrapper, 'div', 'info__wrapper');
    this.panel = title;
    infoWrapper.append(title);
    wrapper.append(infoWrapper);
    section.append(wrapper);
    return section;
  }

  successInfo(query) {
    this.panel.classList.remove('error');
    this.panel.textContent = query;
  }

  errorInfo(query) {
    console.log(query);
    console.log(query instanceof Error);

    this.panel.classList.add('error');
    if (query instanceof Error) {
      this.panel.textContent = query.message;
    } else {
      this.panel.textContent = `No results for "${query}"`;
    }
  }
}
