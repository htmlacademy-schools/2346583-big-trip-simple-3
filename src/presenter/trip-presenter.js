import { render, RenderPosition, remove } from '../framework/render.js';
import TripEventsList from '../view/events-list.js';
import EventsSortingForm from '../view/events-sorting-form.js';
import EmptyListView from '../view/empty-list.js';
import TripEventPresenter from './trip-event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { filter, sortDays, sortPrices } from '../util.js';
import LoadingView from '../view/loading.js';
import { SORT_TYPE, UpdateType, UserAction, FILTER_TYPE } from '../const-data.js';

class TripPresenter {
  #tripEventsList = new TripEventsList();
  #emptyListComponent = null;
  #eventSorter = null;
  #tripEventPresenter = new Map();
  #container = null;
  #newEventPresenter = null;
  #tripModel = null;
  #filterModel = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #filterType = FILTER_TYPE.EVERYTHING;
  #sortType = SORT_TYPE.DAY;

  constructor (container, tripModel, filterModel) {
    this.#container = container;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter(this.#tripEventsList.element, this.#handleViewAction);

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#tripModel.events;
    const filteredTasks = filter[this.#filterType](events);
    switch (this.#sortType) {
      case SORT_TYPE.DAY:
        return filteredTasks.sort(sortDays);
      case SORT_TYPE.PRICE:
        return filteredTasks.sort(sortPrices);
    }
    return filteredTasks;
  }

  createTask = (callback) => {
    this.#sortType = SORT_TYPE.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#newEventPresenter.init(callback, this.#tripModel.destinations, this.#tripModel.offers);
  };

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView(this.#filterType);
    render(this.#emptyListComponent, this.#container);
  };

  #renderEvent = (task) => {
    const destinations = this.#tripModel.destinations;
    const offers = this.#tripModel.offers;
    const tripEventPresenter = new TripEventPresenter(this.#tripEventsList, this.#handleViewAction, this.#handleModeChange, destinations, offers);
    tripEventPresenter.init(task);
    this.#tripEventPresenter.set(task.id, tripEventPresenter);
  };

  #renderEvents = () => {
    this.events.forEach((task) => this.#renderEvent(task));
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripEventsList.element, RenderPosition.AFTERBEGIN);
  };

  #clearEventList = ({resetSortType = false} = {}) => {
    this.#newEventPresenter.destroy();
    this.#tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenter.clear();

    remove(this.#eventSorter);
    remove(this.#loadingComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#sortType = SORT_TYPE.DAY;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#tripModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#tripModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#tripModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
    }
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#tripEventPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    this.#eventSorter = new EventsSortingForm(this.#sortType);
    this.#eventSorter.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#eventSorter, this.#container, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortType === sortType) {
      return;
    }

    this.#sortType = sortType;
    this.#clearEventList();
    this.#renderBoard();
  };

  #renderBoard = () => {
    render(this.#tripEventsList, this.#container);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const events = this.events;
    const eventCount = events.length;
    if (eventCount === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();

    this.#renderEvents();
  };
}

export default TripPresenter;
