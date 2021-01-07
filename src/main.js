import {generateEventPoint} from "./mock/event-point.js";
import {render, RenderPosition} from "./utils/render.js";
import SiteMenuView from "./view/site-menu.js";
import TripInfoView from "./view/trip-info.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";

const headerElement = document.querySelector(`.page-header`);
const siteMenuWrapper = headerElement.querySelector(`.trip-main`);
const siteMenuControls = siteMenuWrapper.querySelector(`.trip-controls`);
const mainElement = document.querySelector(`.page-main`);
const mainElementContent = mainElement.querySelector(`.trip-events`);
const EVENTS_COUNT = 3;

render(siteMenuWrapper, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteMenuControls, new SiteMenuView(), RenderPosition.BEFOREEND);

const points = new Array(EVENTS_COUNT).fill().map(generateEventPoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(mainElementContent, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMenuControls, filterModel);

tripPresenter.init();
filterPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
  evt.target.disabled = true;
});
