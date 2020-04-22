export default function changeContent(containerSelector, newElement, isAnimated, delay) {
  if (isAnimated) return;
  console.log('I am in process');
  if (newElement === undefined || newElement === null || newElement.length < 1) {
    reportError('No new content!');
    return;
  }
  let container = document.querySelector(containerSelector);
  let elements = Array.from(container.children);

  if (!container || !elements) {
    reportError('No target element or content!');
  } else {
    let fadedOut = fadeOut(elements, delay);

    fadeIn(container, newElement, delay)
  }
  return true;
}


////////
function fadeOut(elements, delay) {
  if (disappearElements(elements)) {
    setTimeout(() => {
      deleteElements(elements)
    }, delay);
  };
  return true;
}

function fadeIn(container, newElement, delay) {
  let added = addElements(container, newElement);
  if (added) {
    setTimeout(() => {
      appearElements(newElement);
    }, delay);
  }
}


////////
function reportError(text) {
  console.error(text);
}

function disappearElements(elements) {
  elements.forEach(elem => {
    elem.classList.add('disappear');
  });
  return true;
}

function deleteElements(elements) {
  elements.forEach(elem => {
    elem.remove();
  });
  return true;
}

function addElements(container, newElement) {
  newElement.classList.add('disappear');
  // debugger;
  container.append(newElement);
  return true;
}

function appearElements(newElement) {
  newElement.classList.remove('disappear');
}
