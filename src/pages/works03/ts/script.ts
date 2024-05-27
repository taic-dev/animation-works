import Swup from "swup";
import { transitionAnimation } from "./animation";
import { Webgl } from "./webgl";

const webgl = new Webgl();
const swup = new Swup();

window.addEventListener("DOMContentLoaded", () => {
  // webgl
  webgl.init();


  transitionAnimation();

  swup.hooks.on("animation:out:start", () => {
    transitionAnimation();
  });

  swup.hooks.on("content:replace", () => {
    transitionAnimation();
  });
});

window.addEventListener('resize', () => {
  webgl.onResize();
})
