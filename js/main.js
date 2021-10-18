import { createAnnouncement } from './mocking.js';
import { getFilledCard } from './card.js';
import { disableAdForm, disableFilter } from './form.js';


const ANNOUNCEMENT_COUNT = 10;


disableAdForm();
disableFilter();

const announcements = Array.from(
  { length: ANNOUNCEMENT_COUNT },
  (value, index) => createAnnouncement(index + 1),
);

document.querySelector('#map-canvas')
  .appendChild(getFilledCard(announcements[0]));
