import { generateTripEvents } from './trip-event';

export default class TripModel {
  #tripEvents = generateTripEvents(2);

  get tripEvents() {
    return this.#tripEvents;
  }
}
