import generateMovie from "./helpers/generate-movie";
import {INITIAL_CARDS_LENGTH, INITIAL_CARDS_LENGTH_FILTER} from './helpers/constants.js';

export default class Model {
  constructor() {
    this._movies = [];
    this._mostCommentedMovies = [];
    this._topRatedMovies = [];
  }

  fetchMovies() {
    this._movies = new Array(INITIAL_CARDS_LENGTH).fill(null).map(() => generateMovie());
  }
  fetchTopRatedMovies() {
    this._topRatedMovies = new Array(INITIAL_CARDS_LENGTH_FILTER).fill(null).map(() => generateMovie());
  }
  fetchMostCommentedMovies() {
    this._mostCommentedMovies = new Array(INITIAL_CARDS_LENGTH_FILTER).fill(null).map(() => generateMovie());
  }

  getMovies() {
    return this._movies;
  }

  getTopRatedMovies() {
    return this._topRatedMovies;
  }

  getMostCommentedMovies() {
    return this._mostCommentedMovies;
  }

  updateWatchedStatus(index, status) {
    this._movies[index].isWatch = status;
  }
  updateAddWatchListStatus(index, status) {
    this._movies[index].isObservation = status;
  }
}
