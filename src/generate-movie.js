import utils from './utils.js';

const DescLimits = {
  MAX: 4,
  MIN: 1,
};
const PATH_TO_IMG = `../images/posters/`;
const Rating = {
  MIN: 0,
  MAX: 10,
  FLOAT: 1
};
const Year = {
  MIN: 2000,
  MAX: 2018
};
const Comments = {
  MIN: 0,
  MAX: 30,
};
const Duration = {
  MIN: 1800000,
  MAX: 10800000,
};

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
  sentences: new Set([
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
  ]),
  genres: [
    `Comedy`,
    `Drama`,
    `Horror`,
    `Thriller`,
    `Action`,
    `Fantasy`
  ],

};

const generateRandomDescription = (set) => utils.makeShuffledArray([...set]).slice(0, utils.getRandomInRange(DescLimits.MIN, DescLimits.MAX));
const getDuration = (min, max) => {
  const duration = new Date(utils.getRandomInRange(min, max));
  const hours = duration.getUTCHours();
  let minutes = duration.getMinutes();
  if (minutes < 10) {
    minutes = `0` + minutes;
  }
  return `${hours}h ${minutes}m`;
};

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
