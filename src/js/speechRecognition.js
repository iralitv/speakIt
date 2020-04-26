import { resetRecognition } from "./helpers";

const recogniseSpeech = () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognitionInput = document.querySelector('.word__recognition');

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    recognitionInput.textContent = transcript;

    const words = document.querySelectorAll('.item__word');
    words.forEach(word => {
      const text = word.textContent.toLowerCase();
      if (transcript.toLowerCase().includes(text)) {
        word.closest('.item').classList.add('item--correct');
      }
    });

  });

  recognition.addEventListener('end', () => {
    const restartBtn = document.querySelector('.btn__restart');
    if (restartBtn.classList.contains('restart--active')) {
      recognition.abort();
      restartBtn.classList.remove('restart--active');
      resetRecognition();
    } else {
      recognition.start();
    }
  });

  recognition.start();
};

export default recogniseSpeech;