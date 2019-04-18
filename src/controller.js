import Model from './model.js';
import HeaderView from './View/header-view.js';
import FiltersView from './View/filters-view.js';
import MoviesView from './View/movies-view.js';
import StatisticView from './View/statistic-view.js';
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

    this._currentFilter = null;
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
    this._moviesView.showLoading();

    this._statisticView = new StatisticView();
    document.querySelector(`.main`).appendChild(this._statisticView.render());

    this._footerView = new FooterView();
    document.querySelector(`.main`).insertAdjacentElement(`afterend`, this._footerView.render());

    this._api.getMovies()
      .then((movies) => {
        this._model.movies = movies;

        this._headerView.movies = this._model.movies;
        this._filtersView.movies = this._model.movies;
        this._moviesView.movies = this._model.movies;
        this._statisticView.movies = this._model.movies;
        this._footerView.movies = this._model.movies;

        this._moviesView.hideLoading();

        this._headerView.onSearch = (searchString) => {
          this._filtersView.resetFilter(searchString);

          if (searchString !== ``) {
            this._moviesView.rerenderFilteredMovies(searchString);
          }
        };

        this._filtersView.onFilter = (name) => {
          if (name === `stats`) {
            this._moviesView.hideView();
            this._statisticView.showView();
            return;
          } else if (this._moviesView.isHidden) {
            this._moviesView.showView();
            this._statisticView.hideView();
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
              this._statisticView.movies = this._model.movies;
            });
        };
      })
      .catch((err) => {
        this._moviesView.showLoadingError();
      });

  }
}
