import TripPresenter from './presenter/presenter';
import { render } from './render';
import FiltersView from './view/filters-form';

const tripFiltersBlock = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();

render(new FiltersView(), tripFiltersBlock);
tripPresenter.init(tripEventsSection);
