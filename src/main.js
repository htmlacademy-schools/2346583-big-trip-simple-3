import TripPresenter from './presenter/presenter.js';
import TripModel from './model/trip-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import AddEventButton from './view/add-event-button.js';
import { render } from './framework/render.js';
import EventsApi from './api.js';

const AUTHORIZATION = 'Basic AAAAfS44wcl1sa2j';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const filtersSection = document.querySelector('.trip-controls__filters');
const pointssSection = document.querySelector('.trip-events');
const buttonSection = document.querySelector('.trip-main');

const tripModel = new TripModel(new EventsApi(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();


const tripPresenter = new TripPresenter(pointssSection, tripModel, filterModel);
tripPresenter.init();
const filterPresenter = new FilterPresenter(filtersSection, filterModel, tripModel);
filterPresenter.init();

const newPointButtonComponent = new AddEventButton;

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createTask(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

tripModel.init()
  .finally(() => {
    render(newPointButtonComponent, buttonSection);
    newPointButtonComponent.setClickListener(handleNewPointButtonClick);
  });
