import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/const.js";
import {filter} from "../utils/filter.js";
import {sortPointDefaultDateUp, sortPointPriceUp, sortPointDurationUp} from "../utils/sort.js";
import {SortType} from "../utils/const.js";
import EventsListView from "../view/events-list.js";
import SortView from "../view/sort.js";
import NoPointsView from "../view/no-points.js";
import LoadingView from "../view/loading.js";
import PointPresenter from "./point.js";
import PointNewPresenter from "./point-new.js";

export default class Trip {
  constructor(eventsComponent, pointsModel, filterModel, offersModel, destinationsModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._eventsComponent = eventsComponent;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._isLoading = true;
    this._api = api;

    this._eventsListComponent = new EventsListView();
    this._sortComponent = new SortView();
    this._noPointsComponent = new NoPointsView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._eventsListComponent, this._handleViewAction);
  }

  init() {
    render(this._eventsComponent, this._eventsListComponent, RenderPosition.AFTERBEGIN);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);

    this._renderTripBoard();
  }

  destroy() {
    this._clearTripBoard({resetSortType: true});

    remove(this._sortComponent);
    remove(this._eventsListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._offersModel.removeObserver(this._handleModelEvent);
    this._destinationsModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();

    this._pointNewPresenter.init(callback, offers, destinations);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();

    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredPoints.sort(sortPointDefaultDateUp);
      case SortType.PRICE:
        return filtredPoints.sort(sortPointPriceUp);
      case SortType.TIME:
        return filtredPoints.sort(sortPointDurationUp);
    }

    return filtredPoints;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripBoard();
        this._renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTripBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTripBoard();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetEventPointView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTripBoard();
    this._renderTripBoard();
  }

  _renderNoPoints() {
    render(this._eventsComponent, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._eventsComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._eventsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();

    const pointPresenter = new PointPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPointsList(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _clearTripBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());

    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointsComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTripBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getPoints().length === 0) {
      this._renderNoPoints();
      return;
    }

    const points = this._getPoints();

    this._renderSort();
    this._renderPointsList(points);
  }
}
