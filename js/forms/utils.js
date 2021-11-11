import { resetMap } from '../map.js';


const DEFAULT_AVATAR_PATH = '/img/avatars/default.png';


const setRedFrame = (element, enabled) => {
  element.style.outlineWidth = enabled ? 3 : '';
  element.style.outlineStyle = enabled ? 'solid' : '';
  element.style.outlineColor = enabled ? 'red' : '';
};

const drawInvalidFrame = (formElement, markedElement) => {
  markedElement = markedElement || formElement;

  setRedFrame(markedElement, !formElement.validity.valid);
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

const setAdFormAddress = (lat, lng) => document.querySelector('#address').value = `${lng}, ${lat}`;

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
  elements.forEach((element) => setRedFrame(element, false));
  setRedFrame(adForm.querySelector('.ad-form-header__drop-zone'), false);
  setRedFrame(adForm.querySelector('.ad-form__drop-zone'), false);
};

const resetForms = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.reset();
  clearInvalidFrames(adForm);

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
  setRedFrame,
  resetAvatarPreview,
  resetImagesPreview,
  setAddressFieldReadonly
};
