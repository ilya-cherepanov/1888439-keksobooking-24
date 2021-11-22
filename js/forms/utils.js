import { AdForm, MapFilterForm } from './form-dom.js';
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
  AdForm.PRICE_INPUT.placeholder = AdForm.PRICE_INPUT.min = BuildTypeToMinPrice[AdForm.TYPE_SELECT.value];
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
  AdForm.ADDRESS_INPUT.value = `${lng.toFixed(COORDINATE_PRECISION)}, ${lat.toFixed(COORDINATE_PRECISION)}`
);

const resetAvatarPreview = () => {
  AdForm.AVATAR_PREVIEW_ELEMENT.src = DEFAULT_AVATAR_PATH;
};

const resetImagesPreview = () => {
  AdForm.IMAGES_PREVIEW_ELEMENT.innerHTML = '';
};

const clearInvalidFrames = () => {
  const elements = [
    AdForm.TITLE_INPUT,
    AdForm.PRICE_INPUT,
    AdForm.CAPACITY_SELECT,
    AdForm.AVATAR_DROP_ZONE_ELEMENT,
    AdForm.IMAGES_DROP_ZONE_ELEMENT,
  ];

  elements.forEach((element) => setRedOutline(element, false));
};

const resetAdForm = () => {
  AdForm.FORM_ELEMENT.reset();
  AdForm.AVATAR_INPUT.setCustomValidity('');
  AdForm.IMAGES_INPUT.setCustomValidity('');
  setMinPrice();
  clearInvalidFrames();
};

const resetForms = () => {
  resetAdForm();

  MapFilterForm.FORM_ELEMENT.reset();

  resetAvatarPreview();
  resetImagesPreview();

  resetMap();
};

const setAddressFieldReadonly = (enabled) => {
  AdForm.ADDRESS_INPUT.readOnly = enabled;
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
