import AbstractView from "./abstract.js";

const createNoPoints = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoPoints extends AbstractView {
  getTemplate() {
    return createNoPoints();
  }
}
