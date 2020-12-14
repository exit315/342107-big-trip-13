import FilterView from "./view/filters.js";
import SiteMenuView from "./view/site-menu.js";
import TripInfoView from "./view/trip-info.js";
import {generateEventPoint} from "./mock/event-point.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";

const headerElement = document.querySelector(`.page-header`);
const siteMenuWrapper = headerElement.querySelector(`.trip-main`);
const siteMenuControls = siteMenuWrapper.querySelector(`.trip-controls`);
const mainElement = document.querySelector(`.page-main`);
const mainElementContent = mainElement.querySelector(`.trip-events`);
const EVENTS_COUNT = 20;

render(siteMenuWrapper, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteMenuControls, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMenuControls, new FilterView(), RenderPosition.BEFOREEND);

const eventsList = new Array(EVENTS_COUNT).fill().map(generateEventPoint);

const tripPresenter = new TripPresenter(mainElementContent);
tripPresenter.init(eventsList);
