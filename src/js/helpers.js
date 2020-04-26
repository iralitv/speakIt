import {getImage} from "./api-requests";

const getRandNumber = (max) => Math.floor(Math.random() * max);

const playAudio = (url) => new Audio(url).play();

const activeItem = (currentItem, items) => {
  Array.from(items).forEach(item => item.classList.remove('item--active'));
  currentItem.classList.add('item--active');
};

const resetTranslation = () => {
  document.querySelector('.word__translation').textContent = '';
};

const resetRecognition = () => {
  document.querySelector('.word__recognition').textContent = '';
};

const activeMicrophone = (isActive) => {
  const microphone = document.querySelector('.word__recognition');
  microphone.classList.toggle('microphone--active', isActive);
}

const setDefaultImage = () => {
  const wordImage = document.querySelector('.word__img');
  getImage('Learn-English.jpg')
    .then(url => wordImage.src = url);
};

export {
  getRandNumber,
  playAudio,
  activeItem,
  resetTranslation,
  resetRecognition,
  setDefaultImage,
  activeMicrophone,
}
