

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

  updateMovie(newData) {
    this._movies.all
      .find((it) => it.id === newData.id)
      .update(newData);

    this._movies.watchlist = [];
    this._movies.history = [];
    this._movies.favorites = [];
    this._movies.mostCommented = [];
    this._movies.topRated = [];

    for (const movie of this._movies.all) {
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
  }
}
