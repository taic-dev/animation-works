import { Slider } from "./slider"

const slider = new Slider();

window.addEventListener('DOMContentLoaded', () => {
  slider.init();
})

window.addEventListener('wheel', (e: WheelEvent) => {
  slider._onScroll(e);
})

window.addEventListener('resize', () => {
  slider._onResize();
})
