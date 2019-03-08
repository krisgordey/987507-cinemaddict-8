export default {
  /**
   * @return {boolean}
   */
  getRandomBoolean: () => Math.random() >= 0.5,
  /**
   * Генерирует рандомное число в заданном диапазоне
   * @param {number} max
   * @param {number} min
   * @return {number}
   */
  makeRandomCount: (max, min) => Math.floor(Math.random() * (max - min + 1)) + min,
  /**
   * Возвращает рандомный элемент массива
   * @param {array} myArray
   * @return {*}
   */
  getRandomArrayElement: (myArray) => myArray[Math.floor(Math.random() * myArray.length)],
  /**
   * Перемешивает элементы в массиве
   * @param {array} arr
   * @return {array}
   */
  makeShuffledArray: (arr) => {
    const newArr = [...arr];
    let j;
    let temp;
    for (let i = newArr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArr[j];
      newArr[j] = newArr[i];
      newArr[i] = temp;
    }
    return newArr;
  },
  /**
   * Генерирует рандомное число в заданном диапазоне
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  getRandomInRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

  /**
   * Генерирует рандомное число в заданном диапазоне и обрезает его до одной цифры после запятой
   * @param {number} min
   * @param {number} max
   * @param {number} float количество цифр после запятой
   * @return {number}
   */
  getRandomFloatInRange: (min, max, float) => {
    const random = Number((Math.random() * (max - min + 1)).toFixed(float));
    return random > max ? Math.floor(random) : random;
  },

  createElement: (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  },
};
