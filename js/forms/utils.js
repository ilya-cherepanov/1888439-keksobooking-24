const setFormInteractivity = (formClass, formFieldsSelector, enabled) => {
  const form = document.querySelector(`.${formClass}`);
  const formFields = form.querySelectorAll(formFieldsSelector);

  if (enabled) {
    form.classList.remove(`${formClass}--disabled`);
    formFields.forEach((field) => field.disabled = false);
  } else {
    form.classList.add(`${formClass}--disabled`);
    formFields.forEach((field) => field.disabled = true);
  }
};


export { setFormInteractivity };
