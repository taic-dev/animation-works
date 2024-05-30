import Swup from "swup";
import Lenis from "@studio-freight/lenis";
import { transitionAnimation } from "./animation";
import { Webgl } from "./webgl";

// lenis
const lenis = new Lenis();
lenis.start();

const raf = (time: number) => {
  lenis.raf(time * 0.8);
  requestAnimationFrame(raf);
};
requestAnimationFrame(raf);

// webgl
const webgl = new Webgl();
webgl.init();

// swup
const swup = new Swup();

window.addEventListener("DOMContentLoaded", () => {
  transitionAnimation();

  swup.hooks.on("animation:out:start", () => {
    transitionAnimation();
  });

  swup.hooks.on("content:replace", () => {
    transitionAnimation();
  });
});

window.addEventListener("resize", () => {
  webgl.onResize();
});
