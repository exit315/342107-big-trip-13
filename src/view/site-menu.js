import AbstractView from "./abstract.js";

const createMainMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn table trip-tabs__btn--active" href="#" data-menu-item="table">Table</a>
            <a class="trip-tabs__btn stats" href="#" data-menu-item="stats">Stats</a>
          </nav>`;
};

export default class SiteMenu extends AbstractView {
  getTemplate() {
    return createMainMenu();
  }
}
