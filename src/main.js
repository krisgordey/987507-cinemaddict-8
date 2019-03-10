import createNavItemMarkup from './create-nav-item.js';
import getMovies from './get-movies.js';
import {INITIAL_CARDS_LENGTH, INITIAL_CARDS_LENGTH_FILTER} from './constants.js';
import Film from './film.js';
import FilmDetails from './film-details.js';

const NAV_ITEMS_DATA = [
  {name: `All movies`},
  {name: `Watchlist`, count: 5},
  {name: `History`, count: 10},
  {name: `Favorites`, count: 7},
  {name: `Stats`}
];
const navItemsContainer = document.querySelector(`.main-navigation`);
const mainCardsContainer = document.querySelector(`.films-list__container--main`);
const mostCommentedCardsContainer = document.querySelector(`.films-list__container--most-commented`);
const topRatedCardsContainer = document.querySelector(`.films-list__container--top-rated`);
const mainBody = document.querySelector(`body`);
// Создаем разметку пунктов навигации и вставляем их в контейнер
navItemsContainer.innerHTML = NAV_ITEMS_DATA.map(createNavItemMarkup).join(``);

// Создаем разметку карточек и вставляем их в главный контейнер
const createMovie = (movie, container, controls = true) => {
  const filmComponent = new Film(movie, controls);
  const filmDetailsComponent = new FilmDetails(movie);

  container.appendChild(filmComponent.render());

  filmComponent.onOpen = () => {
    filmDetailsComponent.render();
    mainBody.appendChild(filmDetailsComponent.element);
  };

  filmDetailsComponent.onClose = () => {
    mainBody.removeChild(filmDetailsComponent.element);
    filmDetailsComponent.unrender();
  };
};

// Создаем разметку карточек и вставляем их в основной контейнер
getMovies(INITIAL_CARDS_LENGTH).forEach((movie) => {
  createMovie(movie, mainCardsContainer);
});

// Создаем разметку карточек и вставляем их в Most commented контейнер
getMovies(INITIAL_CARDS_LENGTH_FILTER).forEach((movie) => {
  createMovie(movie, mostCommentedCardsContainer, false);
});

// Создаем разметку карточек и вставляем их в Top rated контейнер
getMovies(INITIAL_CARDS_LENGTH_FILTER).forEach((movie) => {
  createMovie(movie, topRatedCardsContainer, false);
});
