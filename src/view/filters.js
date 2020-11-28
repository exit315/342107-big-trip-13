export const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" 
      ${isChecked ?  `checked` : ``} ${count === 0 ? `disabled` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name.toUpperCase()}</label>
    </div>`
};

export const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);
  return `<h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};
