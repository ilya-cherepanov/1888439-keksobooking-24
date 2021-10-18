const disableAdForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  adFormFieldsets.forEach((fieldset) => fieldset.disabled = true);
};

const disableFilter = () => {
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.add('map__filters--disabled');

  const mapFiltersFormFields = mapFiltersForm.querySelectorAll('.map__filter, .map__features');
  mapFiltersFormFields.forEach((field) => field.disabled = true);
};

const enableAdForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  adFormFieldsets.forEach((fieldset) => fieldset.disabled = false);
};

const enableFilter = () => {
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.remove('map__filters--disabled');

  const mapFiltersFormFields = mapFiltersForm.querySelectorAll('.map__filter, .map__features');
  mapFiltersFormFields.forEach((field) => field.disabled = false);
};

export { disableAdForm, disableFilter, enableAdForm, enableFilter };
