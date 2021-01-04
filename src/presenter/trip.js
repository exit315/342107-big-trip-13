import EventsListView from "../view/events-list.js";
import SortingView from "../view/sorting.js";
import NoPointsView from "../view/no-points.js";
import PointPresenter from "./point.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/const.js";


export default class Trip {
  constructor(eventsListContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._eventsListContainer = eventsListContainer; // .trip-events
    this._eventsListComponent = new EventsListView(); // .trip-events__list
    this._sortingComponent = new SortingView();
    this._noPointsComponent = new NoPointsView();
    this._pointPresenter = {};

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._eventsListContainer, this._eventsListComponent, RenderPosition.AFTERBEGIN);

    this._renderTripBoard();
  }

  _getPoints() {
    return this._pointsModel.getPoints();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
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
        this._clearTripBoard();
        this._renderTripBoard();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetEventPointView());
  }

  _renderNoPoints() {
    render(this._eventsListContainer, this._noPointsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSorting() {
    render(this._eventsListContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(eventPoint) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(eventPoint);
    this._pointPresenter[eventPoint.id] = pointPresenter;
  }

  _renderPointsList(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearTripBoard() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortingComponent);
    remove(this._noPointsComponent);
  }

  _renderTripBoard() {
    if (this._getPoints().length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSorting();
    this._renderPointsList(this._getPoints());
  }
}
