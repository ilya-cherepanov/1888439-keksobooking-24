import { createAnnouncement } from './mocking.js';
import { getFilledCard } from './card.js';


const ANNOUNCEMENT_COUNT = 10;


const announcements = Array.from(
  { length: ANNOUNCEMENT_COUNT },
  (value, index) => createAnnouncement(index + 1),
);

document.querySelector('#map-canvas')
  .appendChild(getFilledCard(announcements[0]));
