import { SLIDER_CONTENTS } from "./constants";

export class Slider {
  sliderItem: Element[] | null;
  sliderList: HTMLElement | null;
  numerator: Element | null;
  denominator: Element | null;
  next: Element | null;
  timeBar: HTMLElement | null;
  translateX: number;
  index: number;
  time: number;
  setTimer: any;

  constructor() {
    this.sliderList = document.querySelector(".slider__list");
    this.sliderItem = [...document?.querySelectorAll(".slider__item")];
    this.next = document?.querySelector(".slider__next");
    this.numerator = document?.querySelector(".numerator");
    this.denominator = document?.querySelector(".denominator");
    this.timeBar = document.querySelector(".slider__time span");
    this.translateX = 0;
    this.index = 1;
    this.time = 1;
  }

  init() {
    if (!this.sliderItem || !this.denominator) return;

    this.denominator.innerHTML = String(this.sliderItem.length);
    this._startTimer();

    this.next?.addEventListener("click", () => {
      this._resetTimer();
    });

    this.sliderList?.addEventListener('mouseover', () => {
      this._stopTimer();
    })

    this.sliderList?.addEventListener('mouseout', () => {
      this._startTimer();
    })

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
          if (!this.numerator) return;
          this._resetSlider();
          this.index = 1;
          this.numerator.innerHTML = String(this.index);
        },
        { once: true }
      );
    }

    setTimeout(() => {
      if (!this.next || !this.numerator) return;
      this.index++;
      this.numerator.innerHTML = String(this.index);
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

  _startTimer() {
    this.setTimer = setInterval(() => {
      this.timeBar?.style.setProperty("--timeBar", `${100 - this.time * 10}%`);

      if (this.time === 10) {
        this._main();
        this.time = 1;
      } else {
        this.time += 1;
      }
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this.setTimer);
  }

  _resetTimer() {
    this._main();
    clearInterval(this.setTimer);

    setTimeout(() => {
      this._startTimer();
      this.time = 1;
    }, 1000);
  }
}
