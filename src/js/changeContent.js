export default function changeContent(containerSelector, newElement, isAnimated, delay, animationClass) {
  if (isAnimated) {
    console.log('animated');
  };

  if (newElement === undefined || newElement === null || newElement.length < 1) {
    reportError('No new content!');
    return;
  }
  let container = document.querySelector(containerSelector);
  let elements = Array.from(container.children);

  if (!container || !elements) {
    reportError('No target element or content!');
  } else {
    setTimeout(() => {
      fadeOut(elements, delay, animationClass);
    }, 0);
    // fadeOut(elements, delay, animationClass);

    setTimeout(() => {
      fadeIn(container, newElement, delay, animationClass)
    }, delay);
    // fadeIn(container, newElement, delay, animationClass);
  }
  return true;

  ////////
  function fadeOut(elements, delay, animationClass) {
    if (disappearElements(elements, animationClass)) {
      setTimeout(() => {
        deleteElements(elements)
      }, delay);
    };
    return true;
  }

  function fadeIn(container, newElement, delay, animationClass) {
    let added = addElements(container, newElement, animationClass);
    if (added) {
      setTimeout(() => {
        appearElements(newElement, animationClass);
      }, delay);
    }
  }


  ////////
  function reportError(text) {
    console.error(text);
  }

  function disappearElements(elements, animationClass) {
    elements.forEach(elem => {
      elem.classList.add(animationClass);
    });
    return true;
  }

  function deleteElements(elements) {
    elements.forEach(elem => {
      elem.remove();
    });
    return true;
  }

  function addElements(container, newElement, animationClass) {
    newElement.classList.add(animationClass);
    // debugger;
    container.append(newElement);
    return true;
  }

  function appearElements(newElement, animationClass) {
    newElement.classList.remove(animationClass);
  }
}
