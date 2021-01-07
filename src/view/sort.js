import {SortType} from "../utils/const.js";
import AbstractView from "./abstract.js";

const createSortTemplate = (currentSortType) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
              <input id="sort-${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DAY}" data-sort-type="${SortType.DAY}" ${currentSortType === SortType.DAY ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-${SortType.DAY}">${SortType.DAY}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.EVENT}">
              <input id="sort-eve${SortType.EVENT}nt" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.EVENT}" data-sort-type="${SortType.EVENT}" disabled>
              <label class="trip-sort__btn" for="sort-${SortType.EVENT}">${SortType.EVENT}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
              <input id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}" data-sort-type="${SortType.TIME}" ${currentSortType === SortType.TIME ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-${SortType.TIME}">${SortType.TIME}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
              <input id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}" ${currentSortType === SortType.PRICE ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-${SortType.PRICE}">${SortType.PRICE}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.OFFER}">
              <input id="sort-${SortType.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.OFFER}" data-sort-type="${SortType.OFFER}" disabled>
              <label class="trip-sort__btn" for="sort-${SortType.OFFER}">${SortType.OFFER}</label>
            </div>
          </form>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSorType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
