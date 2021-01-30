import {render, RenderPosition, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/const.js";
import PointNewView from "../view/create-form.js";

export default class PointNew {
  constructor(eventsListComponent, changeData) {
    this._eventsListComponent = eventsListComponent;
    this._changeData = changeData;

    this._eventCreateComponent = null;
    this._destroyCallback = null;

    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._handleEscDownPress = this._handleEscDownPress.bind(this);
    this._handleCanselClick = this._handleCanselClick.bind(this);
  }

  init(callback, offers, destinations) {
    this._destroyCallback = callback;

    if (this._eventCreateComponent !== null) {
      return;
    }

    this._eventCreateComponent = new PointNewView(undefined, offers, destinations);
    this._eventCreateComponent.setSubmitFormHandler(this._handleSubmitForm);
    this._eventCreateComponent.setCanselClickHandler(this._handleCanselClick);

    render(this._eventsListComponent, this._eventCreateComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._handleEscDownPress);
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

    document.removeEventListener(`keydown`, this._handleEscDownPress);
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

  _handleEscDownPress(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleCanselClick() {
    this.destroy();
  }

  _handleSubmitForm(eventPoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        eventPoint
    );
  }
}
