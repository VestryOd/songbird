export default function handleModeSwitch() {
  console.log('handleswitch');

  let rate = document.querySelector('.rate');
  rate.classList.toggle('invisible');
  rate.classList.toggle('hidden');

  let cards = document.querySelectorAll('.card');
  cards.forEach(el => {
    el.classList.toggle('play_mode');
    el.classList.toggle('train_mode');
  })
}
