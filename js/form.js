const setAdFormInteractivity = (enabled) => {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');

  if (enabled) {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => fieldset.disabled = false);
  } else {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => fieldset.disabled = true);
  }
};

const setFilterInteractivity = (enabled) => {
  const mapFiltersForm = document.querySelector('.map__filters');
  const mapFiltersFormFields = mapFiltersForm.querySelectorAll('.map__filter, .map__features');

  if (enabled) {
    mapFiltersForm.classList.remove('map__filters--disabled');
    mapFiltersFormFields.forEach((field) => field.disabled = false);
  } else {
    mapFiltersForm.classList.add('map__filters--disabled');
    mapFiltersFormFields.forEach((field) => field.disabled = true);
  }
};

export {
  setAdFormInteractivity,
  setFilterInteractivity
};
