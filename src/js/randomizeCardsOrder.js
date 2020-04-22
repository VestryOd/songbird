export default function randomizeCardsOrder(arr) {
  let indexArray = [];
  for (let i = 0; i < arr.length; i++) {
    indexArray.push(i);
  }
  let j, temp;
  for (let i = indexArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = indexArray[j];
    indexArray[j] = indexArray[i];
    indexArray[i] = temp;
  }
  return indexArray;
}
