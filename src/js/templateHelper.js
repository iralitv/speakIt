const builtHtmlElement = ({ tagName, classList = [], attrs = {} }) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(...classList);
  Object.keys(attrs).forEach((key) => newElement.setAttribute(key, attrs[key]));
  return newElement;
};

const buildWord = (item) => {
  const word = builtHtmlElement({
    tagName: 'div',
    classList: ['item'],
    attrs: {
      "data-image-src": item.image.slice(6),
      "data-audio-src": item.audio.slice(6),
      "data-word": item.word,
    }
  });
  word.innerHTML = `
      <img class="item__icon" src="../src/img/sound.svg" alt="">
      <p class="item__word">${item.word}</p>
      <p class="item__transcription">${item.transcription}</p>
  `;
  return word;
};

export { builtHtmlElement, buildWord };