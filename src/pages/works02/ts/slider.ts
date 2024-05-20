import { SLIDER_CONTENTS } from "./constants";

export class Slider {
  sliderItem: Element[] | null;
  sliderList: HTMLElement | null;
  next: HTMLElement | null;
  translateX: number;
  index: number;

  constructor() {
    this.sliderList = document.querySelector(".slider__list");
    this.sliderItem = [...document?.querySelectorAll(".slider__item")];
    this.next = document?.querySelector(".slider__next");
    this.translateX = 0;
    this.index = 0;
  }

  init() {
    this.next?.addEventListener("click", () => {
      this._onClickButton();
    });
  }

  _cloneItem() {
    if (!this.sliderItem) return;

    console.log(this.sliderItem);

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

    if (this.index === 4) {
      // this.sliderList.addEventListener("transitionend", () => {
      this.translateX = 0;
      this.sliderList.style.transition = "none";
      this.sliderList.style.setProperty("--translateX", `${this.translateX}px`);
      this.index = 0;
      // });
    } else {
      this.sliderList.style.transition = "0.5s";

      this.translateX -= SLIDER_CONTENTS.WIDTH + SLIDER_CONTENTS.GAP;
      this.sliderList?.style.setProperty(
        "--translateX",
        `${this.translateX}px`
      );

      this.index++;
    }
  }
}
