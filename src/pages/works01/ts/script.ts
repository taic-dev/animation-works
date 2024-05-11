import { Slider } from "./slider"

const slider = new Slider();

window.addEventListener('load', () => {
  slider.init();
  slider._Pagination()
})

window.addEventListener('wheel', (e: WheelEvent) => {
  slider._onScroll(e);
})

window.addEventListener('resize', () => {
  slider._onResize();
})
