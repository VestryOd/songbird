import createDomNode from "../services/createDomNode";

export class Footer {
  render() {
    const footer = createDomNode(footer, 'div', 'footer__wrapper');
    const content = `<div class="wrapper">
                      <div class="footer">
                        <div class="course-info">RS School 2020q1</div>
                        <div class="github-link">
                          <a class="github-link" href="https://github.com/VestryOd">
                            <span class="icon github__icon"></span>VestryOd
                          </a>
                        </div>
                      </div>
                    </div>`;
    footer.insertAdjacentHTML('afterbegin', content);
    return footer;
  }
}
