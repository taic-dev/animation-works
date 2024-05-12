import { Animation } from "./animation";
import { Slider } from "./slider"

const slider = new Slider();
const animation = new Animation();

window.addEventListener('load', () => {
  slider.init();
  slider._Pagination()

  animation.init();
})

window.addEventListener('wheel', (e: WheelEvent) => {
  slider._onScroll(e);
})

window.addEventListener('resize', () => {
  slider._onResize();
})

window.addEventListener('beforeunload', () => {
  slider._onReload();
});