import { setAdFormInteractivity } from './forms/ad-form.js';
import { setFilterInteractivity } from './forms/filter.js';
import { createAnnouncement } from './mocking.js';
import { drawMap, drawSimilarMarkers } from './map.js';


const ANNOUNCEMENT_COUNT = 10;


const setPageInteractivity = (enabled) => {
  setAdFormInteractivity(enabled);
  setFilterInteractivity(enabled);
};

const onMapLoadedHandler = ({ target }) => {
  setPageInteractivity(true);

  const announcements = Array.from(
    { length: ANNOUNCEMENT_COUNT },
    (value, index) => createAnnouncement(index + 1),
  );

  drawSimilarMarkers(target, announcements);
};

const initPage = () => {
  setPageInteractivity(false);
  drawMap(onMapLoadedHandler);
};


export { initPage };
