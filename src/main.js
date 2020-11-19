import {createEvent} from "./view/create-form.js";
import {editEvent} from "./view/edit-form.js";
import {createEventPoint} from "./view/event-point.js";
import {createFilterHandlers} from "./view/filters.js";
import {createMainMenu} from "./view/site-menu.js";
import {createSortingHandlers} from "./view/sorting.js";
import {createSummaryInfo} from "./view/trip-info.js";


const headerElement = document.querySelector(`.page-header`);
const siteMenuWrapper = headerElement.querySelector(`.trip-main`);
const siteMenuControllers = siteMenuWrapper.querySelector(`.trip-controls`);
const mainElement = document.querySelector(`.page-main`);
const mainElementContent = mainElement.querySelector(`.trip-events`);
const eventsCount = 3;

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

render(siteMenuWrapper, createSummaryInfo(), `afterbegin`);
render(siteMenuControllers, createMainMenu(), `beforeend`);
render(siteMenuControllers, createFilterHandlers(), `beforeend`);
render(mainElementContent, createSortingHandlers(), `beforeend`);
render(mainElementContent, createEvent(), `beforeend`);

for (let i = 0; i < eventsCount; i++) {
  render(mainElementContent, createEventPoint(), `beforeend`);
}

render(mainElementContent, editEvent(), `beforeend`);
