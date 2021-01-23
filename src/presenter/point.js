import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {Mode, UserAction, UpdateType} from "../utils/const.js";
import EditEventPointView from "../view/edit-form.js";
import EventPointView from "../view/event-point.js";

export default class Point {
  constructor(eventsListComponent, changeData, changeMode) {
    this._eventsListComponent = eventsListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._clickHandler = this._clickHandler.bind(this);
    this._submitFormHandler = this._submitFormHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._escDownHandler = this._escDownHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  init(eventPoint, offers, destinations) {
    this._eventPoint = eventPoint;
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventPointView(eventPoint);
    this._eventEditComponent = new EditEventPointView(eventPoint, offers, destinations);

    this._eventComponent.setEditClickHandler(this._editClickHandler);
    this._eventEditComponent.setClickHandler(this._clickHandler);
    this._eventEditComponent.setSubmitFormHandler(this._submitFormHandler);
    this._eventEditComponent.setDeleteClickHandler(this._deleteClickHandler);
    this._eventComponent.setFavoriteClickHandler(this._favoriteClickHandler);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListComponent, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetEventPointView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _clickHandler() {
    this._eventEditComponent.reset(this._eventPoint);
    this._replaceFormToCard();
  }

  _editClickHandler() {
    this._replaceCardToForm();
  }

  _escDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._eventPoint);
      this._replaceFormToCard();
    }
  }

  _favoriteClickHandler() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._eventPoint,
            {
              isFavorite: !this._eventPoint.isFavorite
            }
        )
    );
  }

  _deleteClickHandler(eventPoint) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        eventPoint
    );
  }

  _submitFormHandler(eventPoint) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        eventPoint
    );
    this._replaceFormToCard();
  }
}
