import gsap from "gsap";
import { Particle } from "./particle";
import { splitSpanString } from "./utils";

export class Animation {
  observer: IntersectionObserver | undefined;
  options: IntersectionObserverInit | undefined;
  timeLine: gsap.core.Timeline;
  particle: Particle;
  speed: number;

  loadingTitle: HTMLElement | null
  fvTitleBlock: HTMLElement[] | null
  missionTitle: HTMLElement | null
  missionText: HTMLElement | null
  missionTextString: string | null
  sectionTitle: HTMLElement[] | null
  sliderList: HTMLElement | null

  constructor() {
    this.options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    this.particle = new Particle();
    this.timeLine = gsap.timeline();
    this.speed = 1;

    this.loadingTitle = document.querySelector('.loading__title');
    this.fvTitleBlock = [...document.querySelectorAll('.fv__title-block')];
    this.missionTitle = document.querySelector('.mission__title');
    this.missionText = document.querySelector('.mission__text')
    this.sectionTitle = [...document.querySelectorAll('.section__title')];
    this.sliderList = document.querySelector('.slider__list');
    
  }

  init() {
    const { canvas, ctx } = this.particle.init();
    this.particle.set();
    this.particle.render({ canvas, ctx }, this.speed);

    
    this._setAnimation();
    this.observer = this._setObserver(this._startAnimation, this.options);

    this.fvTitleBlock.forEach((v) => {
      this.observer?.observe(v)
    })
    this.sectionTitle.forEach((v) => {
      this.observer?.observe(v)
    })
    this.observer?.observe(this.missionTitle)
    this.observer?.observe(this.missionText)
    this.observer?.observe(this.sliderList)
  }

  _setObserver(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit | undefined
  ) {
    return new IntersectionObserver(callback, options);
  }

  _setAnimation() {
    this.missionTextString = splitSpanString(this.missionText, ' ')
    document.querySelector('.mission__text').innerHTML = `<p>${this.missionTextString}</p>`
  }

  _startAnimation(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
      }
    });
  }

  _loading() {
    this.loadingTitle.classList.add('is-active');

    this.timeLine
      .add(() => {
        this.speed = 100;
      })
      .add(() => {

        this.speed = 1;
      });
  }
}
