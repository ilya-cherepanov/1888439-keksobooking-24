import { resetMap } from '../map.js';


const DEFAULT_AVATAR_PATH = '/img/avatars/default.png';
const COORDINATE_PRECISION = 5;

const BuildTypeToMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};


const setMinPrice = () => {
  const buildTypeSelect = document.querySelector('#type');
  const priceInput = buildTypeSelect.form.querySelector('#price');

  priceInput.placeholder = priceInput.min = BuildTypeToMinPrice[buildTypeSelect.value];
};

const setRedOutline = (element, enabled, width = '3px', style = 'solid', color = 'red') => {
  element.style.outlineWidth = enabled ? width : '';
  element.style.outlineStyle = enabled ? style : '';
  element.style.outlineColor = enabled ? color : '';
};

const drawInvalidFrame = (formElement, markedElement) => {
  markedElement = markedElement || formElement;

  setRedOutline(markedElement, !formElement.validity.valid);
};

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

const setAdFormAddress = (lat, lng) => (
  document.querySelector('#address').value = `${lng.toFixed(COORDINATE_PRECISION)}, ${lat.toFixed(COORDINATE_PRECISION)}`
);

const resetAvatarPreview = () => {
  const avatarPreview = document.querySelector('.ad-form-header__preview img');
  avatarPreview.src = DEFAULT_AVATAR_PATH;
};

const resetImagesPreview = () => {
  const adFormPhotos = document.querySelector('.ad-form__photo');
  adFormPhotos.innerHTML = '';
};

const clearInvalidFrames = (adForm) => {
  const elements = adForm.querySelectorAll('#title, #price, #capacity');
  elements.forEach((element) => setRedOutline(element, false));
  setRedOutline(adForm.querySelector('.ad-form-header__drop-zone'), false);
  setRedOutline(adForm.querySelector('.ad-form__drop-zone'), false);
};

const resetAdForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.reset();
  setMinPrice();
  clearInvalidFrames(adForm);
};

const resetForms = () => {
  resetAdForm();

  document.querySelector('.map__filters').reset();

  resetAvatarPreview();
  resetImagesPreview();

  resetMap();
};

const setAddressFieldReadonly = (enabled) => {
  document.querySelector('#address').readOnly = enabled;
};


export {
  setFormInteractivity,
  setAdFormAddress,
  setListener,
  resetForms,
  drawInvalidFrame,
  setRedOutline,
  resetAvatarPreview,
  resetImagesPreview,
  setAddressFieldReadonly,
  setMinPrice
};
