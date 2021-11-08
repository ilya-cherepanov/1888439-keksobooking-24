import { resetMap } from '../map.js';

const setFormInteractivity = (formClass, formFieldsSelector, enabled) => {
  const form = document.querySelector(`.${formClass}`);
  const formFields = form.querySelectorAll(formFieldsSelector);

  form.classList[enabled ? 'remove' : 'add'](`${formClass}--disabled`);
  formFields.forEach((field) => field.disabled = !enabled);

  return form;
};

const setListener = (element, evt, handler, enabled) => (
  element[enabled ? 'addEventListener' : 'removeEventListener'](evt, handler)
);

const setAdFormAddress = (lat, lng) => document.querySelector('#address').value = `${lng}, ${lat}`;

const resetForms = () => {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
  resetMap();
};


export {
  setFormInteractivity,
  setAdFormAddress,
  setListener,
  resetForms
};
