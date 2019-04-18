import Component from "../helpers/component";
import _ from "lodash";

export default class HeaderView extends Component {
  constructor() {
    super();
    this._movies = null;

    this._onSearchCase = _.debounce(this._onSearchCase, 300).bind(this);
  }

  set movies(movies) {
    this._movies = movies;

    this._element.querySelector(`.profile__rating`).innerText = this._profileRating;
  }

  get _profileRating() {
    if (this._movies.history.length <= 10) {
      return `novice`;
    }
    if (this._movies.history.length > 10 && this._movies.history.length < 20) {
      return `fan`;
    }
    return `movie buff`;
  }

  get template() {
    return `<header class="header">
              <h1 class="header__logo logo">Moowle</h1>
              <form class="header__search search">
                <input type="text" name="search" class="search__field" placeholder="Search">
                <button type="submit" class="visually-hidden">Search</button>
              </form>
              <section class="header__profile profile">
                <p class="profile__rating"></p>
              </section>
            </header>`;
  }

  set onSearch(fn) {
    this._onSearch = fn;
  }

  _onSearchCase(evt) {
    this._onSearch(evt.target.value);
  }

  cleanSearch() {
    this._element.querySelector(`.search__field`).value = ``;
  }

  addListeners() {
    this._element.addEventListener(`input`, this._onSearchCase);
  }

  removeListeners() {
    this._element.removeEventListener(`input`, this._onSearchCase);
  }

}
