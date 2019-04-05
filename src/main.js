import Model from './model.js';
import FilmsView from './View/films-view.js';
import FiltersView from './View/filters-view.js';

const model = new Model();
model.fetchMovies();
model.fetchTopRatedMovies();
model.fetchMostCommentedMovies();

const moviesData = model.getMovies();
const topRatedMoviesData = model.getTopRatedMovies();
const mostCommentedMoviesData = model.getMostCommentedMovies();

const filmsView = new FilmsView(moviesData, topRatedMoviesData, mostCommentedMoviesData);

filmsView.onChangeWatched = (index, status) => {
  model.updateWatchedStatus(index, status);
};
filmsView.onAddToWatchList = (index, status) => {
  model.updateAddWatchListStatus(index, status);
};

const filtersView = new FiltersView(moviesData);

document.querySelector(`.main`).appendChild(filtersView.render());
document.querySelector(`.main`).appendChild(filmsView.render());
