import Lenis from "@studio-freight/lenis";
import { Slider } from "./slider";
import { Particle } from "./particle";
import { IS_LOADING } from "./constants";

// Slider
const slider = new Slider();
slider.init();

// Lenis
const lenis = new Lenis();
if(IS_LOADING) {
  lenis.stop();
  setTimeout(() => {
    lenis.start();
  },5000)
} else {
  lenis.start();
}

const raf = (time: number) => {
  lenis.raf(time * 0.8);
  requestAnimationFrame(raf);
};
requestAnimationFrame(raf);

window.addEventListener("resize", () => {
  const particle = new Particle();
  setTimeout(() => {
    particle.resize();
  }, 500);
});
