import generateMovie from "./helpers/generate-movie";
import {INITIAL_CARDS_LENGTH, INITIAL_CARDS_LENGTH_FILTER} from './helpers/constants.js';

export default class Model {
  constructor() {
    this._movies = {
      all: [],
      watchlist: [],
      history: [],
      favorites: [],
      mostCommented: [],
      topRated: []
    };
  }

  set movies(movies) {
    for (const movie of movies) {
      this._movies.all.push(movie);

      if (movie.watchlist) {
        this._movies.watchlist.push(movie);
      }
      if (movie.watched) {
        this._movies.history.push(movie);
      }
      if (movie.favorites) {
        this._movies.favorites.push(movie);
      }
    }

    this._movies.mostCommented = [...movies].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
    this._movies.topRated = [...movies].sort((a, b) => b.totalRating - a.totalRating).slice(0, 2);
  }

  get movies() {
    return this._movies;
  }

}
