const getWord = async (page, level) => {
  try {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

const getImage = async (src) => {
  try {
    const url = `https://raw.githubusercontent.com/iralitv/rslang-data/master/data/${src}`;
    const res = await fetch(url);
    const imgBlob = await res.blob();
    const objectURL = await URL.createObjectURL(imgBlob);
    return objectURL;
  } catch (e) {
    console.log(e)
  }
};

const getTranslation = async (engWord) => {
  try {
    const API_KEY = 'trnsl.1.1.20200424T060744Z.2252b23703addec2.e0bbc25dbcd8eb6b4f823d9a15c8c99ee6e03aeb';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${engWord}&lang=en-ru`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e)
  }
};

export {
  getWord,
  getImage,
  getTranslation,
}