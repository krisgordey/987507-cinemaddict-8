import renderNavItemMarkup from './render-nav-item.js';
import renderCardMarkup from './render-card.js';

const INITIAL_CARDS_LENGTH = 7;
const INITIAL_CARDS_LENGTH_FILTER= 2;
const NAV_ITEMS_DATA = [
  {name: `all`},
  {name: `watchlist`, count: 5},
  {name: `history`, count: 10},
  {name: `favorites`, count: 7},
  {name: `stats`}
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
const navItemDataString = NAV_ITEMS_DATA.map(renderNavItemMarkup).join(``);
navItemsContainer.innerHTML = navItemDataString;


// Создаем разметку карточек и вставляем их в главный контейнер
const fakeCardsData = new Array(INITIAL_CARDS_LENGTH).fill({
  showControls: true,
  description: `A priests Romania and confront a malevolent force in the form of a demonic nun.`,
});
const cardsMarkupString = fakeCardsData.map(renderCardMarkup).join(``);
mainCardsContainer.innerHTML = cardsMarkupString;


// Создаем разметку карточек и вставляем их в Most commented контейнер
const fakeMostCommentedCardsData = new Array(INITIAL_CARDS_LENGTH_FILTER).fill({});
const mostCommentedCardsMarkupString = fakeMostCommentedCardsData.map(renderCardMarkup).join(``);
mostCommentedCardsContainer.innerHTML = mostCommentedCardsMarkupString;


// Создаем разметку карточек и вставляем их в Top rated контейнер
const fakeTopRatedCardsData = new Array(INITIAL_CARDS_LENGTH_FILTER).fill({});
const topRatedCardsMarkupString = fakeTopRatedCardsData.map(renderCardMarkup).join(``);
topRatedCardsContainer.innerHTML = topRatedCardsMarkupString;

navItemsContainer.addEventListener(`click`, function (event) {
  if (event.target.classList.contains(`main-navigation__item`)) {
    const newFakeCardsData = new Array(makeRandomCount(RandomRange.MIN, RandomRange.MAX)).fill({});

    const newcardsMarkupString = newFakeCardsData.map(renderCardMarkup).join(``);
    mainCardsContainer.innerHTML = newcardsMarkupString;
  }
});


