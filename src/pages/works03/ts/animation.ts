const items = [...document.querySelectorAll(".item")];

items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("is-show");
  });
  item.classList.add('is-hidden')
});

export function transitionAnimation() {
}
transitionAnimation();
