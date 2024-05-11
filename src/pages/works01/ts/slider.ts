export class Slider {
  sections: Element[];
  rects: number[];
  nowPosition: number;
  index: number;
  isScroll: boolean;

  constructor() {
    this.sections = [...document.querySelectorAll(".section")];
    this.rects = [];
    this.nowPosition = 0;
    this.isScroll = false;
    this.index = 0;
  }

  _getPosition(elements: Element[]) {
    for (const section of elements) {
      const rect = section.getBoundingClientRect();
      this.rects.push(rect.top);
    }
  }

  _onScroll(e: WheelEvent) {
    if (this.isScroll) return;
    this.isScroll = true;

    e.deltaY < 0
      ? this.index !== 0 && this.index--
      : this.index !== this.rects.length - 1 && this.index++;

    window.scroll({
      behavior: "smooth",
      top: this.rects[this.index],
    });

    setTimeout(() => {
      this.isScroll = false;
    }, 1500);
  }

  _onResize() {
    this._getPosition(this.sections);
  }

  init() {
    this._getPosition(this.sections);
  }
}
