import { setAdFormInteractivity } from './forms/ad-form.js';
import { setFilterInteractivity } from './forms/filter.js';

const setPageInteractivity = (enabled) => {
  setAdFormInteractivity(enabled);
  setFilterInteractivity(enabled);
};

export { setPageInteractivity };
