import dayjs from "dayjs";
import flatpickr from "flatpickr";
import {DESTINATIONS} from "../main.js";
import {OFFERS} from "../main.js";
import {generateDuration} from "../utils/utils.js";
import SmartView from "./smart.js";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createEditEventFormTemplate = (data) => {
  const {pointType, destination, dateBegin, dateEnd, price} = data;

  const pointTypesList = [];
  OFFERS.forEach((el) => {
    let itemName = el.type.charAt(0).toUpperCase() + el.type.slice(1);

    pointTypesList.push(`<div class="event__type-item">
      <input id="event-type-${el.type}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${el.type}">
      <label class="event__type-label  event__type-label--${el.type}" for="event-type-${el.type}">${itemName}</label>
    </div>`);
  });

  const destinationsList = [];
  DESTINATIONS.forEach((el) => {
    destinationsList.push(`<option value="${el.name}">${el.name}</option>`);
  });

  const createPointOffersTemplate = () => {
    const offersList = [];

    if (pointType.offers !== null) {
      let i = 1;

      pointType.offers.forEach((el) => {
        offersList.push(`<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${pointType.typeOfPoint + i}" type="checkbox" name="event-offer-${pointType.typeOfPoint + i}" ${el.isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${pointType.typeOfPoint + i}">
            <span class="event__offer-title">${el.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${el.price}</span>
          </label>
        </div>`);
        i++;
      });

      return `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersList.join(``)}
          </div>
        </section>`;
    } else {
      return ``;
    }
  };

  const createPointDestinationDescriptionTemplate = () => {
    const photosList = [];

    if (destination.photos !== null) {
      destination.photos.forEach((el) => {
        photosList.push(`<img class="event__photo" src="${el.src}" alt="${el.description}">`);
      });

      return `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${destination.description ? `<p class="event__destination-description">${destination.description}</p>` : ``}
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosList.join(``)}
          </div>
        </div>
      </section>`;
    } else {
      return ``;
    }
  };

  const pointOffersTemplate = createPointOffersTemplate(pointType);
  const pointDestinationDescriptionTemplate = createPointDestinationDescriptionTemplate(destination);

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.typeOfPoint}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointTypesList.join(``)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination">
          ${pointType.typeOfPoint}
        </label>
        <select id="destination-list" class="event__input  event__input--destination" name="event-destination">
          <option>${destination.title}</option>
          ${destinationsList.join(``)}
        </select>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time">From</label>
        <input class="event__input  event__input--time event__input--start-time" id="event-start-time" type="text" name="event-start-time" value="${dayjs(dateBegin).format(`DD/MM/YY HH:MM`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time">To</label>
        <input class="event__input  event__input--time event__input--end-time" id="event-end-time" type="text" name="event-end-time" value="${dayjs(dateEnd).format(`DD/MM/YY HH:MM`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price" type="number" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${pointOffersTemplate}
      ${pointDestinationDescriptionTemplate}
    </section>
  </form>`;
};

export default class EditEventPoint extends SmartView {
  constructor(eventPoint) {
    super();
    this._data = EditEventPoint.parseEventToData(eventPoint);
    this._datepicker = null;

    this._changeDateEventBeginHandler = this._changeDateEventBeginHandler.bind(this);
    this._changeDateEventEndHandler = this._changeDateEventEndHandler.bind(this);
    this._changePointTypeHandler = this._changePointTypeHandler.bind(this);
    this._changePointDestinationHandler = this._changePointDestinationHandler.bind(this);
    this._changePointOfferHandler = this._changePointOfferHandler.bind(this);
    this._changePointPriceHandler = this._changePointPriceHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._submitFormHandler = this._submitFormHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  reset(eventPoint) {
    this.updateData(
        EditEventPoint.parseEventToData(eventPoint)
    );
  }

  getTemplate() {
    return createEditEventFormTemplate(this._data);
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelectorAll(`.event__type-input`)
    .forEach((el) => el.addEventListener(`change`, this._changePointTypeHandler));

    this.getElement()
    .querySelectorAll(`.event__input--destination`)
    .forEach((el) => el.addEventListener(`change`, this._changePointDestinationHandler));

    this.getElement()
    .querySelectorAll(`.event__offer-checkbox`)
    .forEach((el) => el.addEventListener(`change`, this._changePointOfferHandler));

    this.getElement()
    .querySelectorAll(`.event__input--price`)
    .forEach((el) => el.addEventListener(`change`, this._changePointPriceHandler));
  }

  _changeDateEventBeginHandler([userDate]) {
    this.updateData({
      dateBegin: dayjs(userDate),
      timeBegin: dayjs(userDate)
    }, true);
  }

  _changeDateEventEndHandler([userDate]) {
    this.updateData({
      dateEnd: dayjs(userDate),
      timeEnd: dayjs(userDate)
    }, true);
  }

  _changePointTypeHandler(evt) {
    evt.preventDefault();

    let i = OFFERS.findIndex((el) => el.type === evt.target.value);

    this.updateData({
      pointType: Object.assign(
          {},
          {typeOfPoint: evt.target.value},
          {offers: OFFERS[i].offers}
      )
    });
  }

  _changePointDestinationHandler(evt) {
    evt.preventDefault();

    let i = DESTINATIONS.findIndex((el) => el.name === evt.target.value);

    this.updateData({
      destination: Object.assign(
          {},
          {title: evt.target.value},
          {description: DESTINATIONS[i].description},
          {photos: DESTINATIONS[i].pictures}
      )
    });
  }

  _changePointOfferHandler(evt) {
    evt.preventDefault();

    let offerTitle = evt.target.parentElement.querySelector(`.event__offer-title`).textContent;

    let i = this._data.pointType.offers.findIndex((el) => el.title === offerTitle);

    this._data.pointType.offers[i].isChecked = evt.target.checked;

    this.updateData({
      pointType: Object.assign(
          {},
          this._data.pointType,
          {offers: this._data.pointType.offers}
      )
    });
  }

  _changePointPriceHandler(evt) {
    evt.preventDefault();

    this.updateData({
      price: evt.target.value
    }, true);
  }

  _clickHandler() {
    this._callback.click();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditEventPoint.parseDataToEvent(this._data));
  }

  _submitFormHandler(evt) {
    evt.preventDefault();

    this.updateData({
      duration: generateDuration(this._data.dateBegin, this._data.dateEnd)
    }, true);

    this._callback.submitClick(EditEventPoint.parseDataToEvent(this._data));
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
        this.getElement().querySelector(`.event__input--start-time`),
        {
          minDate: `today`,
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          onChange: this._changeDateEventBeginHandler
        }
    );

    this._datepicker = flatpickr(
        this.getElement().querySelector(`.event__input--end-time`),
        {
          minDate: `today`,
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          onChange: this._changeDateEventEndHandler
        }
    );
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, this._clickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
    .querySelector(`.event__reset-btn`)
    .addEventListener(`click`, this._deleteClickHandler);
  }

  setSubmitFormHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement()
    .addEventListener(`submit`, this._submitFormHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();

    this.setClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setSubmitFormHandler(this._callback.submitClick);
  }

  static parseEventToData(eventPoint) {
    return Object.assign(
        {},
        eventPoint
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    return data;
  }
}
