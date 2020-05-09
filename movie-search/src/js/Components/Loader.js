import createDomNode from "../services/createDomNode";

export class Loader {
  render() {
    const wrapper = createDomNode(wrapper, 'div', 'loader__wrapper');
    const content = `<div class="loadingio-spinner-dual-ring-0g65pg5h4ux6">
                      <div class="ldio-p7d46aaoseg">
                        <div></div>
                        <div>
                          <div>
                          </div>
                        </div>
                      </div>
                    </div>`;
    wrapper.insertAdjacentHTML('afterbegin', content);
    return wrapper;
  }
}
