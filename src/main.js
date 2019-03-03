import createNavItemMarkup from './create-nav-item.js';
import createCard from './create-card.js';
import getMovies from './get-movies.js';

const INITIAL_CARDS_LENGTH = 7;
const INITIAL_CARDS_LENGTH_FILTER = 2;
const NAV_ITEMS_DATA = [
  {name: `All movies`},
  {name: `Watchlist`, count: 5},
  {name: `History`, count: 10},
  {name: `Favorites`, count: 7},
  {name: `Stats`}
];
const RandomRange = {
  MIN: 1,
  MAX: 7
};
const makeRandomCount = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

const navItemsContainer = document.querySelector(`.main-navigation`);
const mainCardsContainer = document.querySelector(`.films-list__container--main`);
const mostCommentedCardsContainer = document.querySelector(`.films-list__container--most-commented`);
const topRatedCardsContainer = document.querySelector(`.films-list__container--top-rated`);

// Создаем разметку пунктов навигации и вставляем их в контейнер
const navItemDataString = NAV_ITEMS_DATA.map(createNavItemMarkup).join(``);
navItemsContainer.innerHTML = navItemDataString;


// Создаем разметку карточек и вставляем их в главный контейнер
const cardsMarkupString = getMovies(INITIAL_CARDS_LENGTH).map((item) => createCard(item)).join(``);
mainCardsContainer.innerHTML = cardsMarkupString;


// Создаем разметку карточек и вставляем их в Most commented контейнер
const mostCommentedCardsMarkupString = getMovies(INITIAL_CARDS_LENGTH_FILTER).map((item) => createCard(item, true)).join(``);
mostCommentedCardsContainer.innerHTML = mostCommentedCardsMarkupString;


// Создаем разметку карточек и вставляем их в Top rated контейнер
const topRatedCardsMarkupString = getMovies(INITIAL_CARDS_LENGTH_FILTER).map((item) => createCard(item, true)).join(``);
topRatedCardsContainer.innerHTML = topRatedCardsMarkupString;

// По клику на кнопки навигации генерируем случайное количество карточек в главный контейнер и вставляем их в разметку
navItemsContainer.addEventListener(`click`, function (event) {
  if (event.target.classList.contains(`main-navigation__item`)) {
    const newcardsMarkupString = getMovies(makeRandomCount(RandomRange.MIN, RandomRange.MAX)).map((item) => createCard(item)).join(``);
    mainCardsContainer.innerHTML = newcardsMarkupString;
  }
});


