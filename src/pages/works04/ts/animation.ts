import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const wrappers = [...document.querySelectorAll(".wrapper")];
const contents = [...document.querySelectorAll(".content")];
const stickyImgs = [...document.querySelectorAll(".sticky-img")];

// const options = {
//   root: document.querySelector(".body"),
//   rootMargin: "center",
//   threshold: 1.0,
// };

function addClassIsActive(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-active");
    }
  });
}

const observer = new IntersectionObserver(addClassIsActive);
contents.forEach((element) => observer.observe(element));
wrappers.forEach((element) => observer.observe(element));
stickyImgs.forEach((element) => observer.observe(element));

const container = document.querySelector<HTMLElement>(".slider");
const sliderWrapper = document.querySelector<HTMLElement>(".slider-inner");
// const sliderList = document.querySelector<HTMLElement>(".slider-list");
const sliderItems = document.querySelectorAll<HTMLElement>(".slider-item");

const totalWidth = Array.from(sliderItems).reduce((acc, item) => acc + item.offsetWidth, 0);

if(sliderWrapper) {
  gsap.to(sliderItems, {
    // xPercent: -100 * (sliderItems.length - 1),
    x: () => -(totalWidth - sliderWrapper.offsetWidth),
    ease: "Power0.easeNone",
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      pin: true,
      scrub: true,
      markers: true,
      // end: () => `+=${sliderWrapper?.offsetWidth * 3}`,
      end: () => `+=${totalWidth - sliderWrapper.offsetWidth}`,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

