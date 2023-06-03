import { render, RenderPosition } from '../framework/render.js';
import TripEventsList from '../view/events-list';
import EventsSortingForm from '../view/events-sorting-form';
import TripEvent from '../view/trips-event';
import TripEventPresenter from './trip-event-presenter';
import { updateItem, sortDays, sortPrices } from '../util.js';
import { SORT_TYPE } from '../const-data.js';

class TripPresenter {

  constructor(container, tripModel) {
    this.tripEventPresenter = new Map();
    this.eventSorter = new EventsSortingForm();
    this.container = container;
    this.tripModel = tripModel;
    this.tripEventsData = tripModel.tripEvents;
    this.tripEvents = this.tripEventsData.map((tripData) => new TripEvent(tripData));
    this.tripListComponent = new TripEventsList(this.tripEvents);
    render(new EventsSortingForm(), this.container);
    render(this.tripListComponent, this.container);
    if (this.tripEvents.length === 0){
      this.#renderEmptyList();
    }
  }

  init() {
    this.tripEvents = [...this.tripModel.tripEvents];
    this.tripEvents.sort(sortDays);
    this.#renderBoard();
  }

  #renderEventList = () => {
    render(this.tripListComponent, this.container);
    this.#renderEvents();
  };

  #renderEvents = () => {
    this.tripEvents.forEach((task) => this.#renderEvent(task));
  };

  #renderEmptyList = () => {
    this.tripListComponent.updateMessage();
  };

  #renderEvent = (task) => {
    const tripEventPresenter = new TripEventPresenter(this.tripListComponent, this.#handleEventChange, this.#handleModeChange);
    tripEventPresenter.init(task);
    this.tripEventPresenter.set(task.id, tripEventPresenter);
  };

  #clearEventList = () => {
    this.tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.tripEventPresenter.clear();
  };

  #handleEventChange = (updatedEvent) => {
    this.tripEvents = updateItem(this.tripEvents, updatedEvent);
    this.tripEventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.tripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    render(this.eventSorter, this.container, RenderPosition.AFTERBEGIN);
    this.eventSorter.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEventList();
  };

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.tripEvents.sort(sortDays);
        break;
      case SORT_TYPE.PRICE:
        this.tripEvents.sort(sortPrices);
        break;
    }

    this.currentSortType = sortType;
  };

  #renderBoard = () => {
    if (this.tripEvents.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderEventList();
  };
}


export default TripPresenter;
