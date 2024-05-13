export class Slider {
  sections: Element[];
  pagination: Element[];
  nowPosition: number;
  rects: number[];
  index: number;
  isScroll: boolean;

  constructor() {
    this.sections = [...document.querySelectorAll(".section")];
    this.pagination = [...document.querySelectorAll(".pagination span")];
    this.rects = [];
    this.nowPosition = window.scrollY;
    this.isScroll = false;
    this.index = 0;
  }

  _setPosition(elements: Element[]) {
    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      this.rects.push(rect.top);
    });
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
    this._setPosition(this.sections);
  }

  _onReload() {
    window.scroll({ top: 0 })
  }

  init() {
    this._setPosition(this.sections);
    this._Pagination();
  }
}
