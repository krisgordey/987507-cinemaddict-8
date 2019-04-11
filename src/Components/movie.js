import {Keycodes} from "../helpers/constants";
import Component from "../helpers/component";
import moment from 'moment';
import _ from "lodash";

export default class Movie extends Component {
  constructor(data, controls = true) {
    super();
    this._data = data;
    this._title = data.title;
    this._picture = data.picture;
    this._rating = data.totalRating;
    this._year = data.year;
    this._genre = data.genre;
    this._desc = data.desc;
    this._comments = data.comments;
    this._watchlist = data.watchlist;
    this._watched = data.watched;
    this._isFavorite = data.favorites;
    this._duration = data.duration;
    this._controls = controls;

    this._onOpen = null;

    this._onOpenCase = this._onOpenCase.bind(this);
    this._onToggleWatchlistCase = this._onToggleWatchlistCase.bind(this);
  }

  _renderControls() {
    return `<form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._watchlist ? `film-card__controls-item--active` : ``}" ><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._watched ? `film-card__controls-item--active` : ``}"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}"><!--Mark as favorite-->FAV</button>
            </form>`;
  }

  get template() {
    return `<article class="film-card ${this._controls ? `` : `film-card--no-controls`}">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
            <span class="film-card__duration">${moment.duration(this._duration, `minutes`).hours()}h ${moment.duration(this._duration, `minutes`).minutes()}m</span>
            <span class="film-card__genre">${this._genre.join(`, `)}</span>
          </p>
          <img src="${this._picture}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._desc}</p>
          <button class="film-card__comments">${this._comments.length} comments</button>

          ${this._controls ? this._renderControls() : ``}
        </article>`;
  }

  _onOpenCase(evt) {
    if (evt.keyCode === Keycodes.ENTER || evt.type === `click`) {
      return typeof this._onOpen === `function` && this._onOpen();
    }
    return undefined;
  }

  _onToggleWatchlistCase(evt) {
    if (evt.keyCode === Keycodes.ENTER || evt.type === `click`) {
      const newData = _.cloneDeep(this._data);
      newData.watchlist = !newData.watchlist;
      return typeof this._onMovieUpdate === `function` && this._onMovieUpdate(newData);
    }
    return undefined;
  }

  set onOpen(fn) {
    this._onOpen = fn;
  }

  set onMovieUpdate(fn) {
    this._onMovieUpdate = fn;
  }

  addListeners() {
    const openButton = this._element.querySelector(`.film-card__comments`);
    const watchListButton = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);

    openButton.addEventListener(`click`, this._onOpenCase);
    openButton.addEventListener(`keydown`, this._onOpenCase);

    if (watchListButton) {
      watchListButton.addEventListener(`click`, this._onToggleWatchlistCase);
      watchListButton.addEventListener(`keydown`, this._onToggleWatchlistCase);
    }
  }

  removeListeners() {
    const openButton = this._element.querySelector(`.film-card__comments`);
    const watchListButton = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);

    openButton.removeEventListener(`click`, this._onOpenCase);
    openButton.removeEventListener(`keydown`, this._onOpenCase);

    if (watchListButton) {
      watchListButton.removeEventListener(`click`, this._onToggleWatchlistCase);
      watchListButton.removeEventListener(`keydown`, this._onToggleWatchlistCase);
    }
  }

}
