import gsap from "gsap";

export class Animation {
  tl: gsap.core.Timeline;
  observer: IntersectionObserver | undefined;
  circleObserver: IntersectionObserver | undefined;
  options: IntersectionObserverInit | undefined;
  loading: Element | null;
  sections: Element[] | null;
  tags: Element[] | null;
  buildingTitle: Element[] | null;
  buildingText: Element[] | null;
  finalTitle: Element | null;
  circle: HTMLElement | null;
  loopText: HTMLElement | null;

  constructor() {
    this.tl = gsap.timeline();
    this.options = {
      root: null,
      rootMargin: "-50% 0px",
      threshold: 0,
    };
    this.loading = document.querySelector(".loading");
    this.sections = [...document.querySelectorAll(".section")];
    this.tags = [...document.querySelectorAll(".tag p")];
    this.buildingTitle = [...document.querySelectorAll(".building__title h2")];
    this.buildingText = [...document.querySelectorAll(".building__text p")];
    this.buildingTitle = [...document.querySelectorAll(".building__title h2")];
    this.finalTitle = document.querySelector(".final__title h2");
    this.circle = document.querySelector(".circle");
    this.loopText = document.querySelector(".loop-text p");

    this._moveCircle = this._moveCircle.bind(this);
  }

  _setObserver(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit | undefined
  ) {
    return new IntersectionObserver(callback, options);
  }

  _stringToSpan(element: Element, splitString: string) {
    let newString = "";
    const stringArray = element.textContent?.split(splitString);

    stringArray?.forEach((string) => {
      newString += `<span>${string}${splitString}</span>`;
    });

    element.innerHTML = newString;
  }

  _calcDiagonal() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const diagonal = Math.sqrt(width ** 2 + height ** 2);
    return diagonal;
  }

  _setAnimation() {
    if (
      !this.tags ||
      !this.buildingTitle ||
      !this.buildingText ||
      !this.finalTitle
    )
      return;

    this.tags.forEach((v) => {
      this._stringToSpan(v, "");
    });
    this.buildingTitle.forEach((v) => {
      this._stringToSpan(v, "");
    });
    this.buildingText.forEach((v) => {
      this._stringToSpan(v, " ");
    });
    this._stringToSpan(this.finalTitle, "");
  }

  _startAnimation(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
      }
    });
  }

  _moveCircle(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.setProperty(
          "--diagonal",
          `${this._calcDiagonal()}px`
        );
      }
    });
  }

  _loopText() {
    if (!this.loopText) return;
    const { width } = this.loopText.getBoundingClientRect();
    this.loopText.style.setProperty("--offset-x", `${width}px`);
  }

  _onResize() {
    if (!this.circle) return;
    this.circle.style.setProperty("--diagonal", `${this._calcDiagonal()}px`);
    this._loopText();
  }

  init() {
    this._setAnimation();
    this.observer = this._setObserver(this._startAnimation, this.options);
    this.circleObserver = this._setObserver(this._moveCircle, this.options);

    this.tl
      .add(() => {
        (() => {
          this.loading && this.observer?.observe(this.loading);
        })();
      })
      .add(() => {
        (() => {
          this.circle && this.circleObserver?.observe(this.circle);
          this.sections?.forEach((section) => {
            this.observer?.observe(section);
          });
          this._loopText();
        })();
      }, "+=3.2")
      .add(() => {
        (() => this.loading && this.loading.classList.add("is-hidden"))();
      }, "+=1");
  }
}
