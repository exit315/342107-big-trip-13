import {EVENT_POINT_TYPES} from "../utils/const.js";
import {EVENT_POINT_DESTINATIONS} from "../utils/const.js";
import {ADDITIONAL_OFFERS} from "../utils/const.js";

export const createEditEventFormTemplate = (eventPoint = {}) => {
  const {
    pointType = ``,
    destination = ``,
    dateBegin = ``,
    dateEnd = ``,
    destinationDescription = {
      text: ``,
      photo: ``
    }
  } = eventPoint;

  const pointTypesList = [];

  EVENT_POINT_TYPES.forEach((element) => {
    pointTypesList.push(`<div class="event__type-item">
      <input id="event-type-${element.toLowerCase()}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${element.toLowerCase()}">
      <label class="event__type-label  event__type-label--${element.toLowerCase()}" for="event-type-${element.toLowerCase()}-1">${element}</label>
    </div>`);
  });

  const destinationsList = [];

  EVENT_POINT_DESTINATIONS.forEach((element) => {
    destinationsList.push(`<option value="${element}"></option>`);
  });

  const offersList = [];

  ADDITIONAL_OFFERS.forEach((el) => {
    offersList.push(`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${el.type}-1" type="checkbox" name="event-offer-${el.type}">
    <label class="event__offer-label" for="event-offer-${el.type}-1">
      <span class="event__offer-title">${el.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${el.price}</span>
    </label>
  </div>`);
    return offersList;
  });

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointTypesList.join(``)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${pointType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${destinationsList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateBegin}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersList.join(``)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationDescription}</p>
      </section>
    </section>
  </form>`;
};
