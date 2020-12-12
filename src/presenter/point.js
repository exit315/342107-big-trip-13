import EditEventPointView from "../view/edit-form.js";
import EventPointView from "../view/event-point.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class Point {
  constructor(eventsListComponent) {
    this._eventsListComponent = eventsListComponent;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._clickHandler = this._clickHandler.bind(this);
    this._submitFormHandler = this._submitFormHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  init(eventPoint) {
    this._eventPoint = eventPoint;
    this._eventComponent = new EventPointView(eventPoint);
    this._eventEditComponent = new EditEventPointView(eventPoint);

    this._eventComponent.setEditClickHandler(this._editClickHandler);
    this._eventEditComponent.setClickHandler(this._clickHandler);
    this._eventEditComponent.setSubmitFormHandler(this._submitFormHandler);
  
    render(this._eventsListComponent, this._eventComponent, RenderPosition.BEFOREEND);
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

  _submitFormHandler() {
    this._replaceFormToCard();
  }
}
