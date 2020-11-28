export const EventPointTemplate = (eventPoint) => {
  const {pointType, destination, offers, timeBegin, timeEnd, dateBegin, duration, isFavorite, price} = eventPoint;

  const offersList = [];

  offers.forEach(el => {
    offersList.push(`<li class="event__offer">
      <span class="event__offer-title">${el.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${el.price}</span>
    </li>`);
    return offersList;
  });

  const days = duration._data.days;
  const hours = duration._data.hours;
  const minutes = duration._data.minutes;

  const eventDuration = `${(days.toString().length === 1) ? `0${days}` : `${days}`}D 
  ${(hours.toString().length === 1) ? `0${hours}` : `${hours}`}H 
  ${(minutes.toString().length === 1) ? `0${minutes}` : `${minutes}`}M`

  const favorite = (isFavorite) ? ` event__favorite-btn--active` : ``;



  return `<div class="event">
    <time class="event__date">${dateBegin.format("MMM DD")}</time> 
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${pointType} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time">${timeBegin}</time>
        &mdash;
        <time class="event__end-time">${timeEnd}</time>
      </p>
      <p class="event__duration">${eventDuration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersList.join('')}
    </ul>
    <button class="event__favorite-btn${favorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
};
