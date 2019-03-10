import utils from './utils.js';
import mockData from './mock-data.js';
import {DescLimits, Rating, Year, Comments, Duration, MINUTES_IN_HOUR} from './constants.js';
import {UserRating, GENRES_LIMIT} from "./constants";

/**
 * Перемешивает массив предложений и обрезает этот массив до рандомного количества предложений в заданном диапазоне
 * @param {array} sentences массив предложений
 * @return {array} массив с рандомным количеством предложений
 */
const generateRandomDescription = (sentences) => utils.makeShuffledArray(sentences).slice(0, utils.getRandomInRange(DescLimits.MIN, DescLimits.MAX));

/**
 * Создает длительность фильма
 * @param {number} min
 * @param {number} max
 * @return {string} строка с полученными значениями часов и минут
 */
const getDuration = (min, max) => {
  const duration = utils.getRandomInRange(min, max);
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  let minutes = duration % hours;
  return `${hours}h ${minutes > 9 ? minutes : `0` + minutes}m`;
};

const getUserRating = () => {
  const isRated = utils.getRandomBoolean();
  return isRated ? utils.getRandomInRange(UserRating.MIN, UserRating.MAX) : null;
};

/**
 * Создает обьект данных о фильме на основании полученных данных
 * @return {object}
 */
export default () => ({
  title: utils.getRandomArrayElement(mockData.title),
  picture: utils.getRandomArrayElement(mockData.pictures),
  userRating: getUserRating(),
  rating: utils.getRandomFloatInRange(Rating.MIN, Rating.MAX, Rating.FLOAT),
  year: utils.getRandomInRange(Year.MIN, Year.MAX),
  genre: utils.getRandomShuffledElements(mockData.genres, GENRES_LIMIT),
  desc: generateRandomDescription(mockData.sentences),
  comments: utils.getRandomInRange(Comments.MIN, Comments.MAX),
  isObservation: utils.getRandomBoolean(),
  isWatch: utils.getRandomBoolean(),
  isFavorite: utils.getRandomBoolean(),
  duration: getDuration(Duration.MIN, Duration.MAX),
});
