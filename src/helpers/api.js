import ModelMovie from './model-movie.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelMovie.parseMovies);
  }

  updateMovie(newData) {
    const parsedMovie = ModelMovie.toRaw(newData);
    return this._load({
      url: `movies/${parsedMovie.id}`,
      method: Method.PUT,
      body: JSON.stringify(parsedMovie),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelMovie.parseMovie);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        // console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
