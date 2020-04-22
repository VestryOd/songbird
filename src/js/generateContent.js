import createDomNode from '../js/createDomNode';

export default function generateContent(parentElement, wrapperClass, data, classConstructor) {
  let wrapper = createDomNode(wrapper, 'div', wrapperClass)
  data.forEach(elem => {
    wrapper.append(new classConstructor(elem).createInstance());
  });
  parentElement.append(wrapper);
}
