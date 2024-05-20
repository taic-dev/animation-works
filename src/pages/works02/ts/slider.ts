import { SLIDER_CONTENTS } from "./constants";

export class Slider {
  sliderItem: Element[] | null;
  sliderList: HTMLElement | null;
  next: Element | null;
  timeBar: HTMLElement | null;
  translateX: number;
  index: number;
  timeBarWidth: number;

  constructor() {
    this.sliderList = document.querySelector(".slider__list");
    this.sliderItem = [...document?.querySelectorAll(".slider__item")];
    this.next = document?.querySelector(".slider__next");
    this.timeBar = document.querySelector('.slider__time span');
    this.translateX = 0;
    this.index = 0;
    this.timeBarWidth = 100;
  }

  init() {
    this._cloneItem();
    this._scrollTimer();
    this.next?.addEventListener("click", () => {
      this._onClickButton();
    });

  }

  _cloneItem() {
    if (!this.sliderItem) return;

    this.sliderItem.forEach((v) => {
      const clone = v.cloneNode(true);
      this.sliderList?.appendChild(clone);
    });

    this.sliderItem.forEach((v) => {
      const clone = v.cloneNode(true);
      this.sliderList?.appendChild(clone);
    });
  }

  _onClickButton() {
    if (!this.sliderItem || !this.sliderList) return;

    this.next.classList.add("slider__next--disabled");

    this.sliderList.style.transition = "0.5s";
    this.translateX -= SLIDER_CONTENTS.WIDTH + SLIDER_CONTENTS.GAP;
    this.sliderList?.style.setProperty("--translateX", `${this.translateX}px`);

    if (this.index === this.sliderItem.length - 1) {

      this.sliderList.addEventListener('transitionend', () => {
        this.translateX = 0;
        this.sliderList.style.transition = "0s";
        this.sliderList.style.setProperty("--translateX", `${this.translateX}px`);
        this.index = 0;
      }, { once: true })
    }

    setTimeout(() => {
      this.next.classList.remove("slider__next--disabled");
      this.index++;
    }, 500);
  }


  _scrollTimer() {
    setInterval(() => {
      this.timeBarWidth -= 1
      this.timeBar.style.setProperty('--timeBar', `${this.timeBarWidth}%`)

      this.timeBarWidth === 0 && (this.timeBarWidth = 100)
    }, 100)
    this.timeBar
  }
}
