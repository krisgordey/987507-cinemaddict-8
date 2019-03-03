export default {
  getRandomBoolean: () => Math.random() >= 0.5,
  getRandomArrayElement: (myArray) => myArray[Math.floor(Math.random() * myArray.length)],
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
  getRandomInRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  getRandomFloatInRange: (min, max, float) => {
    const random = Number((Math.random() * (max - min + 1)).toFixed(float));
    return random > max ? Math.floor(random) : random;
  }
};
