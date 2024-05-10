export const handleAutoplayTimeLeft = (s: any, time: number, progress: number) => {
  const elem = document.querySelector(".time-circle.is-focus") as HTMLElement;
  elem.style.setProperty('--progress', String(1 - progress));
};