export const PATH_TO_IMG = `./images/posters/`;
export const MINUTES_IN_HOUR = 60;

export const INITIAL_CARDS_LENGTH = 7;
export const INITIAL_CARDS_LENGTH_FILTER = 2;

export const GENRES_LIMIT = 3;
export const Keycodes = {
  ENTER: 13,
  ESCAPE: 27,
};
/**
 * Диапазон для генерации количества предложений в описании
 * @type {{MIN: number, MAX: number}}
 */
export const DescLimits = {
  MAX: 4,
  MIN: 1,
};

/**
 * Диапазон для рейтинга фильма и количество цифр после запятой
 * @type {{FLOAT: number, MIN: number, MAX: number}}
 */
export const Rating = {
  MIN: 0,
  MAX: 10,
  FLOAT: 1
};

/**
 * Диапазон пользовательского рейтинга
 * @type {{MIN: number, MAX: number}}
 */
export const UserRating = {
  MIN: 1,
  MAX: 9,
};

/**
 * Диапазон для года выхода фильма
 * @type {{MIN: number, MAX: number}}
 */
export const Year = {
  MIN: 2000,
  MAX: 2018
};

/**
 * Диапазон для рандомного количества комментариев
 * @type {{MIN: number, MAX: number}}
 */
export const Comments = {
  MIN: 0,
  MAX: 30,
};

/**
 * Диапазон для рандомной продолжительности фильма
 * @type {{MIN: number, MAX: number}}
 */
export const Duration = {
  MIN: 70,
  MAX: 180,
};

/**
 * Диапазон для рандомного количества карточек фильмов
 * @type {{MIN: number, MAX: number}}
 */
export const RandomRange = {
  MIN: 1,
  MAX: 7
};

export const USER_NAME = `Grand Pekingese 3000`;
