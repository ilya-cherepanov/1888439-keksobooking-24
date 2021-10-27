import { setFormInteractivity } from './utils.js';

const setFilterInteractivity = (enabled) => {
  setFormInteractivity('map__filters', '.map__filter, .map__features', enabled);
};

export { setFilterInteractivity };
