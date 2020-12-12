import EventsListView from "../view/events-list.js";
import SortingView from "../view/sorting.js";
import NoPointsView from "../view/no-points.js";
import PointPresenter from "./point.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Trip {
  constructor(eventsListContainer) {
    this._eventsListContainer = eventsListContainer; // .trip-events
    this._eventsListComponent = new EventsListView(); // .trip-events__list
    this._sortingComponent = new SortingView();
    this._noPointsComponent = new NoPointsView();
  }

  init(eventsList) {
    this._eventsList = eventsList.slice();

    render(this._eventsListContainer, this._eventsListComponent, RenderPosition.AFTERBEGIN);

    this._renderTripBoard();
  }

  _renderNoPoints() {
    render(this._eventsListContainer, this._noPointsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSorting() {
    render(this._eventsListContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(eventPoint) {
    const pointPresenter = new PointPresenter(this._eventsListComponent);
    pointPresenter.init(eventPoint);
  }

  _renderPointsList() {
    this._eventsList.forEach((eventItem) => {
      this._renderPoint(eventItem);
    })
  }

  _renderTripBoard() {
    if (this._eventsList.length === 0) {
      this._renderNoPoints();
      return;
    }
    this._renderSorting();

    this._renderPointsList();
  }
}
