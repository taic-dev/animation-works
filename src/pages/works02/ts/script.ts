import Lenis from "@studio-freight/lenis";
import { Slider } from "./slider";
import { Animation } from "./animation";
import { Particle } from "./particle";

window.addEventListener("DOMContentLoaded", () => {
  // Slider
  const slider = new Slider();
  slider.init();

  // Animation
  const animation = new Animation();
  animation.init();
  animation._loading();

  // Lenis
  setTimeout(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time * 0.8);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, 5000);
});

window.addEventListener("resize", () => {
  const particle = new Particle();
  setTimeout(() => {
    particle.resize();
  }, 500);
});
