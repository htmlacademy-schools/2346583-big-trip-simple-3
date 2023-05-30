import { generateTripEvents } from './trip-event';

export default class TripModel {
  #tripEvents = generateTripEvents(3);

  get tripEvents() {
    return this.#tripEvents;
  }
}
