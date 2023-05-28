import TripPresenter from './presenter/presenter';
import { render } from './framework/render';
import FiltersView from './view/filters-form';
import TripModel from './model/trip-model';

const tripFiltersBlock = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();
const tripModel = new TripModel();

render(new FiltersView(), tripFiltersBlock);
tripPresenter.init(tripEventsSection, tripModel);
