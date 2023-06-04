import { createElement, render } from '../framework/render';
import AbstractView from '../framework/view/abstract-view';

const createEventsListTemplate = () => `
  <ul class="trip-events__list"></ul>
`;

const createElementWrapperTemplate = () => `
  <li class="trip-events__item"></li>
`;
class TripEventsList extends AbstractView {
  tripFiltersForm = document.querySelector('.trip-filters');
  _filterValue = this.tripFiltersForm.querySelector('input[name="trip-filter"]:checked').value;

  constructor(tripEvents) {
    super();
    this.tripEvents = tripEvents || [];
    this.setFiltersFormChangeHandler((evt) => {
      if (evt.target.name === 'trip-filter') {
        this.filterValue = evt.target.value;
      }
    });
  }

  #filtersFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.filtersFormChange(evt);
  };

  setFiltersFormChangeHandler = (callback) => {
    this._callback.filtersFormChange = callback;
    this.tripFiltersForm.addEventListener('change', this.#filtersFormHandler);
  };

  initList() {
    if (!this.isEmpty()) {
      this.tripEvents.forEach((component) => {
        this._appendComponent(component);
      });
    }
  }

  isEmpty() {
    return this.tripEvents.length === 0;
  }

  get template() {
    return createEventsListTemplate();
  }

  afterCreateElement() {
    this.initList();
  }

  addComponent(component) {
    this.tripEvents.push(component);
    if (this.isEmpty()) {
      this.removeElement();
      this.element;
    } else {
      this._appendComponent(component);
    }
  }

  _appendComponent(component) {
    const listElement = createElement(createElementWrapperTemplate());
    render(component, listElement);
    this.element.append(listElement);
  }
}

export default TripEventsList;

