import { Breadcrumbs } from "./Components/Breadcrumbs";

export default function changeBreadcrumbs(route, container, data, delay) {
  if (!route === 'category') {
    let wrapper = container.firstChild;
    if (disappearElement(wrapper)) {
      deleteElement(wrapper);
    }
    let category = getCategoryFromData(data, route);
    let newElement = new Breadcrumbs(category).createInstance()
    let added = addElement(newElement, wrapper)
  }
}

/////
function fadeOut(element, delay) {
  if (disappearElement(element)) {
    setTimeout(() => {
      deleteElement(element)
    }, delay);
  };
  return true;
}

function fadeIn(container, newElement, delay) {
  let added = addElement(newElement, container);
  if (added) {
    setTimeout(() => {
      appearElement(newElement);
    }, delay);
  }
}

///////
function disappearElement(elem) {
  elem.classList.add('invisible');
  return true;
}

function appearElement(elem) {
  elem.classList.remove('invisible');
  return true;
}

function deleteElement(elem) {
  elem.remove();
  return true;
}

function addElement(elem, wrapper) {
  wrapper.append(elem);
  return true;
}
