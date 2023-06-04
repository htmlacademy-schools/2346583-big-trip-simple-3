import {remove, render, RenderPosition} from '../framework/render.js';
import {nanoid} from 'nanoid';
import { UserAction, UpdateType } from '../const-data.js';
import AddEventForm from '../view/add-event-form.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #changeData = null;
  #newEventForm = null;
  #destroyCallback = null;
  #availableDestinations = null;
  #availableOffers = null;

  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (callback, destinations = null, offers = null) => {
    this.#destroyCallback = callback;
    this.#availableDestinations = destinations;
    this.#availableOffers = offers;

    if (this.#newEventForm !== null) {
      return;
    }

    this.#newEventForm = new AddEventForm(this.#availableDestinations, this.#availableOffers);
    this.#newEventForm.setFormSubmitListener(this.#handleFormSubmit);
    this.#newEventForm.setDeleteButtonClickListener(this.#handleDeleteClick);

    render(this.#newEventForm, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#newEventForm === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#newEventForm);
    this.#newEventForm = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (task) => {
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      {id: nanoid(), ...task},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
