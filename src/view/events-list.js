import AbstractView from '../framework/view/abstract-view';

const createEventsListTemplate = () => `
  <ul class="trip-events__list"></ul>
`;
class TripEventsList extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}

export default TripEventsList;

