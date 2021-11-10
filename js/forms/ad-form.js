import { setFormInteractivity, resetForms, setListener } from './utils.js';
import { setAdFormValidationHandling } from './ad-form-validation.js';
import { sendFormData } from '../utils/api.js';
import { showMessage, MessageType } from '../messages.js';


const onAdFormSubmitHandler = async (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  try {
    await sendFormData(evt.target.action, formData);
  } catch (error) {
    showMessage(MessageType.ERROR);
    return;
  }

  evt.target.reset();
  showMessage(MessageType.SUCCESS);
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
