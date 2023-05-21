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
    this.tripEvents = tripModel.tripEvents;

    render(new EventsSortingForm(), this.container);
    render(this.tripListComponent, this.container);

    for (let i = 1; i < this.tripEvents.length; i++) {
      const event = this.tripEvents[i];
      const tripEvent = new TripEvent(event);
      const addEventForm = new AddEventForm(event);
      this.tripListComponent.addComponent(tripEvent);
      this.tripListComponent.addComponent(addEventForm);
      addEventForm.getElement().classList.add('visually-hidden');
      tripEvent.editingButton.addEventListener('click', () => {
        addEventForm.getElement().classList.toggle('visually-hidden');
        tripEvent.getElement().classList.toggle('visually-hidden');
      });
      addEventForm.getElement().addEventListener('submit', (evt) => {
        evt.preventDefault();
        addEventForm.getElement().classList.toggle('visually-hidden');
        tripEvent.getElement().classList.toggle('visually-hidden');
      });
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          addEventForm.getElement().classList.add('visually-hidden');
          tripEvent.getElement().classList.remove('visually-hidden');
        }
      });
    }
  }
}


export default TripPresenter;
