import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./utils/const.js";
import {isOnline} from "./utils/utils.js";
import {toast} from "./utils/toast/toast.js";
import SiteMenuView from "./view/site-menu.js";
import TripInfoView from "./view/trip-info.js";
import AddNewPointBtnView from "./view/add-point-btn.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic jhykf545ghtxaqmlpz7545s5i`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

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

const tripInfo = new TripInfoView();
const addNewPointBtn = new AddNewPointBtnView();
const siteMenu = new SiteMenuView();
const filterPresenter = new FilterPresenter(siteMenuControls, filterModel);
const tripPresenter = new TripPresenter(eventsComponent, pointsModel, filterModel, offersModel, destinationsModel, apiWithProvider);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);
      eventsComponent.classList.remove(`trip-events--hidden`);
      siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).disabled = false;
      siteMenu.getElement().querySelector(`.${MenuItem.TABLE.toLowerCase()}`).classList.add(`trip-tabs__btn--active`);
      siteMenu.getElement().querySelector(`.${MenuItem.STATS.toLowerCase()}`).classList.remove(`trip-tabs__btn--active`);
      break;
    case MenuItem.STATS:
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).disabled = true;
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
  if (!isOnline()) {
    toast(`You can't create new point offline`);
    return;
  } else {
    tripPresenter.createPoint(handleNewPointFormClose);
    siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).disabled = true;
    siteMenu.getElement().querySelector(`.${MenuItem.TABLE.toLowerCase()}`).classList.add(`trip-tabs__btn--active`);
  }
};

tripPresenter.init();
filterPresenter.init();

render(siteMenuWrapper, tripInfo, RenderPosition.AFTERBEGIN);
render(siteMenuWrapper, addNewPointBtn, RenderPosition.BEFOREEND);

siteMenuWrapper.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, handleNewPointFormOpen);

apiWithProvider.getPoints()
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

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.MINOR, destinations);
  });

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.MINOR, offers);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
