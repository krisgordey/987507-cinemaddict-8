import utils from './utils.js';
import mockData from './mock-data.js';
import {DescLimits, Rating, Year, Comments, Duration, MINUTES_IN_HOUR} from './constants.js';

/**
 * Перемешивает массив предложений и обрезает этот массив до рандомного количества предложений в заданном диапазоне
 * @param {array} sentences
 * @return {array}
 */
const generateRandomDescription = (sentences) => utils.makeShuffledArray(sentences).slice(0, utils.getRandomInRange(DescLimits.MIN, DescLimits.MAX));
const getDuration = (min, max) => {
  const duration = utils.getRandomInRange(min, max);
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  let minutes = duration % hours;
  return `${hours}h ${minutes > 9 ? minutes : `0` + minutes}m`;
};
/**
 * Создает обьект данных о фильме на основании полученных данных
 * @return {object}
 */
export default () => {
  return {
    title: utils.getRandomArrayElement(mockData.title),
    picture: utils.getRandomArrayElement(mockData.pictures),
    rating: utils.getRandomFloatInRange(Rating.MIN, Rating.MAX, Rating.FLOAT),
    year: utils.getRandomInRange(Year.MIN, Year.MAX),
    genre: utils.getRandomArrayElement(mockData.genres),
    src: utils.getRandomArrayElement(mockData.pictures),
    desc: generateRandomDescription(mockData.sentences),
    comments: utils.getRandomInRange(Comments.MIN, Comments.MAX),
    isWL: utils.getRandomBoolean(),
    isWTCHD: utils.getRandomBoolean(),
    isFAV: utils.getRandomBoolean(),
    duration: getDuration(Duration.MIN, Duration.MAX),
  };
};
