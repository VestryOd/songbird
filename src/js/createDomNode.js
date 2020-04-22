export default function createDomNode(node, element, ...classes) {
  // console.log(...classes);
  node = document.createElement(element);
  node.classList.add(...classes);
  return node
};
