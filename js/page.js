import { setAdFormInteractivity } from './forms/ad-form.js';
import { setFilterInteractivity } from './forms/filter.js';
import { drawMap } from './map.js';


const setPageInteractivity = (enabled) => {
  setAdFormInteractivity(enabled);
  setFilterInteractivity(enabled);
};

const initPage = () => {
  setPageInteractivity(false);
  drawMap();
};


export { initPage };
