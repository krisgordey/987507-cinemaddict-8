import Component from "../helpers/component";

export default class FooterView extends Component {
  constructor() {
    super();
    this._movies = null;
  }

  set movies(movies) {
    this._movies = movies;

    this._element.innerHTML = this._footerContent;
  }

  get _footerContent() {
    return `<section class="footer__logo logo logo--smaller">Moowle</section>
            ${this._movies ? `<section class="footer__statistics"><p>${this._movies.all.length} movies inside</p></section>` : ``}`;
  }

  get template() {
    return `<footer class="footer">
              ${this._footerContent}
            </footer>`;
  }

}
