import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/const.js";
import PointNewView from "../view/create-form.js";

export default class PointNew {
  constructor(eventsListComponent, changeData) {
    this._eventsListComponent = eventsListComponent;
    this._changeData = changeData;

    this._eventCreateComponent = null;
    this._destroyCallback = null;

    this._submitFormHandler = this._submitFormHandler.bind(this);
    this._escDownHandler = this._escDownHandler.bind(this);
    this._canselClickHandler = this._canselClickHandler.bind(this);
  }

  init(callback, offers, destinations) {
    this._destroyCallback = callback;

    if (this._eventCreateComponent !== null) {
      return;
    }

    this._eventCreateComponent = new PointNewView(undefined, offers, destinations);
    this._eventCreateComponent.setSubmitFormHandler(this._submitFormHandler);
    this._eventCreateComponent.setCanselClickHandler(this._canselClickHandler);

    render(this._eventsListComponent, this._eventCreateComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escDownHandler);
  }

  destroy() {
    if (this._eventCreateComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._eventCreateComponent);
    this._eventCreateComponent = null;

    document.removeEventListener(`keydown`, this._escDownHandler);
  }

  setSaving() {
    this._eventCreateComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventCreateComponent.updateData({
        isDisabled: false,
        isSaving: false
      });
    };

    this._eventCreateComponent.shake(resetFormState);
  }

  _escDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _canselClickHandler() {
    this.destroy();
  }

  _submitFormHandler(eventPoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        eventPoint
    );
  }
}
