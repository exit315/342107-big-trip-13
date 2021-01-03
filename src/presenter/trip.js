import EventsListView from "../view/events-list.js";
import SortingView from "../view/sorting.js";
import NoPointsView from "../view/no-points.js";
import PointPresenter from "./point.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/utils.js";

export default class Trip {
  constructor(eventsListContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._eventsListContainer = eventsListContainer; // .trip-events
    this._eventsListComponent = new EventsListView(); // .trip-events__list
    this._sortingComponent = new SortingView();
    this._noPointsComponent = new NoPointsView();
    this._pointPresenter = {};
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    render(this._eventsListContainer, this._eventsListComponent, RenderPosition.AFTERBEGIN);

    this._renderTripBoard();
  }

  _getPoints() {
    return this._pointsModel.getPoints();
  }

  _handleEventChange(updatedEvent) {
    this._pointPresenter[updatedEvent.id].init(updatedEvent);
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
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._handleEventChange, this._handleModeChange);
    pointPresenter.init(eventPoint);
    this._pointPresenter[eventPoint.id] = pointPresenter;
  }

  _renderPointsList(points) {
    points.forEach((point) => this._renderPoint(point));
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
