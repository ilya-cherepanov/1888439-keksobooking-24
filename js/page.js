import {
  setAdFormInteractivity,
  setFilterInteractivity
} from './form.js';

const setPageInteractivity = (enabled) => {
  setAdFormInteractivity(enabled);
  setFilterInteractivity(enabled);
};

export { setPageInteractivity };
