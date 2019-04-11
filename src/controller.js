import Model from './model.js';
import MoviesView from './View/movies-view.js';
import FiltersView from './View/filters-view.js';
import API from "./helpers/api";

const AUTHORIZATION = `Basic dXNlckBwKRISYXNzd29yZAo=9999sss9dds11`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;

export default class Controller {
  constructor() {
    this._api = null;
    this._model = null;
    this._filtersView = null;
    this._moviesView = null;
    this._statisticView = null;

    this._currentScreen = null;
  }

  start() {
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
    this._model = new Model();

    this._filtersView = new FiltersView();
    document.querySelector(`.main`).appendChild(this._filtersView.render());

    this._moviesView = new MoviesView();
    document.querySelector(`.main`).appendChild(this._moviesView.render());

    this._api.getMovies()
      .then((movies) => {
        this._model.movies = movies;
        this._filtersView.movies = this._model.movies;
        this._moviesView.movies = this._model.movies;

        this._filtersView.onFilter = (name) => {
          this._moviesView.rerenderFilteredMovies(name);
        };

        this._moviesView.onMovieUpdate = (movieData) => {
          this._api.updateMovie(movieData)
            .then((newData) => {
              this._model.updateMovie(newData);

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
