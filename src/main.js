import TripPresenter from './presenter/presenter';
import { render } from './framework/render';
import TripModel from './model/trip-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import AddEventButton from './view/add-event-button';

const filtersSection = document.querySelector('.trip-controls__filters');
const eventsSection = document.querySelector('.trip-events');
const buttonSection = document.querySelector('.trip-main');

const tripEventsModel = new TripModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(filtersSection, filterModel, tripEventsModel);
filterPresenter.init();
const tripPresenter = new TripPresenter(eventsSection, tripEventsModel, filterModel);
tripPresenter.init();

const newEventButtonComponent = new AddEventButton();

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  tripPresenter.createTask(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

render(newEventButtonComponent, buttonSection);
newEventButtonComponent.setClickListener(handleNewEventButtonClick);
