import TripPresenter from './presenter/presenter';
import { render } from './framework/render';
import FiltersView from './view/filters-form';
import TripModel from './model/trip-model';

const tripFiltersBlock = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const tripModel = new TripModel();
render(new FiltersView(), tripFiltersBlock);
const tripPresenter = new TripPresenter(tripEventsSection, tripModel);
tripPresenter.init();
