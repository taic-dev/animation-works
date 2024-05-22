export const splitSpanString = (element: HTMLElement | null, splitString: string) => {
  let newString = "";
  const stringArray = element.textContent?.split(splitString);

  stringArray?.forEach((string) => {
    newString += `<span>${string}${splitString}</span>`;
  });

  return newString;
};
