import { SLIDER_CONTENTS } from "./constants";

export class Slider {
  sliderItem: Element[] | null;
  sliderList: HTMLElement | null;
  next: Element | null;
  timeBar: HTMLElement | null;
  timeAnimation: HTMLElement | null;
  translateX: number;
  index: number;
  time: number;
  setTimer: any;

  constructor() {
    this.sliderList = document.querySelector(".slider__list");
    this.sliderItem = [...document?.querySelectorAll(".slider__item")];
    this.next = document?.querySelector(".slider__next");
    this.timeBar = document.querySelector(".slider__time span");
    this.timeAnimation = document.querySelector(".slider__time--animation");
    this.translateX = 0;
    this.index = 1;
    this.time = 1;
  }

  init() {
    if (!this.sliderItem) return;

    this._autoSlider();

    this.next?.addEventListener("click", () => {
      this._resetTimer();
    });

    this.sliderItem.forEach((v) => {
      const clone = v.cloneNode(true);
      this.sliderList?.appendChild(clone);
    });

    this.sliderItem.forEach((v) => {
      const clone = v.cloneNode(true);
      this.sliderList?.appendChild(clone);
    });
  }

  _main() {
    if (!this.sliderItem || !this.sliderList || !this.next) return;

    this.next.classList.add("slider__next--disabled");
    this._moveSlider();

    

    if (this.index === this.sliderItem.length) {
      this.sliderList.addEventListener(
        "transitionend",
        () => {
          this._resetSlider();
          this.index = 1;
        },
        { once: true }
      );
    }

    setTimeout(() => {
      if (!this.next) return;
      this.index++;
      this.next.classList.remove("slider__next--disabled");
    }, 1000);
  }

  _moveSlider() {
    if (!this.sliderList) return;

    this.sliderList.style.transition = "1s";
    this.translateX -= SLIDER_CONTENTS.WIDTH + SLIDER_CONTENTS.GAP;
    this.sliderList.style.setProperty("--translateX", `${this.translateX}px`);
  }

  _resetSlider() {
    if (!this.sliderList) return;

    this.sliderList.style.transition = "0s";
    this.translateX = 0;
    this.sliderList.style.setProperty("--translateX", `${this.translateX}px`);
  }

  _autoSlider() {
    this.setTimer = setInterval(() => {
      if (this.time === 8) {
        this._main();
        this.time = 1;
      } else {
        this.time += 1;
      }
    }, 1000);
  }

  _resetTimer() {
    this._main();
    this.timeAnimation?.classList.remove("slider__time--animation");
    clearInterval(this.setTimer);

    setTimeout(() => {
      this._autoSlider();
      this.timeAnimation?.classList.add("slider__time--animation");
      this.time = 1;
    }, 1000);
  }
}
