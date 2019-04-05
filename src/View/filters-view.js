import Component from "../helpers/component";

const NAV_ITEMS_DATA = [
  {name: `All movies`},
  {name: `Watchlist`, catName: `isObservation`, count: true},
  {name: `History`, catName: `isWatch`, count: true},
  {name: `Favorites`, count: true},
  {name: `Stats`}
];

export default class FiltersView extends Component {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  get template() {
    return `<nav class="main-navigation">${NAV_ITEMS_DATA.map(this._createNavItem.bind(this)).join(``)}</nav>`;
  }

  _isStats(name) {
    return name === `Stats` ? `main-navigation__item--additional` : ``;
  }

  _countCategory(cat) {
    return this._movies.reduce((acc, it) => {
      if (it[cat] === true) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  _createNavItem(item) {
    return `<a href="#${item.name}" 
      class="main-navigation__item ${this._isStats(item.name)}">
      ${item.name}
      ${item.count ? `<span class="main-navigation__item-count">${this._countCategory(item.catName)}</span>` : ``}
      </a>`;
  }
}
