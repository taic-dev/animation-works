import gsap from "gsap";
import { Particle } from "./particle";

export class Animation {
  timeLine: gsap.core.Timeline;
  particle: Particle;
  speed: number;

  loadingTitle: HTMLElement | null

  constructor() {
    this.particle = new Particle();
    this.timeLine = gsap.timeline();
    this.speed = 1;

    this.loadingTitle = document.querySelector('.loading__title');
  }

  init() {
    const { canvas, ctx } = this.particle.init();
    this.particle.set();
    this.particle.render({ canvas, ctx }, this.speed);
  }

  _setObserver(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit | undefined
  ) {
    return new IntersectionObserver(callback, options);
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
