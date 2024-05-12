export class Animation {
  topTitle: Element | null

  constructor() {
    this.topTitle = document.querySelector('.top__title h2');
  }

  _stringToSpan(element: Element) {
    let newString = "";
    const stringArray = element.textContent?.split('');
    
    stringArray?.forEach((string) => {
      newString += `<span>${string}</span>`
    });

    element.innerHTML = newString
  }

  _topAnimation() {
    if(!this.topTitle) return;
    this._stringToSpan(this.topTitle)
  }

  init() {
    this._topAnimation()
  }

}