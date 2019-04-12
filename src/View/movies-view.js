import Component from "../helpers/component";
import Movie from "../Components/movie";
import MovieDetails from "../Components/movie-details";

const RENDER_STEP = 5;

export default class MoviesView extends Component {
  constructor() {
    super();
    this._movies = null;

    this._currentFilter = `all`;
    this._countOfMoviesToRender = RENDER_STEP;

    this._isWasFirstRender = false;
    this._showMoreButton = null;

    this._mainCardsContainer = null;
    this._mostCommentedCardsContainer = null;
    this._topRatedCardsContainer = null;

    this._renderedMovies = {
      main: [],
      topRated: [],
      mostCommented: [],
    };

    this._onShowMore = this._onShowMore.bind(this);
  }

  render() {
    super.render();

    this._mainCardsContainer = this._element.querySelector(`.films-list__container--main`);
    this._mostCommentedCardsContainer = this._element.querySelector(`.films-list__container--most-commented`);
    this._topRatedCardsContainer = this._element.querySelector(`.films-list__container--top-rated`);

    return this._element;
  }

  _processRenderingMainMovies() {
    let moviesToRender;

    if (this._movies[this._currentFilter].length <= this._countOfMoviesToRender) {
      moviesToRender = this._movies[this._currentFilter];
    } else {
      moviesToRender = this._movies[this._currentFilter].slice(0, this._countOfMoviesToRender);
      this._mainCardsContainer.insertAdjacentHTML(`afterend`, this._showMoreButtonTemplate);
      this._showMoreButton = this._element.querySelector(`.films-list__show-more`);
    }

    this._renderMovies(moviesToRender, this._mainCardsContainer, true, `main`);
  }

  _unrenderPrevious() {
    for (const renderedMovie of this._renderedMovies.main) {
      this._mainCardsContainer.removeChild(renderedMovie.element);
      renderedMovie.component.unrender();
    }
    for (const renderedMovie of this._renderedMovies.topRated) {
      this._topRatedCardsContainer.removeChild(renderedMovie.element);
      renderedMovie.component.unrender();
    }
    for (const renderedMovie of this._renderedMovies.mostCommented) {
      this._mostCommentedCardsContainer.removeChild(renderedMovie.element);
      renderedMovie.component.unrender();
    }

    this._renderedMovies.main = [];
    this._renderedMovies.topRated = [];
    this._renderedMovies.mostCommented = [];

    if (this._showMoreButton) {
      this._showMoreButton.remove();
    }

  }

  set movies(movies) {
    this._movies = movies;

    if (this._isWasFirstRender) {
      this._unrenderPrevious();
    }
    if (!this._isWasFirstRender) {
      this._isWasFirstRender = true;
    }

    this._processRenderingMainMovies();
    this._renderMovies(this._movies.mostCommented, this._mostCommentedCardsContainer, false, `mostCommented`);
    this._renderMovies(this._movies.topRated, this._topRatedCardsContainer, false, `topRated`);
  }

  set onMovieUpdate(fn) {
    this._onMovieUpdate = fn;
  }

  _renderMovies(movies, container, controls = true, category) {
    const mainBody = document.querySelector(`body`);

    movies.forEach((movie, index) => {
      const movieComponent = new Movie(movie, controls);
      const movieDetailsComponent = new MovieDetails(movie);

      let isOpened = false;

      const movieElement = movieComponent.render();
      container.appendChild(movieElement);

      movieComponent.onOpen = () => {
        if (!isOpened) {
          movieDetailsComponent.render();
          mainBody.appendChild(movieDetailsComponent.element);
          isOpened = true;
        }
      };

      movieDetailsComponent.onClose = () => {
        mainBody.removeChild(movieDetailsComponent.element);
        movieDetailsComponent.unrender();
        isOpened = false;
      };

      movieComponent.onMovieUpdate = (movieData) => {
        this._onMovieUpdate(movieData);
      };

      movieDetailsComponent.onMovieUpdate = (movieData) => {
        this._onMovieUpdate(movieData);
      };

      this._renderedMovies[category].push({
        component: movieComponent,
        element: movieElement
      });
    });
  }

  rerenderFilteredMovies(name) {
    if (name === this._currentFilter) {
      return;
    }

    this._currentFilter = name;
    this._countOfMoviesToRender = RENDER_STEP;

    for (const renderedMovie of this._renderedMovies.main) {
      this._mainCardsContainer.removeChild(renderedMovie.element);
      renderedMovie.component.unrender();
    }

    this._renderedMovies.main = [];

    if (this._showMoreButton) {
      this._showMoreButton.remove();
    }

    this._processRenderingMainMovies();
  }

  _onShowMore(evt) {
    if (!evt.target.classList.contains(`films-list__show-more`)) {
      return;
    }

    const currentRenderedLength = this._renderedMovies.main.length;
    const totalCategoryLength = this._movies[this._currentFilter].length;

    let moviesToRender;

    if (currentRenderedLength + RENDER_STEP < totalCategoryLength) {
      moviesToRender = this._movies[this._currentFilter].slice(currentRenderedLength, currentRenderedLength + RENDER_STEP);
    } else if (currentRenderedLength + RENDER_STEP >= totalCategoryLength) {
      moviesToRender = this._movies[this._currentFilter].slice(currentRenderedLength, totalCategoryLength);

      this._element.querySelector(`.films-list__show-more`).remove();
    }

    this._countOfMoviesToRender += moviesToRender.length;


    this._renderMovies(moviesToRender, this._mainCardsContainer, true, `main`);
  }

  addListeners() {
    this._element.addEventListener(`click`, this._onShowMore);
  }

  removeListeners() {
    this._element.removeEventListener(`click`, this._onShowMore);
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
}

