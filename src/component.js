import utils from "./utils";

export default class Component {
  constructor() {
    this._element = null;

    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = utils.createElement(this.template);
    this.addListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element = null;
  }
}
