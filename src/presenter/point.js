import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {Mode, UserAction, UpdateType, State} from "../utils/const.js";
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

    this._handleExitEditClick = this._handleExitEditClick.bind(this);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEscDownPress = this._handleEscDownPress.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(eventPoint, offers, destinations) {
    this._eventPoint = eventPoint;
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventPointView(eventPoint);
    this._eventEditComponent = new EditEventPointView(eventPoint, offers, destinations);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setClickHandler(this._handleExitEditClick);
    this._eventEditComponent.setSubmitFormHandler(this._handleSubmitForm);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListComponent, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventComponent, prevEventEditComponent);
      this._mode = Mode.DEFAULT;
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

  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._handleEscDownPress);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._handleEscDownPress);
    this._mode = Mode.DEFAULT;
  }

  _handleExitEditClick() {
    this._eventEditComponent.reset(this._eventPoint);
    this._replaceFormToCard();
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleEscDownPress(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._eventPoint);
      this._replaceFormToCard();
    }
  }

  _handleFavoriteClick() {
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

  _handleDeleteClick(eventPoint) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        eventPoint
    );
  }

  _handleSubmitForm(eventPoint) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        eventPoint
    );
  }
}
