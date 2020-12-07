import EditEventPointView from "./view/edit-form.js";
import EventPointView from "./view/event-point.js";
import FilterView from "./view/filters.js";
import SiteMenuView from "./view/site-menu.js";
import SortingView from "./view/sorting.js";
import TripInfoView from "./view/trip-info.js";
import EventsListView from "./view/events-list.js";
import {generateEventPoint} from "./mock/event-point.js";
import {render, RenderPosition} from "./utils/utils.js";


const headerElement = document.querySelector(`.page-header`);
const siteMenuWrapper = headerElement.querySelector(`.trip-main`);
const siteMenuControls = siteMenuWrapper.querySelector(`.trip-controls`);
const mainElement = document.querySelector(`.page-main`);
const mainElementContent = mainElement.querySelector(`.trip-events`);
const EVENTS_COUNT = 20;

render(siteMenuWrapper, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(siteMenuControls, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMenuControls, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(mainElementContent, new EventsListView().getElement(), RenderPosition.AFTERBEGIN);
render(mainElementContent, new SortingView().getElement(), RenderPosition.AFTERBEGIN);

const eventsListComponent = mainElement.querySelector(`.trip-events__list`);

const eventsList = new Array(EVENTS_COUNT).fill().map(generateEventPoint);

const renderEventPoint = (eventsListElement, eventItem) => {
  const eventComponent = new EventPointView(eventItem);
  const eventEditComponent = new EditEventPointView(eventItem);

  const replaceCardToForm = () => {
    eventsListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventsListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, replaceCardToForm);

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, replaceFormToCard);
  
  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(eventsListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 1; i < EVENTS_COUNT; i++) {
  renderEventPoint(eventsListComponent, eventsList[i]);
}
