import createDomNode from "../services/createDomNode";

export class Header {
  render(titleText) {
    const headerWrapper = createDomNode(headerWrapper, 'section', 'header__wrapper');
    const content = `<div class="wrapper">
                      <div class="header">
                        <h1 class="header__title">${titleText}</h1>
                      </div>
                    </div>`;
    headerWrapper.insertAdjacentHTML('afterbegin', content);
    return headerWrapper;
  }
}
