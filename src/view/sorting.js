import {SORTING_TYPES} from "../utils/const.js";

export const createSortingTemplate = () => {
  const sortingTypesList = [];
  SORTING_TYPES.forEach((type) => {
    return sortingTypesList.push(`<div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>`);
  });

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortingTypesList.join(``)}
  </form>`;
};
