import { render } from '../render';
import TripEventsList from '../view/events-list';
import EventsSortingForm from '../view/events-sorting-form';
import AddEventForm from '../view/add-event-form';
import TripEvent from '../view/trips-event';
class TripPresenter {
  tripListComponent = new TripEventsList();

  init(container, tripModel) {
    this.container = container;
    this.tripModel = tripModel;
    this.tripEvents = tripModel.getTripEvents();

    render(new EventsSortingForm(), this.container);
    render(this.tripListComponent, this.container);
    this.tripListComponent.addComponent(new AddEventForm(this.tripEvents[0]));

    for (let i = 1; i < this.tripEvents.length; i++) {
      const tripEvent = this.tripEvents[i];
      this.tripListComponent.addComponent(new TripEvent(tripEvent));
    }
  }
}

export default TripPresenter;
