import Model from './model.js';
import HeaderView from './View/header-view.js';
import FiltersView from './View/filters-view.js';
import MoviesView from './View/movies-view.js';
import FooterView from './View/footer-view.js';
import API from "./helpers/api";

const AUTHORIZATION = `Basic d11XNlckBwKsddQQQYXNzd29yZAo=9999sQWE111`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;

export default class Controller {
  constructor() {
    this._api = null;
    this._model = null;
    this._headerView = null;
    this._filtersView = null;
    this._moviesView = null;
    this._statisticView = null;
    this._footerView = null;

    this._currentScreen = null;
  }

  start() {
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
    this._model = new Model();

    this._headerView = new HeaderView();
    document.querySelector(`.main`).insertAdjacentElement(`beforebegin`, this._headerView.render());

    this._filtersView = new FiltersView();
    document.querySelector(`.main`).appendChild(this._filtersView.render());

    this._moviesView = new MoviesView();
    document.querySelector(`.main`).appendChild(this._moviesView.render());

    this._footerView = new FooterView();
    document.querySelector(`.main`).insertAdjacentElement(`afterend`, this._footerView.render());

    this._api.getMovies()
      .then((movies) => {
        this._model.movies = movies;

        this._headerView.movies = this._model.movies;
        this._filtersView.movies = this._model.movies;
        this._moviesView.movies = this._model.movies;
        this._footerView.movies = this._model.movies;

        this._headerView.onSearch = (searchString) => {
          this._filtersView.resetFilter();

          this._moviesView.rerenderFilteredMovies(searchString);
        };

        this._filtersView.onFilter = (name) => {
          if (name === `stats`) {
            // hide movies, show stats
            return;
          }
          this._moviesView.rerenderFilteredMovies(name);

          this._headerView.cleanSearch();
        };

        this._moviesView.onMovieUpdate = (movieData) => {
          return this._api.updateMovie(movieData)
            .then((newData) => {
              this._model.updateMovie(newData);

              this._headerView.movies = this._model.movies;
              this._filtersView.movies = this._model.movies;
              this._moviesView.movies = this._model.movies;
            });
        };
      });

  }
}

// const model = new Model();
// model.fetchMovies();
// model.fetchTopRatedMovies();
// model.fetchMostCommentedMovies();
//
// const moviesData = model.getMovies();
// const topRatedMoviesData = model.getTopRatedMovies();
// const mostCommentedMoviesData = model.getMostCommentedMovies();
//
// const filmsView = new FilmsView(moviesData, topRatedMoviesData, mostCommentedMoviesData);
//
// filmsView.onChangeWatched = (index, status) => {
//   model.updateWatchedStatus(index, status);
// };
// filmsView.onAddToWatchList = (index, status) => {
//   model.updateAddWatchListStatus(index, status);
// };
//
// const filtersView = new FiltersView(moviesData);
//
// this._filtersView.onFilter = (category) => {
//   this._filtersView.unrenderFilters();
//   this._filtersView.renderFilters(category);
// };
//
// document.querySelector(`.main`).appendChild(filtersView.render());
// document.querySelector(`.main`).appendChild(filmsView.render());
