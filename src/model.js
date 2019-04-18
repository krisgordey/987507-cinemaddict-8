

export default class Model {
  constructor() {
    this._unsortedMovies = [];
    this._movies = {
      all: [],
      watchlist: [],
      history: [],
      favorites: [],
      mostCommented: [],
      topRated: []
    };
  }

  _sortByGroups(movies) {
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

  set movies(movies) {
    this._unsortedMovies = movies;
    this._sortByGroups(this._unsortedMovies);
  }

  get movies() {
    return this._movies;
  }

  updateMovie(newData) {
    this._unsortedMovies
      .find((it) => it.id === newData.id)
      .update(newData);

    this._movies.all = [];
    this._movies.watchlist = [];
    this._movies.history = [];
    this._movies.favorites = [];
    this._movies.mostCommented = [];
    this._movies.topRated = [];

    this._sortByGroups(this._unsortedMovies);
  }
}
