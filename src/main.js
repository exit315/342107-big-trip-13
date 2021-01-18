import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./utils/const.js";
import SiteMenuView from "./view/site-menu.js";
import TripInfoView from "./view/trip-info.js";
import AddNewPointBtn from "./view/add-point-btn.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic jhykf545ghtxaqmlpz7545s5i`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const headerElement = document.querySelector(`.page-header`);
const siteMenuWrapper = headerElement.querySelector(`.trip-main`);
const siteMenuControls = siteMenuWrapper.querySelector(`.trip-controls`);
const mainElement = document.querySelector(`.page-main`);
const eventsComponent = mainElement.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripInfo = new TripInfoView();
const addNewPointBtn = new AddNewPointBtn();
const siteMenu = new SiteMenuView();
const filterPresenter = new FilterPresenter(siteMenuControls, filterModel);
const tripPresenter = new TripPresenter(eventsComponent, pointsModel, filterModel, api);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);
      eventsComponent.classList.remove(`trip-events--hidden`);
      siteMenu.getElement().querySelector(`.${MenuItem.TABLE.toLowerCase()}`).classList.add(`trip-tabs__btn--active`);
      siteMenu.getElement().querySelector(`.${MenuItem.STATS.toLowerCase()}`).classList.remove(`trip-tabs__btn--active`);
      break;
    case MenuItem.STATS:
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
      eventsComponent.classList.add(`trip-events--hidden`);
      siteMenu.getElement().querySelector(`.${MenuItem.TABLE.toLowerCase()}`).classList.remove(`trip-tabs__btn--active`);
      siteMenu.getElement().querySelector(`.${MenuItem.STATS.toLowerCase()}`).classList.add(`trip-tabs__btn--active`);
      break;
  }
};

const handleNewPointFormClose = () => {
  siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).disabled = false;
  siteMenu.getElement().querySelector(`.${MenuItem.TABLE.toLowerCase()}`).classList.remove(`trip-tabs__btn--active`);
};

const handleNewPointFormOpen = () => {
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();

  tripPresenter.createPoint(handleNewPointFormClose);
  siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).disabled = true;
  siteMenu.getElement().querySelector(`.${MenuItem.TABLE.toLowerCase()}`).classList.add(`trip-tabs__btn--active`);
};

tripPresenter.init();
filterPresenter.init();

render(siteMenuWrapper, tripInfo, RenderPosition.AFTERBEGIN);
render(siteMenuWrapper, addNewPointBtn, RenderPosition.BEFOREEND);

siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, handleNewPointFormOpen);

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    render(siteMenuControls, siteMenu, RenderPosition.AFTERBEGIN);
    siteMenu.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(siteMenuControls, siteMenu, RenderPosition.AFTERBEGIN);
    siteMenu.setMenuClickHandler(handleSiteMenuClick);
  });

export const DESTINATIONS = [];

api.getDestinations()
  .then((destinations) => {
    destinations.map((destination) => DESTINATIONS.push(destination))
  });

export const OFFERS = [];

api.getOffers()
  .then((offers) => {
    offers.map((offer) => OFFERS.push(offer))
  });
