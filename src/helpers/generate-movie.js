import utils from './utils.js';
import {DescLimits, Rating, Year, Comments, Duration, MINUTES_IN_HOUR, PATH_TO_IMG} from './constants.js';
import {UserRating, GENRES_LIMIT} from "./constants";


const mockData = {
  title: [
    `Аквамен`,
    `Апгрейд`,
    `Хищник`,
    `Властелин колец`,
    `Веном`,
    `Мстители`,
    `Интерстеллар`,
    `Хоббит`,
    `Звездные войны`,
    `Начало`,
    `Щерлок`,
    `Зеленая миля`,
    `Великий Гетсби`,
    `Планета обезьян`,
    `Тор`,
  ],
  pictures: [
    `${PATH_TO_IMG}accused.jpg`,
    `${PATH_TO_IMG}blackmail.jpg`,
    `${PATH_TO_IMG}blue-blazes.jpg`,
    `${PATH_TO_IMG}fuga-da-new-york.jpg`,
    `${PATH_TO_IMG}moonrise.jpg`,
    `${PATH_TO_IMG}three-friends.jpg`,
  ],
  sentences: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ],
  genres: [
    `Comedy`,
    `Drama`,
    `Horror`,
    `Thriller`,
    `Action`,
    `Fantasy`
  ],
};
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
  watchlist: false,
  watched: false,
  isFavorite: false,
  duration: getDuration(Duration.MIN, Duration.MAX),
});
