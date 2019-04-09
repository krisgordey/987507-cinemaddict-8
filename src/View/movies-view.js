import Component from "../helpers/component";
import Movie from "../Components/movie";
import MovieDetails from "../Components/movie-details";

const RENDER_STEP = 5;

export default class MoviesView extends Component {
  constructor() {
    super();
    this._movies = null;

    this._currentFilter = `all`;

    this._mainCardsContainer = null;
    this._mostCommentedCardsContainer = null;
    this._topRatedCardsContainer = null;

    this._renderedMainMovies = [];

    this._onShowMore = this._onShowMore.bind(this);
  }

  get _showMoreButtonTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  get template() {
    return `<section class="films">
      <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container films-list__container--main">
    </div>

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

  render() {
    super.render();

    this._mainCardsContainer = this._element.querySelector(`.films-list__container--main`);
    this._mostCommentedCardsContainer = this._element.querySelector(`.films-list__container--most-commented`);
    this._topRatedCardsContainer = this._element.querySelector(`.films-list__container--top-rated`);

    return this._element;
  }

  _processRenderingMainMovies() {
    let mainMoviesToRender;

    if (this._movies[this._currentFilter].length <= RENDER_STEP) {
      mainMoviesToRender = this._movies[this._currentFilter];
    } else {
      mainMoviesToRender = this._movies[this._currentFilter].slice(0, RENDER_STEP);
      this._mainCardsContainer.insertAdjacentHTML(`afterend`, this._showMoreButtonTemplate);
    }

    this._renderMovies(mainMoviesToRender, this._mainCardsContainer, true, true);
  }

  set movies(movies) {
    this._movies = movies;

    this._processRenderingMainMovies();
    this._renderMovies(this._movies.mostCommented, this._mostCommentedCardsContainer, false);
    this._renderMovies(this._movies.topRated, this._topRatedCardsContainer, false);
  }

  set onChangeWatched(fn) {
    this._onChangeWatched = fn;
  }
  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  _renderMovies(movies, container, controls = true, isMain = false) {
    const mainBody = document.querySelector(`body`);

    movies.forEach((movie, index) => {
      const filmComponent = new Movie(movie, controls);
      const filmDetailsComponent = new MovieDetails(movie);

      let isOpened = false;

      const filmElement = filmComponent.render();
      container.appendChild(filmElement);

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

      if (isMain) {
        this._renderedMainMovies.push({
          component: filmComponent,
          element: filmElement
        });
      }
    });
  }

  rerenderFilteredMovies(name) {
    if (name === this._currentFilter) {
      return;
    }

    this._currentFilter = name;

    for (const renderedMainMovie of this._renderedMainMovies) {
      this._mainCardsContainer.removeChild(renderedMainMovie.element);
      renderedMainMovie.component.unrender();
    }

    this._renderedMainMovies = [];

    const showMoreButton = this._element.querySelector(`.films-list__show-more`);
    if (showMoreButton) {
      showMoreButton.remove();
    }

    this._processRenderingMainMovies();
  }

  _onShowMore(evt) {
    if (!evt.target.classList.contains(`films-list__show-more`)) {
      return;
    }

    const currentRenderedLength = this._renderedMainMovies.length;
    const totalCategoryLength = this._movies[this._currentFilter].length;

    let moviesToRender;

    if (currentRenderedLength + RENDER_STEP < totalCategoryLength) {
      moviesToRender = this._movies[this._currentFilter].slice(currentRenderedLength, currentRenderedLength + RENDER_STEP);
    } else if (currentRenderedLength + RENDER_STEP >= totalCategoryLength) {
      moviesToRender = this._movies[this._currentFilter].slice(currentRenderedLength, totalCategoryLength);

      this._element.querySelector(`.films-list__show-more`).remove();
    }


    this._renderMovies(moviesToRender, this._mainCardsContainer, true, true);
  }

  addListeners() {
    this._element.addEventListener(`click`, this._onShowMore);
  }

  removeListeners() {
    this._element.removeEventListener(`click`, this._onShowMore);
  }
}

