import { render } from '../framework/render';
import TripEventsList from '../view/events-list';
import EventsSortingForm from '../view/events-sorting-form';
import TripEvent from '../view/trips-event';
class TripPresenter {
  init(container, tripModel) {
    this.container = container;
    this.tripModel = tripModel;
    this.tripEventsData = tripModel.tripEvents;
    const tripEvents = this.tripEventsData.map((tripData) => new TripEvent(tripData));
    this.tripListComponent = new TripEventsList(tripEvents);
    render(new EventsSortingForm(), this.container);
    render(this.tripListComponent, this.container);
  }
}


export default TripPresenter;
