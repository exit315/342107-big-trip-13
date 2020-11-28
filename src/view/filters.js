import {FILTERS_TYPES} from "../utils/const.js";

export const createFilterTemplate = () => {
  const filtersList = [];
  FILTERS_TYPES.forEach((type) => {
    return filtersList.push(`<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`);
  });

  return `<h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filtersList.join(``)}
    </form>`;
};
