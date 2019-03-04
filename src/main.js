import createNavItemMarkup from './create-nav-item.js';
import createCard from './create-card.js';
import getMovies from './get-movies.js';
import {RandomRange, INITIAL_CARDS_LENGTH, INITIAL_CARDS_LENGTH_FILTER} from './constants.js';

const NAV_ITEMS_DATA = [
  {name: `All movies`},
  {name: `Watchlist`, count: 5},
  {name: `History`, count: 10},
  {name: `Favorites`, count: 7},
  {name: `Stats`}
];
/**
 * Генерирует рандомное число в заданном диапазоне
 * @param {number} max
 * @param {number} min
 * @return {number}
 */
const makeRandomCount = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

const navItemsContainer = document.querySelector(`.main-navigation`);
const mainCardsContainer = document.querySelector(`.films-list__container--main`);
const mostCommentedCardsContainer = document.querySelector(`.films-list__container--most-commented`);
const topRatedCardsContainer = document.querySelector(`.films-list__container--top-rated`);

// Создаем разметку пунктов навигации и вставляем их в контейнер
navItemsContainer.innerHTML = NAV_ITEMS_DATA.map(createNavItemMarkup).join(``);

// Создаем разметку карточек и вставляем их в главный контейнер
const cardsMarkup = getMovies(INITIAL_CARDS_LENGTH).map((item) => createCard(item)).join(``);
mainCardsContainer.innerHTML = cardsMarkup;

// Создаем разметку карточек и вставляем их в Most commented контейнер
const mostCommentedCardsMarkup = getMovies(INITIAL_CARDS_LENGTH_FILTER).map((item) => createCard(item, true)).join(``);
mostCommentedCardsContainer.innerHTML = mostCommentedCardsMarkup;

// Создаем разметку карточек и вставляем их в Top rated контейнер
const topRatedCardsMarkup = getMovies(INITIAL_CARDS_LENGTH_FILTER).map((item) => createCard(item, true)).join(``);
topRatedCardsContainer.innerHTML = topRatedCardsMarkup;

/**
 * По клику на кнопки навигации генерируем случайное количество карточек и вставляем их в разметку главного контейнера
 * @param {type} тип события
 * @param {function} event listener
 */
navItemsContainer.addEventListener(`click`, function (event) {
  if (event.target.classList.contains(`main-navigation__item`)) {
    const newcardsMarkup = getMovies(makeRandomCount(RandomRange.MIN, RandomRange.MAX)).map((item) => createCard(item)).join(``);
    mainCardsContainer.innerHTML = newcardsMarkup;
  }
});


