import EditEventPointView from "../view/edit-form.js";
import EventPointView from "../view/event-point.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Point {
  constructor(eventsListComponent, changeData) {
    this._eventsListComponent = eventsListComponent;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._changeData = changeData;

    this._clickHandler = this._clickHandler.bind(this);
    this._submitFormHandler = this._submitFormHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  init(eventPoint) {
    this._eventPoint = eventPoint;
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventPointView(eventPoint);
    this._eventEditComponent = new EditEventPointView(eventPoint);

    this._eventComponent.setEditClickHandler(this._editClickHandler);
    this._eventEditComponent.setClickHandler(this._clickHandler);
    this._eventEditComponent.setSubmitFormHandler(this._submitFormHandler);
    this._eventComponent.setFavoriteClickHandler(this._favoriteClickHandler);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListComponent, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventsListComponent.getElement().contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventsListComponent.getElement().contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _clickHandler() {
    this._replaceFormToCard();
  }

  _editClickHandler() {
    this._replaceCardToForm();
  }

  _favoriteClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._eventPoint,
            {
              isFavorite: !this._eventPoint.isFavorite
            }
        )
    );
  }

  _submitFormHandler() {
    this._changeData(this._eventPoint);
    this._replaceFormToCard();
  }
}
