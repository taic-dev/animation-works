export class Animation {
  topTitle: Element | null;
  topText: Element | null;

  constructor() {
    this.topTitle = document.querySelector(".top__title h2");
    this.topText = document.querySelector(".top__text p");
  }

  _stringToSpan(element: Element, splitString: string) {
    let newString = "";
    const stringArray = element.textContent?.split(splitString);

    stringArray?.forEach((string) => {
      newString += `<span>${string}${splitString}</span>`;
    });

    element.innerHTML = newString;
  }

  _topAnimation() {
    if (!this.topTitle || !this.topText) return;

    this._stringToSpan(this.topTitle, "");
    this._stringToSpan(this.topText, " ");
  }

  init() {
    this._topAnimation();
  }
}
