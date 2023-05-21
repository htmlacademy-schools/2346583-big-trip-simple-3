import DefaultView from './default-view';

const createEmptyEventsListTemplate = () => `
<main class="page-body__page-main  page-main">
<div class="page-body__container">
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    <p class="trip-events__msg">Click New Event to create your first point</p>
  </section>
</div>
</main>
`;

export default class EmptyList extends DefaultView {
  getTemplate() {
    return createEmptyEventsListTemplate();
  }
}
