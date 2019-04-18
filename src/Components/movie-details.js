import {Keycodes, UserRating, USER_NAME} from "../helpers/constants";
import Component from "../helpers/component";
import moment from 'moment';
import _ from "lodash";

const emoji = {
  'sleeping': `😴`,
  'grinning': `😀`,
  'neutral-face': `😐`,
};

export default class MovieDetails extends Component {
  constructor(data) {
    super();
    this.id = data.id;

    this._setOwnFields(data);

    this._onClose = null;

    this._onCloseCase = this._onCloseCase.bind(this);
    this._onToggleControlCase = this._onToggleControlCase.bind(this);
    this._onAddCommentCase = this._onAddCommentCase.bind(this);
    this._onDeleteCommentCase = this._onDeleteCommentCase.bind(this);
    this._onSelectEmojiCase = this._onSelectEmojiCase.bind(this);
    this._onSetUserRatingCase = this._onSetUserRatingCase.bind(this);
  }

  _setOwnFields(data) {
    this._data = data;
    this._title = data.title;
    this._alternativeTitle = data.alternativeTitle;
    this._picture = data.picture;
    this._userRating = data.userRating;
    this._rating = data.totalRating;
    this._year = data.year;
    this._genre = data.genre;
    this._desc = data.desc;
    this._comments = data.comments;
    this._watchlist = data.watchlist;
    this._watched = data.watched;
    this._favorites = data.favorites;
    this._duration = data.duration;
    this._ageRating = data.ageRating;
    this._country = data.country;
  }

  update(newData) {
    this._setOwnFields(newData);

    this.element.innerHTML = this._generateCardMakup();
  }

  addListeners() {
    this._element.addEventListener(`click`, this._onCloseCase);
    this._element.addEventListener(`keydown`, this._onCloseCase);
    document.body.addEventListener(`keydown`, this._onCloseCase);

    this._element.addEventListener(`click`, this._onToggleControlCase);
    this._element.addEventListener(`keydown`, this._onToggleControlCase);

    this._element.addEventListener(`keydown`, this._onAddCommentCase);

    this._element.addEventListener(`click`, this._onDeleteCommentCase);
    this._element.addEventListener(`keydown`, this._onDeleteCommentCase);

    this._element.addEventListener(`change`, this._onSelectEmojiCase);

    this._element.addEventListener(`click`, this._onSetUserRatingCase, true);
    this._element.addEventListener(`keydown`, this._onSetUserRatingCase, true);
  }

  removeListeners() {
    this._element.removeEventListener(`click`, this._onCloseCase);
    this._element.removeEventListener(`keydown`, this._onCloseCase);
    document.body.removeEventListener(`keydown`, this._onCloseCase);

    this._element.removeEventListener(`click`, this._onToggleControlCase);
    this._element.removeEventListener(`keydown`, this._onToggleControlCase);

    this._element.removeEventListener(`keydown`, this._onAddCommentCase);

    this._element.removeEventListener(`click`, this._onDeleteCommentCase);
    this._element.removeEventListener(`keydown`, this._onDeleteCommentCase);

    this._element.removeEventListener(`change`, this._onSelectEmojiCase);

    this._element.removeEventListener(`click`, this._onSetUserRatingCase, true);
    this._element.removeEventListener(`keydown`, this._onSetUserRatingCase, true);
  }

  get _closeButton() {
    return this._element.querySelector(`.film-details__close-btn`);
  }

  get _commentInput() {
    return this._element.querySelector(`.film-details__comment-input`);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onMovieUpdate(fn) {
    this._onMovieUpdate = fn;
  }

  get _userCommentLastIndex() {
    const userCommentsIndexes = this._comments.reduce((acc, comment, index) => comment.author === USER_NAME ? [...acc, index] : acc, []);
    return userCommentsIndexes.length > 0 ? userCommentsIndexes[userCommentsIndexes.length - 1] : null;
  }

  get _hasUserComment() {
    return !!this._userCommentLastIndex;
  }

  _onToggleControlCase(evt) {
    if (
      evt.target.classList.contains(`film-details__control-label`)
      && (evt.keyCode === Keycodes.ENTER || evt.type === `click`)
    ) {
      evt.preventDefault();

      if (evt.target.classList.contains(`film-details__control-label--disabled`)) {
        return;
      }

      const labelInput = evt.target.parentNode.querySelector(`#${evt.target.htmlFor}`);

      evt.target.classList.add(`film-details__control-label--disabled`);
      labelInput.setAttribute(`disabled`, true);

      const newData = _.cloneDeep(this._data);
      newData[evt.target.htmlFor] = !newData[evt.target.htmlFor];

      if (evt.target.htmlFor === `watched` && newData[`watched`]) {
        newData.watchingDate = moment().valueOf();
      }

      this._onMovieUpdate(newData)
        .then(() => {
          evt.target.classList.remove(`film-details__control-label--disabled`);
          labelInput.removeAttribute(`disabled`);
        })
        .catch(() => {
          evt.target.classList.add(`shake`);
          setTimeout(() => {
            evt.target.classList.remove(`film-details__control-label--disabled`);
            labelInput.removeAttribute(`disabled`);
            evt.target.classList.remove(`shake`);
          }, 700);
        });
    }
  }

  _onCloseCase(evt) {
    if (
      (evt.type === `click` && evt.target === this._closeButton)
      || (evt.type === `keydown` && evt.keyCode === Keycodes.ENTER && evt.target === this._closeButton)
      || (evt.type === `keydown` && evt.keyCode === Keycodes.ESCAPE)
    ) {
      return typeof this._onClose === `function` && this._onClose();
    }
    return undefined;
  }

  _onAddCommentCase(evt) {
    if (evt.target === this._commentInput && evt.keyCode === Keycodes.ENTER && evt.ctrlKey && evt.target.value.length > 0) {
      evt.target.classList.add(`film-details__comment-input--disabled`);
      evt.target.setAttribute(`disabled`, true);

      const newData = _.cloneDeep(this._data);
      const newComment = {
        author: USER_NAME,
        comment: evt.target.value,
        date: moment().valueOf(),
        emotion: this._element.querySelector(`.film-details__add-emoji`).value,
      };
      newData.comments.push(newComment);

      this._onMovieUpdate(newData)
        .then(() => {
          evt.target.classList.remove(`film-details__comment-input--disabled`);
          evt.target.removeAttribute(`disabled`);
        })
        .catch(() => {
          evt.target.classList.add(`shake`);
          setTimeout(() => {
            evt.target.classList.remove(`film-details__comment-input--disabled`);
            evt.target.removeAttribute(`disabled`);
            evt.target.classList.remove(`shake`);
          }, 700);
        });
    }
  }

  _onDeleteCommentCase(evt) {
    if (
      evt.target.classList.contains(`film-details__watched-reset`)
      && (evt.keyCode === Keycodes.ENTER || evt.type === `click`)
    ) {
      evt.preventDefault();

      if (evt.target.classList.contains(`film-details__watched-reset--disabled`)) {
        return;
      }

      evt.target.classList.add(`film-details__watched-reset--disabled`);
      evt.target.setAttribute(`disabled`, true);

      const newData = _.cloneDeep(this._data);
      newData.comments.splice(this._userCommentLastIndex, 1);

      if (evt.target.htmlFor === `watched` && newData[`watched`]) {
        newData.watchingDate = moment().valueOf();
      }

      this._onMovieUpdate(newData)
        .then(() => {
          evt.target.classList.remove(`film-details__watched-reset--disabled`);
          evt.target.removeAttribute(`disabled`);
        })
        .catch(() => {
          evt.target.classList.add(`shake`);
          setTimeout(() => {
            evt.target.classList.remove(`film-details__watched-reset--disabled`);
            evt.target.removeAttribute(`disabled`);
            evt.target.classList.remove(`shake`);
          }, 700);
        });
    }
  }

  _onSelectEmojiCase(evt) {
    if (evt.target.classList.contains(`film-details__emoji-item`)) {
      this._element.querySelector(`.film-details__add-emoji`).value = evt.target.value;
      this._element.querySelector(`.film-details__add-emoji`).checked = false;
      this._element.querySelector(`.film-details__add-emoji-label`).innerText = emoji[evt.target.value];
    }
  }

  _onSetUserRatingCase(evt) {
    if (
      evt.target.classList.contains(`film-details__user-rating-label`)
      && (evt.keyCode === Keycodes.ENTER || evt.type === `click`)
    ) {
      const labelInput = evt.target.parentNode.querySelector(`#${evt.target.htmlFor}`);

      if (labelInput.checked) {
        return;
      }
      evt.stopPropagation();
      evt.preventDefault();

      evt.target.classList.add(`film-details__user-rating-label--disabled`);
      labelInput.setAttribute(`disabled`, true);

      const newData = _.cloneDeep(this._data);
      newData.userRating = +labelInput.value;

      this._onMovieUpdate(newData)
        .then(() => {
          evt.target.classList.remove(`film-details__user-rating-label--disabled`);
          labelInput.removeAttribute(`disabled`);
          labelInput.checked = true;
        })
        .catch(() => {
          evt.target.classList.add(`shake`);
          setTimeout(() => {
            evt.target.classList.remove(`film-details__user-rating-label--disabled`);
            labelInput.removeAttribute(`disabled`);
            evt.target.classList.remove(`shake`);
          }, 700);
        });
    }
  }

  _getUserRatingInputsMarkup(min, max, userRating) {
    let result = ``;
    for (let i = min; i <= max; i++) {
      result += `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${userRating === i ? `checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>`;
    }
    return result;
  }

  _getGenresMarkup(genres) {
    return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);
  }

  _getCommentMarkup(comment) {
    return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">${emoji[comment.emotion]}</span>
              <div>
                <p class="film-details__comment-text">${comment.comment}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${comment.author}</span>
                  <span class="film-details__comment-day">${moment(comment.date).fromNow()}</span>
                </p>
              </div>
            </li>`;
  }

  _getCommentsMarkup(comments) {
    return comments.map(this._getCommentMarkup).join(``);
  }

  _getUserRatingSectionMarkup() {
    return `<section class="film-details__user-rating-wrap">
              <div class="film-details__user-rating-controls">
                <span class="film-details__watched-status film-details__watched-status--active">${this._watched ? `Already watched` : `Will watch`}</span>
                ${this._hasUserComment ? `<button class="film-details__watched-reset" type="button">undo</button>` : ``}
              </div>
              <div class="film-details__user-score">
                <div class="film-details__user-rating-poster">
                  <img src="${this._picture}" alt="film-poster" class="film-details__user-rating-img">
                </div>
                <section class="film-details__user-rating-inner">
                  <h3 class="film-details__user-rating-title">${this._title}</h3>
                  <p class="film-details__user-rating-feelings">How you feel it?</p>
                  <div class="film-details__user-rating-score">
                    ${this._getUserRatingInputsMarkup(UserRating.MIN, UserRating.MAX, this._userRating)}
                  </div>
                </section>
              </div>
            </section>`;
  }

  get template() {
    return `<section class="film-details">
              ${this._generateCardMakup()}
            </section>`;
  }

  _generateCardMakup() {
    return `<form class="film-details__inner" action="" method="get">
              <div class="film-details__close">
                <button class="film-details__close-btn" type="button">close</button>
              </div>
              <div class="film-details__info-wrap">
                <div class="film-details__poster">
                  <img class="film-details__poster-img" src="${this._picture}" alt="${this._title}">
                  <p class="film-details__age">${this._ageRating}+</p>
                </div>
                <div class="film-details__info">
                  <div class="film-details__info-head">
                    <div class="film-details__title-wrap">
                      <h3 class="film-details__title">${this._title}</h3>
                      <p class="film-details__title-original">Original: ${this._alternativeTitle}</p>
                    </div>
                    <div class="film-details__rating">
                      <p class="film-details__total-rating">${this._rating}</p>
                      ${this._userRating ? `<p class="film-details__user-rating">Your rate ${this._userRating}</p>` : ``}
                    </div>
                  </div>
                  <table class="film-details__table">
                    <tr class="film-details__row">
                      <td class="film-details__term">Director</td>
                      <td class="film-details__cell">Brad Bird</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Writers</td>
                      <td class="film-details__cell">Brad Bird</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Actors</td>
                      <td class="film-details__cell">Samuel L. Jackson, Catherine Keener, Sophia Bush</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Release Date</td>
                      <td class="film-details__cell">${moment(this._year).format(`DD MMMM YYYY`)} (${this._country})</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Runtime</td>
                      <td class="film-details__cell">${moment.duration(this._duration, `minutes`).hours()}h ${moment.duration(this._duration, `minutes`).minutes()}m</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Country</td>
                      <td class="film-details__cell">USA</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Genres</td>
                      <td class="film-details__cell">${this._getGenresMarkup(this._genre)}</td>
                    </tr>
                  </table>
                  <p class="film-details__film-description">${this._desc}</p>
                </div>
              </div>
        
              <section class="film-details__controls">
                <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._watchlist ? `checked` : ``}>
                <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
          
                <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._watched ? `checked` : ``}>
                <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
          
                <input type="checkbox" class="film-details__control-input visually-hidden" id="favorites" name="favorites" ${this._favorites ? `checked` : ``}>
                <label for="favorites" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
              </section>
        
              <section class="film-details__comments-wrap">
                <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
          
                <ul class="film-details__comments-list">
                  ${this._getCommentsMarkup(this._comments)}
                </ul>
          
                <div class="film-details__new-comment">
                  <div>
                    <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
                    <input type="checkbox" class="film-details__add-emoji visually-hidden" value="neutral-face" id="add-emoji">
              
                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>
                
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                      <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>
                
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                      <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
                    </div>
                  </div>
                  <label class="film-details__comment-label">
                    <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
                  </label>
                </div>
              </section>
              ${(this._userRating || this._hasUserComment) ? this._getUserRatingSectionMarkup() : ``}
            </form>`;
  }
}
