import Lenis from "@studio-freight/lenis";
import { Particle } from "./particle";
import { Slider } from "./slider";

window.addEventListener("DOMContentLoaded", () => {
  // Lenis
  const lenis = new Lenis();
  const raf = (time: number) => {
    lenis.raf(time * 0.8);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Particle
  const particle = new Particle();
  const { canvas, ctx } = particle.init();
  particle.set();
  particle.render({ canvas, ctx });

  const slider = new Slider();
  slider.init();
});

window.addEventListener("resize", () => {
  setTimeout(() => {
    location.reload();
  }, 500);
});
