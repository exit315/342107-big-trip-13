import dayjs from "dayjs";
import moment from "moment";
import {generateDuration} from "../utils/utils.js";
import AbstractView from "./abstract.js";

const createEventPointTemplate = (eventPoint) => {
  const {pointType, destination, dateEnd, dateBegin, isFavorite, price} = eventPoint;

  const timeBegin = dayjs(dateBegin).format(`HH:MM`);
  const timeEnd = dayjs(dateEnd).format(`HH:MM`);

  const offersList = [];
  if (pointType.offers !== null) {
    pointType.offers.forEach((el) => {
      offersList.push(`${el.isChecked ? `<li class="event__offer">
      <span class="event__offer-title">${el.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${el.price}</span>
    </li>` : ``}`);
      return offersList;
    });
  }

  const createEventDurationTemplate = () => {
    const eventDuration = moment.duration(generateDuration(dayjs(dateBegin), dayjs(dateEnd)));
    const days = eventDuration._data.days;
    const hours = eventDuration._data.hours;
    const minutes = eventDuration._data.minutes;

    if (days === 0) {
      return `${(hours.toString().length === 1) ? `0${hours}` : `${hours}`}H 
      ${(minutes.toString().length === 1) ? `0${minutes}` : `${minutes}`}M`;
    } else if (days === 0 && hours === 0) {
      return `${(minutes.toString().length === 1) ? `0${minutes}` : `${minutes}`}M`;
    } else {
      return `${(days.toString().length === 1) ? `0${days}` : `${days}`}D 
      ${(hours.toString().length === 1) ? `0${hours}` : `${hours}`}H 
      ${(minutes.toString().length === 1) ? `0${minutes}` : `${minutes}`}M`;
    }
  };

  const eventDurationTemplate = createEventDurationTemplate();

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date">${dayjs(dateBegin).format(`MMM DD`)}</time> 
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.typeOfPoint}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointType.typeOfPoint} ${destination.title}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time">${timeBegin}</time>
          &mdash;
          <time class="event__end-time">${timeEnd}</time>
        </p>
        <p class="event__duration">${eventDurationTemplate}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersList.join(``)}
      </ul>
      <button class="event__favorite-btn${isFavorite ? ` event__favorite-btn--active` : ``}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class EventPoint extends AbstractView {
  constructor(eventPoint) {
    super();
    this._eventPoint = eventPoint;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventPointTemplate(this._eventPoint);
  }

  _editClickHandler() {
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
