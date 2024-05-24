import Lenis from "@studio-freight/lenis";
import { Slider } from "./slider";
import { Particle } from "./particle";

// Slider
const slider = new Slider();
slider.init();

// Lenis
const lenis = new Lenis();
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
