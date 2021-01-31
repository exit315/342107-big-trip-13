import dayjs from "dayjs";
import flatpickr from "flatpickr";
import {toast} from "../utils/toast/toast.js";
import SmartView from "./smart.js";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createEditEventFormTemplate = (data, offers, destinations) => {
  const {pointType, destination, dateBegin, dateEnd, price, isDisabled, isSaving, isDeleting} = data;

  const createPointTypesListTemplate = () => {
    const pointTypesList = [];
    offers.forEach((el) => {
      pointTypesList.push(`<div class="event__type-item">
        <input id="event-type-${el.type}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${el.type}" ${el.type === pointType.typeOfPoint ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
        <label class="event__type-label  event__type-label--${el.type}" for="event-type-${el.type}">${el.type.charAt(0).toUpperCase() + el.type.slice(1)}</label>
      </div>`);
    });

    return pointTypesList.join(``);
  };

  const createDestinationsListTemplate = () => {
    const destinationsList = [];
    destinations.forEach((el) => {
      destinationsList.push(`<option value="${el.name}" ${el.name === destination.title ? `selected` : ``}>${el.name}</option>`);
    });

    return destinationsList.join(``);
  };

  const createPointOffersTemplate = () => {
    const generalOffersList = offers.find((el) => el.type === pointType.typeOfPoint);

    if (generalOffersList.offers !== null && generalOffersList.offers.length !== 0) {
      const offersList = [];

      let i = 1;
      const currentOffers = pointType.offers;

      generalOffersList.offers.forEach((el) => {
        let checkedOfferIndex = currentOffers.findIndex((currentOffer) => currentOffer.title === el.title);

        offersList.push(`<div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${generalOffersList.type}${i}" type="checkbox" name="event-offer-${generalOffersList.type}${i}" ${checkedOfferIndex !== -1 ? `checked` : ``} ${data.isDisabled ? `disabled` : ``}>
          <label class="event__offer-label" for="event-offer-${generalOffersList.type}${i}">
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

  const pointTypesListTemplate = createPointTypesListTemplate();
  const destinationsListTemplate = createDestinationsListTemplate();
  const pointOffersTemplate = createPointOffersTemplate(pointType);
  const pointDestinationDescriptionTemplate = createPointDestinationDescriptionTemplate(destination);

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.typeOfPoint}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox" ${isDisabled ? `disabled` : ``}>
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointTypesListTemplate}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination">
          ${pointType.typeOfPoint}
        </label>
        <select id="destination-list" class="event__input  event__input--destination" name="event-destination">
          ${destinationsListTemplate}
        </select>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time">From</label>
        <input class="event__input  event__input--time event__input--start-time" id="event-start-time" type="text" name="event-start-time" value="${dayjs(dateBegin).format(`DD/MM/YY hh:mm`)}" ${isDisabled ? `disabled` : ``}>
        &mdash;
        <label class="visually-hidden" for="event-end-time">To</label>
        <input class="event__input  event__input--time event__input--end-time" id="event-end-time" type="text" name="event-end-time" value="${dayjs(dateEnd).format(`DD/MM/YY hh:mm`)}" ${isDisabled ? `disabled` : ``}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price" type="number" name="event-price" min="0" value="${price}" ${isDisabled ? `disabled` : ``}>
      </div>
      <button class="event__save-btn btn btn--blue" type="submit" ${isSaving ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
      <button class="event__reset-btn" type="reset" ${isDeleting ? `disabled` : ``}>${isDeleting ? `Deleting...` : `Delete`}</button>
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
  constructor(eventPoint, offers, destinations) {
    super();
    this._data = EditEventPoint.parseEventToData(eventPoint);
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._offers = offers;
    this._destinations = destinations;

    this._handleDateEventBeginChange = this._handleDateEventBeginChange.bind(this);
    this._handleDateEventEndChange = this._handleDateEventEndChange.bind(this);
    this._handlePointTypeChange = this._handlePointTypeChange.bind(this);
    this._handlePointDestinationChange = this._handlePointDestinationChange.bind(this);
    this._handlePointOfferChange = this._handlePointOfferChange.bind(this);
    this._handlePointPriceChange = this._handlePointPriceChange.bind(this);
    this._handleExitEditClick = this._handleExitEditClick.bind(this);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  reset(eventPoint) {
    this.updateData(
        EditEventPoint.parseEventToData(eventPoint)
    );
  }

  getTemplate() {
    return createEditEventFormTemplate(this._data, this._offers, this._destinations);
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelectorAll(`.event__type-input`)
    .forEach((el) => el.addEventListener(`change`, this._handlePointTypeChange));

    this.getElement()
    .querySelectorAll(`.event__input--destination`)
    .forEach((el) => el.addEventListener(`change`, this._handlePointDestinationChange));

    this.getElement()
    .querySelectorAll(`.event__offer-checkbox`)
    .forEach((el) => el.addEventListener(`change`, this._handlePointOfferChange));

    this.getElement()
    .querySelectorAll(`.event__input--price`)
    .forEach((el) => el.addEventListener(`change`, this._handlePointPriceChange));
  }

  _handleDateEventBeginChange([userDate]) {
    this.updateData({
      dateBegin: userDate
    }, true);
  }

  _handleDateEventEndChange([userDate]) {
    this.updateData({
      dateEnd: userDate
    }, true);
  }

  _handlePointTypeChange(evt) {
    evt.preventDefault();

    this.updateData({
      pointType: Object.assign(
          {},
          {typeOfPoint: evt.target.value},
          {offers: []}
      )
    });
  }

  _handlePointDestinationChange(evt) {
    evt.preventDefault();

    let i = this._destinations.findIndex((el) => el.name === evt.target.value);

    this.updateData({
      destination: Object.assign(
          {},
          {title: evt.target.value},
          {description: this._destinations[i].description},
          {photos: this._destinations[i].pictures}
      )
    });
  }

  _handlePointOfferChange(evt) {
    evt.preventDefault();

    const offerTitle = evt.target.parentElement.querySelector(`.event__offer-title`).textContent;

    const checkedOffers = this._data.pointType.offers.slice().map((el) => Object.assign({}, el));

    const currentOffers = this._offers.find((offer) => offer.type === this._data.pointType.typeOfPoint);

    const i = currentOffers.offers.findIndex((el) => el.title === offerTitle);

    if (i !== -1) {
      let j = checkedOffers.findIndex((el) => el.title === offerTitle);

      if (j === -1) {
        checkedOffers.push(currentOffers.offers[i]);
      } else {
        checkedOffers.splice(j, 1);
      }
    }

    this.updateData({
      pointType: Object.assign(
          {},
          this._data.pointType,
          {offers: checkedOffers}
      )
    }, true);
  }

  _handlePointPriceChange(evt) {
    evt.preventDefault();

    this.updateData({
      price: Number(evt.target.value)
    }, true);
  }

  _handleExitEditClick() {
    this._callback.click();
  }

  _handleDeleteClick(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditEventPoint.parseDataToEvent(this._data));
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();

    if (dayjs(this._data.dateBegin).isAfter(this._data.dateEnd, `minute`)) {
      toast(`End date can't be less than start date`);
      return;
    }

    this._callback.submitClick(EditEventPoint.parseDataToEvent(this._data));
  }

  _setDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`.event__input--start-time`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          onChange: this._handleDateEventBeginChange
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`.event__input--end-time`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          onChange: this._handleDateEventEndChange
        }
    );
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, this._handleExitEditClick);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
    .querySelector(`.event__reset-btn`)
    .addEventListener(`click`, this._handleDeleteClick);
  }

  setSubmitFormHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement()
    .addEventListener(`submit`, this._handleSubmitForm);
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
        eventPoint,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
