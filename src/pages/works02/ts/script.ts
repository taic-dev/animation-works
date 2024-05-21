import Lenis from "@studio-freight/lenis";
import { Particle } from "./particle";
import { Slider } from "./slider";
import { Animation } from "./animation";

window.addEventListener("DOMContentLoaded", () => {
  // Lenis
  const lenis = new Lenis();
  const raf = (time: number) => {
    lenis.raf(time * 0.8);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Animation
  const animation = new Animation();
  animation.init();
  animation._loading();

  // Slider
  const slider = new Slider();
  slider.init();
});

window.addEventListener("resize", () => {
  setTimeout(() => {
    location.reload();
  }, 500);
});
