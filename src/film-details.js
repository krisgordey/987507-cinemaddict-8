import utils from "./utils";
import {Keycodes, UserRating} from "./constants";
import Component from "./component";

export default class FilmDetails extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._picture = data.picture;
    this._userRating = data.userRating;
    this._rating = data.rating;
    this._year = data.year;
    this._genre = data.genre;
    this._desc = data.desc;
    this._comments = data.comments;
    this._isObservation = data.isObservation;
    this._isWatch = data.isWatch;
    this._isFavorite = data.isFavorite;
    this._duration = data.duration;

    this._onClose = null;

    this._onCloseCase = this._onCloseCase.bind(this);
  }
  _getUserRatingMarkup(min, max, userRating) {
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

  get template() {
    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="${this._picture}" alt="${this._title}">

      <p class="film-details__age">18+</p>
    </div>

    <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${this._title}</h3>
        <p class="film-details__title-original">Original: Невероятная семейка</p>
      </div>
    
      <div class="film-details__rating">
          <p class="film-details__total-rating">${this._rating}</p>
          <p class="film-details__user-rating">Your rate 8</p>
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
        <td class="film-details__cell">15 June ${this._year} (USA)</td>
    </tr>
    <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${this._duration}</td>
    </tr>
    <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">USA</td>
        </tr>
        <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
        ${this._getGenresMarkup(this._genre)}
        </td>
    </tr>
  </table>
  
    <p class="film-details__film-description">
        ${this._desc}
    </p>
  </div>
  </div>
  
  <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isObservation ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatch ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
  </section>
      
      <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments}</span></h3>
  
  <ul class="film-details__comments-list">
      <li class="film-details__comment">
      <span class="film-details__comment-emoji">😴</span>
  <div>
  <p class="film-details__comment-text">So long-long story, boring!</p>
  <p class="film-details__comment-info">
      <span class="film-details__comment-author">Tim Macoveev</span>
  <span class="film-details__comment-day">3 days ago</span>
  </p>
  </div>
  </li>
  </ul>
  
  <div class="film-details__new-comment">
      <div>
      <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
  <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">
  
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
  
      <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
      <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
  <button class="film-details__watched-reset" type="button">undo</button>
      </div>
  
      <div class="film-details__user-score">
      <div class="film-details__user-rating-poster">
      <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
      </div>
  
      <section class="film-details__user-rating-inner">
      <h3 class="film-details__user-rating-title">${this._title}</h3>
  
  <p class="film-details__user-rating-feelings">How you feel it?</p>
  
  <div class="film-details__user-rating-score">
      ${this._getUserRatingMarkup(UserRating.MIN, UserRating.MAX, this._userRating)}

    </div>
    </section>
    </div>
    </section>
    </form>
    </section>`;
  }

  addListeners() {
    document.body.addEventListener(`click`, this._onCloseCase);
    document.body.addEventListener(`keydown`, this._onCloseCase);
  }

  removeListeners() {
    document.body.removeEventListener(`click`, this._onCloseCase);
    document.body.removeEventListener(`keydown`, this._onCloseCase);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  render() {
    this._element = utils.createElement(this.template);
    setTimeout(this.addListeners.bind(this), 0);
    return this._element;
  }

  _onCloseCase(evt) {
    if (
      (evt.type === `click` && evt.target.classList.contains(`film-details__close-btn`))
      || (evt.type === `click` && !this._element.contains(evt.target))
      || (evt.type === `keydown` && evt.keyCode === Keycodes.ESCAPE)
    ) {
      return typeof this._onClose === `function` && this._onClose();
    }
    return undefined;
  }
}
