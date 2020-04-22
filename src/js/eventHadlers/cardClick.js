export default function cardClick(e) {
  if (e.target.classList.contains('card__rotate-icon')) {
    rotateCard(e.target)
  } else {
    sayText(e.target)
  }
}
