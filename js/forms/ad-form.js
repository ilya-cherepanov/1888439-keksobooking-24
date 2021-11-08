import { setFormInteractivity, resetForms, setListener } from './utils.js';
import { setAdFormValidationHandling } from './ad-form-validation.js';
import { sendData } from '../data.js';
import { showMessage } from '../messages.js';


const onAdFormSubmitHandler = async (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  try {
    await sendData(evt.target.action, formData);
  } catch (error) {
    showMessage('error');
    return;
  }

  evt.target.reset();
  showMessage('success');
  resetForms();
};

const onClickResetHandler = (evt) => {
  evt.preventDefault();
  resetForms();
};

const setAdFormInteractivity = (enabled) => {
  setAdFormValidationHandling(enabled);

  const adForm = setFormInteractivity('ad-form', 'fieldset', enabled);
  setListener(adForm, 'submit', onAdFormSubmitHandler, enabled);

  const resetButton = adForm.querySelector('.ad-form__reset');
  setListener(resetButton, 'click', onClickResetHandler, enabled);
};


export { setAdFormInteractivity };
