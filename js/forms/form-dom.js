const AdForm = (() => {
  const adForm = document.querySelector('.ad-form');

  return {
    FORM_ELEMENT: adForm,
    AVATAR_INPUT: adForm.querySelector('#avatar'),
    AVATAR_DROP_ZONE_ELEMENT: adForm.querySelector('.ad-form-header__drop-zone'),
    AVATAR_PREVIEW_ELEMENT: adForm.querySelector('.ad-form-header__preview > img'),
    TITLE_INPUT: adForm.querySelector('#title'),
    TYPE_SELECT: adForm.querySelector('#type'),
    PRICE_INPUT: adForm.querySelector('#price'),
    ROOM_NUMBER_SELECT: adForm.querySelector('#room_number'),
    CAPACITY_SELECT: adForm.querySelector('#capacity'),
    ADDRESS_INPUT: adForm.querySelector('#address'),
    TIME_IN_SELECT: adForm.querySelector('#timein'),
    TIME_OUT_SELECT: adForm.querySelector('#timeout'),
    IMAGES_INPUT: adForm.querySelector('#images'),
    IMAGES_DROP_ZONE_ELEMENT: adForm.querySelector('.ad-form__drop-zone'),
    IMAGES_PREVIEW_ELEMENT: adForm.querySelector('.ad-form__photo'),
    RESET_BUTTON: adForm.querySelector('.ad-form__reset'),
  };
})();

const MapFilterForm = (() => {
  const mapFilterForm = document.querySelector('.map__filters');

  return {
    FORM_ELEMENT: mapFilterForm,
    TYPE_SELECT: mapFilterForm.querySelector('#housing-type'),
    PRICE_SELECT: mapFilterForm.querySelector('#housing-price'),
    ROOMS_SELECT: mapFilterForm.querySelector('#housing-rooms'),
    GUESTS_SELECT: mapFilterForm.querySelector('#housing-guests'),
    FEATURES_CHECKBOXES: [...mapFilterForm.querySelectorAll('#housing-features .map__checkbox')],
  };
})();


export { AdForm, MapFilterForm };
