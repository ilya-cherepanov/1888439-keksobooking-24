const setFormInteractivity = (formClass, formFieldsSelector, enabled) => {
  const form = document.querySelector(`.${formClass}`);
  const formFields = form.querySelectorAll(formFieldsSelector);

  form.classList[enabled ? 'remove' : 'add'](`${formClass}--disabled`);
  formFields.forEach((field) => field.disabled = !enabled);
};

const setAdFormAddress = (lat, lng) => document.querySelector('#address').value = `${lng}, ${lat}`;


export {
  setFormInteractivity,
  setAdFormAddress
};
