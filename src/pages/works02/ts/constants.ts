import CustomEase from "gsap/CustomEase";

export const PARTICLE_NUMBER = 50;

export const WINDOW = {
  W: window.innerWidth,
  H: window.innerHeight
}

export const SLIDER_CONTENTS = {
  WIDTH: 300,
  GAP: 16
}

export const IS_LOADING = !(sessionStorage.getItem("isLoading"))

export const EASING = {
  transform: CustomEase.create("transform", "M0,0 C0.44,0.05 0.17,1 1,1"),
  colorAndOpacity: CustomEase.create(
    "colorAndOpacity",
    "M0,0 C0.26,0.16 0.1,1 1,1 "
  ),
};