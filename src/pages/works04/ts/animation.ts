const contents = [...document.querySelectorAll('.content')];

const options = {
  root: document.querySelector(".body"),
  rootMargin: "center",
  threshold: 1.0,
}

function addClassIsActive (entries: IntersectionObserverEntry[]) {
  entries.forEach( (entry) => {
    if(entry.isIntersecting) {
      console.log(entry)
      entry.target.classList.add('is-active');
    }
  });
}

const observer = new IntersectionObserver(addClassIsActive);
contents.forEach((element) => observer.observe(element)) 