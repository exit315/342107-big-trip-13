import {FILTERS_TYPES} from "../utils/const.js";
import {createElement} from "../utils/utils";

const createFilterTemplate = () => {
  const filtersList = [];
  FILTERS_TYPES.forEach((type) => {
    return filtersList.push(`<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`);
  });

  return `<form class="trip-filters" action="#" method="get">
    ${filtersList.join(``)}
  </form>`;
};

export default class FilterView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
