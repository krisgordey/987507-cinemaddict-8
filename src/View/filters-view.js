import Component from "../helpers/component";

const NAV_ITEMS_DATA = [
  {name: `All movies`, catName: `all`},
  {name: `Watchlist`, catName: `watchlist`, count: true},
  {name: `History`, catName: `history`, count: true},
  {name: `Favorites`, catName: `favorites`, count: true},
  {name: `Stats`, catName: `stats`}
];

export default class FiltersView extends Component {
  constructor() {
    super();
    this._movies = {
      all: [],
      watchlist: [],
      history: [],
      favorites: []
    };

    this._onFilterSelect = this._onFilterSelect.bind(this);

    this._activeFilter = null;
  }

  set movies(movies) {
    this._movies = movies;

    this._activeFilter = `all`;

    this._element.innerHTML = this._createFiltersMarkup();
  }

  get template() {
    return `<nav class="main-navigation">${this._createFiltersMarkup()}</nav>`;
  }

  _createFiltersMarkup() {
    return NAV_ITEMS_DATA.map(this._createNavItem.bind(this)).join(``);
  }

  _isStats(name) {
    return name === `Stats` ? `main-navigation__item--additional` : ``;
  }

  _countCategory(cat) {
    return this._movies[cat].length;
  }

  _createNavItem(item) {
    const count = item.count ? this._countCategory(item.catName) : null;
    return `<a href="#${item.name}" data-name="${item.catName}"
      class="main-navigation__item ${item.catName === this._activeFilter ? `main-navigation__item--active` : ``} ${this._isStats(item.name)}">
      ${item.name}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
      </a>`;
  }

  _onFilterSelect(evt) {
    const navItem = evt.target.classList.contains(`.main-navigation__item`) ? evt.target : evt.target.closest(`.main-navigation__item`);
    if (!navItem || (navItem && evt.target.dataset.name === this._activeFilter)) {
      return;
    }
    const activeItem = this._element.querySelector(`[data-name="${this._activeFilter}"]`);
    activeItem.classList.remove(`main-navigation__item--active`);

    navItem.classList.add(`main-navigation__item--active`);
    this._activeFilter = navItem.dataset.name;

    this._onFilter(evt.target.dataset.name);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  addListeners() {
    this._element.addEventListener(`click`, this._onFilterSelect);
  }

  removeListeners() {
    this._element.removeEventListener(`click`, this._onFilterSelect);
  }
}
