import { render } from '../render';
import TripEventsList from '../view/events-list';
import EventsSortingForm from '../view/events-sorting-form';
import AddEventForm from '../view/add-event-form';
import TripEvent from '../view/trips-event';

class TripPresenter {
  tripListComponent = new TripEventsList();

  init(container) {
    this.container = container;

    render(new EventsSortingForm(), this.container);
    render(this.tripListComponent, this.container);
    this.tripListComponent.addComponent(new AddEventForm());

    for (let i = 0; i < 3; i++) {
      this.tripListComponent.addComponent(new TripEvent());
    }
  }
}

export default TripPresenter;
