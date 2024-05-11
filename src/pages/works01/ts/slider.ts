export class Slider {
  sections: Element[];
  pagination: Element[];
  rects: number[];
  index: number;
  isScroll: boolean;

  constructor() {
    this.sections = [...document.querySelectorAll(".section")];
    this.pagination = [...document.querySelectorAll(".pagination span")];
    this.rects = [];
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

    this._scrollPage(this.rects[this.index]);
    this._Pagination();

    setTimeout(() => {
      this.isScroll = false;
    }, 1500);
  }

  _Pagination() {
    this.pagination.forEach((element, index) => {
      this.index === index
        ? element.classList.add("is-active")
        : element.classList.remove("is-active");

      element.addEventListener("click", () => {
        this._scrollPage(this.rects[index]);
        this.pagination.forEach((element, index) => {
          element.classList.remove("is-active");
        });
        this.index = index;
        this.index === index && element.classList.add("is-active");
      });
    });
  }

  _scrollPage(position: number) {
    window.scroll({
      behavior: "smooth",
      top: position,
    });
  }

  _onResize() {
    this._getPosition(this.sections);
  }

  init() {
    this._getPosition(this.sections);
    this._Pagination();
  }
}
