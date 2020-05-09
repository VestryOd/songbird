export default function addDomNodeAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key])
  };
  return element;
};
