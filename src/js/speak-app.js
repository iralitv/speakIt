import {buildWord, builtHtmlElement} from "./templateHelper";
import {
  activeItem, activeMicrophone,
  getRandNumber,
  playAudio,
  resetRecognition,
  resetTranslation, setDefaultImage
} from "./helpers";
import recogniseSpeech from "./speechRecognition";
import { getImage, getTranslation, getWord } from "./api-requests";

const chooseLevel = (event) => {
  if(!event.target.classList.contains('level__label')) {
    return;
  }

  localStorage.setItem('level', event.target.innerText);
  const currentLevel = localStorage.getItem('level') || 0;

  resetTranslation();
  resetRecognition();
  setDefaultImage();

  getWord(getRandNumber(30), currentLevel)
    .then(data => fillWords(data.slice(0, 10)));

};

const fillWords = (items) => {
  const wordContainer = document.querySelector('.items');
  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const word = buildWord(item);
    fragment.appendChild(word);
  });

  wordContainer.innerHTML = '';
  wordContainer.appendChild(fragment);
};

const selectWord = (event) => {
  const wordContainer = event.target.closest('.item');

  if (!wordContainer) {
    return;
  }

  const words = document.querySelector('.items').children;
  activeItem(wordContainer, words);

  const wordImage = document.querySelector('.word__img');
  const wordTranslation = document.querySelector('.word__translation');

  const imageSrc = wordContainer.getAttribute('data-image-src');
  const audioSrc = wordContainer.getAttribute('data-audio-src');
  const engWord = wordContainer.getAttribute('data-word');

  playAudio(`https://raw.githubusercontent.com/iralitv/rslang-data/master/data/${audioSrc}`);
  getImage(imageSrc).then(url => wordImage.src = url);
  resetRecognition();
  getTranslation(engWord).then(data => wordTranslation.textContent = data.text)
};

const restartGame = (event) => {
  document.querySelectorAll('.item').forEach(item => {
    item.classList.remove('item--correct');
  });

  event.target.classList.add('restart--active');
  activeMicrophone(false);
  resetTranslation();
  setDefaultImage();
};

const resultGame = () => {
  const wordsClone = document.querySelector('.items').cloneNode(true);
  const words = wordsClone.children;
  const correctContainer = document.querySelector('.correct__items');
  const errorContainer = document.querySelector('.error__items');

  const correctCount = document.querySelector('.correct__count');
  const errorCount = document.querySelector('.error__count');

  const correctFragment = document.createDocumentFragment();
  const errorFragment = document.createDocumentFragment();

  Array.from(words).forEach(word => {
    const translation = builtHtmlElement({
      tagName: "p",
      classList: ['item__translation'],
    });
    const engWord = word.getAttribute('data-word');
    getTranslation(engWord).then(res => translation.textContent = res.text);
    word.appendChild(translation);

    if (word.classList.contains('item--correct')) {
      correctFragment.appendChild(word);
    } else {
      errorFragment.appendChild(word);
    }
  });

  correctCount.innerText = correctFragment.children.length || 0;
  errorCount.innerText = errorFragment.children.length || 0;

  correctContainer.innerHTML = '';
  errorContainer.innerHTML = '';

  correctContainer.appendChild(correctFragment);
  errorContainer.appendChild(errorFragment);
};

const manageGame = (event) => {
  if (event.target.classList.contains('btn__speak')) {
    recogniseSpeech();
    activeMicrophone(true);
  } else if (event.target.classList.contains('btn__restart')) {
    restartGame(event);
  } else if (event.target.classList.contains('btn__results')) {
    document.querySelector('.results').classList.remove('visually-hidden');
    resultGame();
  }
};

const manageResultTable = (event) => {
  const item = event.target.closest('.item');
  if (item) {
    const audioSrc = item.getAttribute('data-audio-src');
    playAudio(`https://raw.githubusercontent.com/iralitv/rslang-data/master/data/${audioSrc}`);
  } else if (event.target.classList.contains('btn__return')) {
    event.preventDefault();
    document.querySelector('.results').classList.add('visually-hidden');
  }
};

const startGame = () => {
  document.querySelector('.intro').classList.add('visually-hidden');
  setDefaultImage();
  getWord(getRandNumber(30), 0)
    .then(data => fillWords(data.slice(0, 10)));
};

document.querySelector('.level').addEventListener('mousedown', (e) => chooseLevel(e));

document.querySelector('.word').addEventListener('mousedown', (e) => selectWord(e));

document.querySelector('.btns').addEventListener('click', (e) => manageGame(e));

document.querySelector('.btn__intro').addEventListener('click', startGame);

document.querySelector('.results__table').addEventListener('click', (e) => manageResultTable(e));
