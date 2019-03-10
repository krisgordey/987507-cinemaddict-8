import utils from "./utils";
import {Keycodes} from "./constants";

export default class Film {
  constructor(data, controls = true) {
    this._title = data.title;
    this._picture = data.picture;
    this._rating = data.rating;
    this._year = data.year;
    this._genre = data.genre;
    this._desc = data.desc;
    this._comments = data.comments;
    this._isObservation = data.isObservation;
    this._isWatch = data.isWatch;
    this._isFavorite = data.isFavorite;
    this._duration = data.duration;
    this._controls = controls;

    this._element = null;
    this._onOpen = null;

    this._onOpenButtonClick = this._onOpenButtonClick.bind(this);
    this._onEnterButtonPress = this._onEnterButtonPress(this);
  }

  _renderControls() {
    return `<form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>`;
  }

  get template() {
    return `<article class="film-card ${this._controls ? `` : `film-card--no-controls`}">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._year}</span>
            <span class="film-card__duration">${this._duration}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="${this._picture}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._desc}</p>
          <button class="film-card__comments">${this._comments} comments</button>

          ${this._controls ? this._renderControls() : ``}
        </article>`;
  }

  get element() {
    return this._element;
  }

  _onOpenButtonClick() {
    return typeof this._onOpen === `function` && this._onOpen();
  }
  _onEnterButtonPress(evt) {
    if (evt.keyCode === Keycodes.ENTER) {
      return typeof this._onOpen === `function` && this._onOpen();
    }
    return undefined;
  }

  set onOpen(fn) {
    this._onOpen = fn;
  }

  _addListeners() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onOpenButtonClick);
    document.addEventListener(`keydown`, this._onEnterButtonPress);
  }

  removeListeners() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onOpenButtonClick);
  }

  render() {
    this._element = utils.createElement(this.template);
    this._addListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element = null;
  }
}
