import {MenuItem} from "../utils/const.js";
import AbstractView from "./abstract.js";

const createMainMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn ${MenuItem.TABLE.toLowerCase()} trip-tabs__btn--active" href="#" data-menu-item="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
            <a class="trip-tabs__btn ${MenuItem.STATS.toLowerCase()}" href="#" data-menu-item="${MenuItem.STATS}">${MenuItem.STATS}</a>
          </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._handleMenuClick = this._handleMenuClick.bind(this);
  }

  getTemplate() {
    return createMainMenu();
  }

  _handleMenuClick(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._handleMenuClick);
  }
}
