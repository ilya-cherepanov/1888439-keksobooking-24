import { setFormInteractivity } from './utils.js';
import { setAdFormValidationHandling } from './ad-form-validation.js';

const setAdFormInteractivity = (enabled) => {
  setAdFormValidationHandling(enabled);
  setFormInteractivity('ad-form', 'fieldset', enabled);
};


export { setAdFormInteractivity };
