export class Animation {
  observer: IntersectionObserver | undefined;
  options: IntersectionObserverInit | undefined;
  sections: Element[] | null;
  tags: Element[] | null;
  buildingTitle: Element[] | null;
  buildingText: Element[] | null;

  constructor() {
    this.observer;
    this.options = {
      root: null,
      rootMargin: "-50% 0px",
      threshold: 0,
    };
    this.sections = [...document.querySelectorAll(".section")];
    this.tags = [...document.querySelectorAll(".tag p")];
    this.buildingTitle = [...document.querySelectorAll(".building__title h2")];
    this.buildingText = [...document.querySelectorAll(".building__text p")];
  }

  _setObserver(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit | undefined
  ) {
    this.observer = new IntersectionObserver(callback, options);
  }

  _stringToSpan(element: Element, splitString: string) {
    let newString = "";
    const stringArray = element.textContent?.split(splitString);

    stringArray?.forEach((string) => {
      newString += `<span>${string}${splitString}</span>`;
    });

    element.innerHTML = newString;
  }

  _setAnimation() {
    if (!this.tags || !this.buildingTitle || !this.buildingText) return;

    this.tags.forEach((v) => {
      this._stringToSpan(v, "");
    });
    this.buildingTitle.forEach((v) => {
      this._stringToSpan(v, "");
    });
    this.buildingText.forEach((v) => {
      this._stringToSpan(v, " ");
    });
  }

  _startAnimation(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
      }
    });
  }

  init() {
    this._setAnimation();
    this._setObserver(this._startAnimation, this.options);

    this.sections?.forEach((tag) => {
      this.observer?.observe(tag);
    });


  }
}
