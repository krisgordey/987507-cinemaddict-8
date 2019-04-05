import Component from "../helpers/component";
import Film from "../Components/film";
import FilmDetails from "../Components/film-details";
import utils from "../helpers/utils";

export default class FilmsView extends Component {
  constructor(movies, mostCommentedMovies, topRatedMovies) {
    super();
    this._movies = movies;
    this._mostCommentedMovies = mostCommentedMovies;
    this._topRatedMovies = topRatedMovies;
  }

  get template() {
    return `<section class="films">
      <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container films-list__container--main">
      </div>

      <button class="films-list__show-more">Show more</button>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container films-list__container--top-rated">
      </div>
      </section>

      <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container films-list__container--most-commented">
      </div>
      </section>
      </section>`;
  }

  set onChangeWatched(fn) {
    this._onChangeWatched = fn;
  }
  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  render() {
    this.initState();
    this._element = utils.createElement(this.template);
    this.addListeners();

    const mainCardsContainer = this._element.querySelector(`.films-list__container--main`);
    const mostCommentedCardsContainer = this._element.querySelector(`.films-list__container--most-commented`);
    const topRatedCardsContainer = this._element.querySelector(`.films-list__container--top-rated`);

    this._renderMovies(this._movies, mainCardsContainer);
    this._renderMovies(this._mostCommentedMovies, mostCommentedCardsContainer, false);
    this._renderMovies(this._topRatedMovies, topRatedCardsContainer, false);

    return this._element;
  }

  _renderMovies(movies, container, controls = true) {
    const mainBody = document.querySelector(`body`);

    movies.forEach((movie, index) => {
      const filmComponent = new Film(movie, controls);
      const filmDetailsComponent = new FilmDetails(movie);
      let isOpened = false;
      container.appendChild(filmComponent.render());

      filmComponent.onOpen = () => {
        if (!isOpened) {
          filmDetailsComponent.render();
          mainBody.appendChild(filmDetailsComponent.element);
          isOpened = true;
        }
      };

      filmDetailsComponent.onClose = () => {
        mainBody.removeChild(filmDetailsComponent.element);
        filmDetailsComponent.unrender();
        isOpened = false;
      };
      filmDetailsComponent.onChangeWatched = (status) => {
        this._onChangeWatched(index, status);
      };
      filmDetailsComponent.onAddToWatchList = (status) => {
        this._onAddToWatchList(index, status);
      };
    });
  }
}

