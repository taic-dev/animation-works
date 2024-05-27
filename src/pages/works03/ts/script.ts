import Swup from "swup";
import { transitionAnimation } from "./animation";

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
