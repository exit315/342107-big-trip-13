import {DESTINATIONS} from "../utils/const.js";
import {DESTINATION_TYPES} from "../utils/const.js";
/* import {POINT_TYPES} from "../utils/const.js";*/
import {POINTS} from "../utils/const.js";
import dayjs from "dayjs";
import SmartView from "./smart.js";

const NEW_EVENT_POINT = {
  pointType: ``,
  destination: ``,
  dateBegin: ``,
  dateEnd: ``,
  destinationDescription: {
    text: ``,
    photo: ``
  }
};

const createEditEventFormTemplate = (data) => {
  const {pointType, destination, dateBegin, dateEnd, price} = data;

  /*
  const pointTypesList = [];
  POINT_TYPES.forEach((element) => {
    pointTypesList.push(`<div class="event__type-item">
      <input id="event-type-${element.toLowerCase()}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${element.toLowerCase()}">
      <label class="event__type-label  event__type-label--${element.toLowerCase()}" for="event-type-${element.toLowerCase()}">${element}</label>
    </div>`);
  });
  */

  /*
  const offersList = [];
  pointType.offers.forEach((el) => {
    offersList.push(`<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${el.type}" type="checkbox" name="event-offer-${el.type}" data-type="${el.type}" ${el.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${el.type}">
        <span class="event__offer-title">${el.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${el.price}</span>
      </label>
    </div>`);
    return offersList;
  });
  */

  const pointTypesList = [];
  POINTS.forEach((el) => {
    pointTypesList.push(`<div class="event__type-item">
      <input id="event-type-${el.typeOfPoint.toLowerCase()}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${el.typeOfPoint.toLowerCase()}">
      <label class="event__type-label  event__type-label--${el.typeOfPoint.toLowerCase()}" for="event-type-${el.typeOfPoint.toLowerCase()}">${el.typeOfPoint}</label>
    </div>`);
  });

  const destinationsList = [];
  DESTINATION_TYPES.forEach((el) => {
    destinationsList.push(`<option value="${el}"></option>`);
  });


  const createPointOffersTemplate = () => {
    const offersList = [];

    if (pointType.offers !== null) {
      pointType.offers.forEach((el) => {
        offersList.push(`<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${el.type}" type="checkbox" name="event-offer-${el.type}" data-type="${el.type}" ${el.isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${el.type}">
            <span class="event__offer-title">${el.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${el.price}</span>
          </label>
        </div>`);
      });

      return `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersList}
          </div>
        </section>`;
    } else {
      return ``;
    }
  };

  const createPointDestinationDescriptionTemplate = () => {
    const photosList = [];

    if (destination.photos !== null && destination.description !== null) {
      destination.photos.forEach((el) => {
        photosList.push(`<img class="event__photo" src="${el}" alt="Event photo">`);
      });

      return `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
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
        <input class="event__input  event__input--destination" id="event-destination" type="text" name="event-destination" value="${destination.title}" list="destination-list">
        <datalist id="destination-list">
        ${destinationsList.join(``)}
        </datalist>
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
          <span class="visually-hidden">${price}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="${price}">
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
  constructor(eventPoint = NEW_EVENT_POINT) {
    super();
    this._data = EditEventPoint.parseEventToData(eventPoint);
    this._clickHandler = this._clickHandler.bind(this);
    this._submitFormHandler = this._submitFormHandler.bind(this);

    this._changePointTypeHandler = this._changePointTypeHandler.bind(this);
    this._changePointDestinationHandler = this._changePointDestinationHandler.bind(this);
    this._changePointOfferHandler = this._changePointOfferHandler.bind(this);
    this._changePointPriceHandler = this._changePointPriceHandler.bind(this);

    this._setInnerHandlers();
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

  _changePointTypeHandler(evt) {
    evt.preventDefault();

    let i = POINTS.findIndex((el) => el.typeOfPoint.toLowerCase() === evt.target.value);

    if (POINTS[i].offers !== null) {
      POINTS[i].offers.forEach((el) => (el.isChecked = false));
    }

    this.updateData({
      pointType: Object.assign(
          {},
          {typeOfPoint: evt.target.value},
          {offers: POINTS[i].offers}
      )
    });
  }

  _changePointDestinationHandler(evt) {
    evt.preventDefault();

    let i = DESTINATIONS.findIndex((el) => el.title === evt.target.value);

    this.updateData({
      destination: Object.assign(
          {},
          {title: evt.target.value},
          {description: DESTINATIONS[i].description},
          {photos: DESTINATIONS[i].photos}
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

  _submitFormHandler(evt) {
    evt.preventDefault();
    this._callback.submit(EditEventPoint.parseDataToEvent(this._data));
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, this._clickHandler);
  }

  setSubmitFormHandler(callback) {
    this._callback.submit = callback;
    this.getElement()
    .addEventListener(`submit`, this._submitFormHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setClickHandler(this._callback.click);
    this.setSubmitFormHandler(this._callback.submit);
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
