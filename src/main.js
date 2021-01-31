import {render, RenderPosition, remove} from "./utils/render.js";
import {UpdateType, FilterType} from "./utils/const.js";
import SiteMenuView from "./view/site-menu.js";
import AddNewPointBtnView from "./view/add-point-btn.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic jhykf545ghtxaqmlpz7545s5i`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const api = new Api(END_POINT, AUTHORIZATION);

let statisticsComponent = null;

const headerElement = document.querySelector(`.page-header`);
const siteMenuWrapper = headerElement.querySelector(`.trip-main`);
const siteMenuControls = siteMenuWrapper.querySelector(`.trip-controls`);
const mainElement = document.querySelector(`.page-main`);
const eventsComponent = mainElement.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const addNewPointBtn = new AddNewPointBtnView();
const siteMenu = new SiteMenuView();
const filterPresenter = new FilterPresenter(siteMenuControls, filterModel);
const tripPresenter = new TripPresenter(eventsComponent, pointsModel, filterModel, offersModel, destinationsModel, api);

const tableMenuItem = siteMenu.getElement().querySelector(`.table`);
const statsMenuItem = siteMenu.getElement().querySelector(`.stats`);

const showTable = () => {
  remove(statisticsComponent);
  tripPresenter.destroy();
  tripPresenter.init();
  siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).disabled = false;
  tableMenuItem.classList.add(`trip-tabs__btn--active`);
  statsMenuItem.classList.remove(`trip-tabs__btn--active`);

  tableMenuItem.removeEventListener(`click`, showTable);
  statsMenuItem.addEventListener(`click`, showStatistics);
};

const showStatistics = () => {
  remove(statisticsComponent);
  tripPresenter.destroy();
  statisticsComponent = new StatisticsView(pointsModel.getPoints());
  siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).disabled = true;
  render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
  tableMenuItem.classList.remove(`trip-tabs__btn--active`);
  statsMenuItem.classList.add(`trip-tabs__btn--active`);

  statsMenuItem.removeEventListener(`click`, showStatistics);
  tableMenuItem.addEventListener(`click`, showTable);
};

const handleNewPointFormClose = () => {
  addNewPointBtn.getElement().disabled = false;
  addNewPointBtn.getElement().classList.remove(`trip-tabs__btn--active`);
};

const handleNewPointFormOpen = () => {
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  tripPresenter.createPoint(handleNewPointFormClose);
  addNewPointBtn.getElement().disabled = true;
  addNewPointBtn.getElement().classList.add(`trip-tabs__btn--active`);
};

tripPresenter.init();
filterPresenter.init();

render(siteMenuWrapper, addNewPointBtn, RenderPosition.BEFOREEND);

siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, handleNewPointFormOpen);

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.MINOR, destinations);
  });

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.MINOR, offers);
  });

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    render(siteMenuControls, siteMenu, RenderPosition.AFTERBEGIN);
    tableMenuItem.addEventListener(`click`, showTable);
    statsMenuItem.addEventListener(`click`, showStatistics);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(siteMenuControls, siteMenu, RenderPosition.AFTERBEGIN);
    tableMenuItem.addEventListener(`click`, showTable);
    statsMenuItem.addEventListener(`click`, showStatistics);
  });
