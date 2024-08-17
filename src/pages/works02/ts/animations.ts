import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { splitSpanString } from "./utils";
import { Particle } from "./particle";
import { IS_LOADING } from "./constants";

window.addEventListener("load", () => {
  const loadingTitle = document.querySelector(".loading__title");
  const fvCircle = document.querySelector(".fv__circle");
  const missionCircle = document.querySelector(".mission__circle");
  const fvTitleBlock = document.querySelectorAll(".fv__title-block");
  const missionTitle = document.querySelector(".mission__title");
  const missionText = document.querySelector(".mission__text");
  const sectionTitle = document.querySelectorAll(".section__title");
  const sliderList = document.querySelector(".slider__list");
  const sliderItemImg = document.querySelectorAll(".slider__item-block img");
  const technologyCircle = document.querySelectorAll(".technology__circle");
  const technologyImage = document.querySelectorAll(".technology__image");
  const technologyTitle = document.querySelectorAll(".technology__title");
  const technologyText = document.querySelectorAll(".technology__text");
  const contactText = document.querySelector(".contact__text");
  const footerText = document.querySelectorAll(".footer__title");

  gsap.registerPlugin(ScrollTrigger);

  function addClassIsActive() {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        }
      });
    };

    if (
      !missionTitle ||
      !missionText ||
      !missionCircle ||
      !sliderList ||
      !contactText
    )
      return;
    const observer = new IntersectionObserver(callback);
    fvTitleBlock.forEach((v) => observer.observe(v));
    sectionTitle.forEach((v) => observer.observe(v));
    technologyImage.forEach((v) => observer.observe(v));
    technologyCircle.forEach((v) => observer.observe(v));
    technologyTitle.forEach((v) => observer.observe(v));
    technologyText.forEach((v) => {
      observer.observe(v);
      spanWrappedText(v);
    });
    footerText.forEach((v) => observer.observe(v));
    observer.observe(missionTitle);
    observer.observe(missionText);
    observer.observe(missionCircle);
    observer.observe(sliderList);
    observer.observe(contactText);
  }
  addClassIsActive();

  function loadingAnimation() {
    if (!IS_LOADING) {
      loadingTitle?.classList.add("is-hidden");
      return;
    }

    sessionStorage.setItem("isLoading", "true");
    loadingTitle?.classList.add("is-active");
  }
  loadingAnimation();

  function fvAnimation() {
    if (IS_LOADING) {
      const classArray = ["is-active", "is-loading"];
      fvTitleBlock.forEach((v) => v.classList.add(...classArray));
      fvCircle?.classList.add(...classArray);
    } else {
      fvTitleBlock.forEach((v) => {
        v.classList.add("is-active");
      });
      fvCircle?.classList.add("is-active");
    }
  }
  fvAnimation();

  function particle() {
    const particle = new Particle();
    const { canvas, ctx } = particle.init();
    particle.set();
    particle.render({ canvas, ctx });
    const delay = IS_LOADING ? 4.5 : 0;

    gsap.to(particle, {
      alpha: 0.5,
      duration: 1,
      delay,
      ease: "power2.inOut",
    });
  }
  particle();

  function spanWrappedText(element: Element | null) {
    if (!element) return;
    const processingString = splitSpanString(element, " ");
    element.innerHTML = `<p>${processingString}</p>`;
  }
  spanWrappedText(missionText);
  spanWrappedText(contactText);

  function scrollParallax(element: Element, className: string) {
    gsap.fromTo(
      element,
      { yPercent: 0 },
      {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: `.${className}`,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }
  sliderItemImg.forEach((v) => scrollParallax(v, "slider"));

  function MouseStalker() {
    const contact: HTMLElement | null = document.querySelector(".contact");
    const contactCircle: HTMLElement | null =
      document.querySelector(".contact__circle");

    if (!contact || !contactCircle) return;

    contact.addEventListener("mouseover", (e: MouseEvent) => {
      e.stopPropagation();
      contactCircle?.classList.add("is-active");
    });
    contact.addEventListener("mouseout", (e: MouseEvent) => {
      e.stopPropagation();
      contactCircle?.classList.remove("is-active");
    });

    contact.addEventListener("mousemove", (e: MouseEvent) => {
      e.stopPropagation();

      gsap.to(contactCircle, {
        duration: 1.2,
        ease: "power2.out",
        x: e.offsetX,
        y: e.offsetY,
      });
    });
  }
  MouseStalker();
});
