import {
  registerValidationHandlers,
  unregisterValidationHandlers,
  createValidationHandlers
} from '../utils/validation.js';


const printTileInputValidity = (titleInput) => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Заголовок обязателен для заполнения!');
  } else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity(`Заголовок объявления должен содержать минимум ${titleInput.minLength} символов!`);
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity(`Заголовок объявления должен содержать максимум ${titleInput.maxLength} символов!`);
  } else {
    titleInput.setCustomValidity('');
  }
};

const printPriceInputValidity = (priceInput) => {
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Цена обязательна для заполнения!');
  } else if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(`Цена для выбранного типа жилья должна быть больше ${priceInput.min}!`);
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity(`Цена должна быть меньше ${priceInput.max}!`);
  } else {
    priceInput.setCustomValidity('');
  }
};

const printCapacitySelectValidity = (capacitySelect) => {
  const roomsSelect = document.querySelector('#room_number');

  const roomsToCapacity = {
    '100': ['0'],
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
  };

  if (!roomsToCapacity[roomsSelect.value].includes(capacitySelect.value)) {
    capacitySelect.setCustomValidity('Количество мест не соответствует числу комнат!');
  } else {
    capacitySelect.setCustomValidity('');
  }
};

const setMinPrice = () => {
  const buildTypeSelect = document.querySelector('#type');
  const priceInput = document.querySelector('#price');

  const buildTypeToMinPrice = {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  };

  priceInput.min = buildTypeToMinPrice[buildTypeSelect.value];
};

const {
  onInputHandler: onTitleInputHandler,
  onInvalidHandler: onTitleInvalidHandler,
} = createValidationHandlers(printTileInputValidity);

const {
  onInputHandler: onPriceInputHandler,
  onInvalidHandler: onPriceInvalidHandler,
} = createValidationHandlers(printPriceInputValidity);

const {
  onInputHandler: onCapacityInputHandler,
  onInvalidHandler: onCapacityInvalidHandler,
} = createValidationHandlers(printCapacitySelectValidity);

const onTypeInputHandler = () => {
  setMinPrice();
};

const setAdFormValidationHandling = (enabled) => {
  const adForm = document.querySelector('.ad-form');

  if (enabled) {
    setMinPrice();
    adForm.querySelector('#type').addEventListener('input', onTypeInputHandler);
    registerValidationHandlers(adForm.querySelector('#title'), onTitleInputHandler, onTitleInvalidHandler);
    registerValidationHandlers(adForm.querySelector('#price'), onPriceInputHandler, onPriceInvalidHandler);
    registerValidationHandlers(adForm.querySelector('#capacity'), onCapacityInputHandler, onCapacityInvalidHandler);
  } else {
    adForm.querySelector('#type').removeEventListener('input', onTypeInputHandler);
    unregisterValidationHandlers(adForm.querySelector('#title'), onTitleInputHandler, onTitleInvalidHandler);
    unregisterValidationHandlers(adForm.querySelector('#price'), onPriceInputHandler, onPriceInvalidHandler);
    unregisterValidationHandlers(adForm.querySelector('#capacity'), onCapacityInputHandler, onCapacityInvalidHandler);
  }
};


export { setAdFormValidationHandling };
