
export default class ModelMovie {
  constructor(data) {
    this.id = data[`id`];

    this.title = data[`film_info`][`title`];
    this.totalRating = data[`film_info`][`total_rating`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.picture = data[`film_info`][`poster`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.year = data[`film_info`][`release`][`date`];
    this.country = data[`film_info`][`release`][`country`];
    this.duration = data[`film_info`][`runtime`];
    this.genre = data[`film_info`][`genre`];
    this.desc = data[`film_info`][`description`];

    this.userRating = data[`user_details`][`personal_rating`];
    this.watchlist = data[`user_details`][`watchlist`];
    this.watched = data[`user_details`][`already_watched`];
    this.watchingDate = data[`user_details`][`watching_date`];
    this.favorites = data[`user_details`][`favorite`];

    this.comments = data[`comments`];
  }

  static toRaw(data) {
    return {
      "id": data.id,
      "film_info": {
        "title": data.title,
        "alternative_title": data.alternativeTitle,
        "total_rating": data.totalRating,
        "poster": data.picture,
        "age_rating": data.ageRating,
        "director": data.director,
        "writers": data.writers,
        "actors": data.actors,
        "release": {
          "date": data.duration,
          "release_country": data.country
        },
        "runtime": data.year,
        "genre": data.genre,
        "description": data.desc
      },
      "user_details": {
        "personal_rating": data.userRating,
        "watchlist": data.watchlist,
        "already_watched": data.watched,
        "watching_date": data.watchingDate,
        "favorite": data.isFavorite
      },
      "comments": data.comments,
    };
  }

  static parseMovie(data) {
    return new ModelMovie(data);
  }

  static parseMovies(data) {
    return data.map(ModelMovie.parseMovie);
  }
}
