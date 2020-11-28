import flatpickr from "flatpickr";
import {createEditEventFormTemplate} from "./view/edit-form.js";
import {EventPointTemplate} from "./view/event-point.js";
import {createFilterTemplate} from "./view/filters.js";
import {createMainMenu} from "./view/site-menu.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createSummaryInfo} from "./view/trip-info.js";
import {generateEventPoint} from "./mock/event-point.js";
import {generateFilter} from "./mock/filters.js";

const headerElement = document.querySelector(`.page-header`);
const siteMenuWrapper = headerElement.querySelector(`.trip-main`);
const siteMenuControllers = siteMenuWrapper.querySelector(`.trip-controls`);
const mainElement = document.querySelector(`.page-main`);
const mainElementContent = mainElement.querySelector(`.trip-events`);
const EVENTS_COUNT = 20;

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

const events = new Array(EVENTS_COUNT).fill().map(generateEventPoint);
const filters = generateFilter(events);

render(siteMenuWrapper, createSummaryInfo(), `afterbegin`);
render(siteMenuControllers, createMainMenu(), `beforeend`);
render(siteMenuControllers, createFilterTemplate(filters), `beforeend`);
render(mainElementContent, createSortingTemplate(), `beforeend`);
render(mainElementContent, createEditEventFormTemplate(events[0]), `beforeend`);

for (let i = 1; i < EVENTS_COUNT; i++) {
  render(mainElementContent, EventPointTemplate(events[i]), `beforeend`);
}

render(mainElementContent, createEditEventFormTemplate(), `beforeend`);

const editEventForm = document.querySelector(`.event--edit`);
const inputTime = editEventForm.querySelectorAll(`.event__input--time`);
flatpickr(inputTime, {
  enableTime: true,
  dateFormat: "d/m/y H:i",
  static: true,
  minDate: "today",
  "locale": {
    "firstDayOfWeek": 1
  }
});
