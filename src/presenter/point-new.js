import PointNewView from "../view/create-form.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/const.js";
import {generateId} from "../mock/event-point.js";

export default class PointNew {
  constructor(eventsListComponent, changeData) {
    this._eventsListComponent = eventsListComponent;
    this._changeData = changeData;

    this._eventCreateComponent = null;

    this._submitFormHandler = this._submitFormHandler.bind(this);
    this._escDownHandler = this._escDownHandler.bind(this);
    this._canselClickHandler = this._canselClickHandler.bind(this);
  }

  init() {
    if (this._eventCreateComponent !== null) {
      return;
    }

    this._eventCreateComponent = new PointNewView();
    this._eventCreateComponent.setSubmitFormHandler(this._submitFormHandler);
    this._eventCreateComponent.setCanselClickHandler(this._canselClickHandler);

    render(this._eventsListComponent, this._eventCreateComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._escDownHandler);
  }

  destroy() {
    if (this._eventCreateComponent === null) {
      return;
    }

    remove(this._eventCreateComponent);
    this._eventCreateComponent = null;

    document.removeEventListener(`keydown`, this._escDownHandler);
  }

  _escDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
      document.querySelector(`.trip-main__event-add-btn`).disabled = false;
    }
  }

  _canselClickHandler() {
    this.destroy();
  }

  _submitFormHandler(eventPointNew) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, eventPointNew)
    );
    this.destroy();
  }
}
