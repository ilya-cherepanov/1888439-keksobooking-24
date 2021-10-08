import {createAnnouncement} from './mocking.js';


const ANNOUNCEMENT_COUNT = 10;


// eslint-disable-next-line no-unused-vars
const announcements = Array.from(
  { length: ANNOUNCEMENT_COUNT },
  (value, index) => createAnnouncement(index + 1),
);
