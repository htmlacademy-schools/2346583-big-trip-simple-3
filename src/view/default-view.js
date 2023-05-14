import {createElement} from '../render.js';

class DefaultView {
  getTemplate() {
    throw new Error('Not Implemented YET');
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export default DefaultView;
