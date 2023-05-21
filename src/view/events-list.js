import { createElement, render } from '../render';
import DefaultView from './default-view';

const createEventsListTemplate = () => `
  <ul class="trip-events__list"></ul>
`;

const createElementWrapperTemplate = () => `
  <li class="trip-events__item"></li>
`;

class TripEventsList extends DefaultView {
  getTemplate() {
    return createEventsListTemplate();
  }

  addComponent(component) {
    const listElement = createElement(createElementWrapperTemplate());
    render(component, listElement);
    this.element.append(listElement);
  }
}

export default TripEventsList;
