import {
  createValidationHandlers,
  setInputHandler,
  setValidationHandlers
} from '../utils/validation.js';
import {
  resetAvatarPreview,
  resetImagesPreview,
  drawInvalidFrame
} from './utils.js';


const IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


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

  drawInvalidFrame(titleInput);
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

  drawInvalidFrame(priceInput);
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

  drawInvalidFrame(capacitySelect);
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

  priceInput.placeholder = priceInput.min = buildTypeToMinPrice[buildTypeSelect.value];
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

const onTimeInputHandler = ({ target }) => {
  const anotherTimeSelect = document.querySelector(target.id === 'timein' ? '#timeout' : '#timein');
  anotherTimeSelect.value = target.value;
};

const checkFileIsImage = (file) => {
  const fileName = file.name.toLowerCase();

  return IMAGE_TYPES.some((imageType) => (
    fileName.endsWith(imageType)
  ));
};

const drawAvatarPreview = (file) => {
  const avatarPreview = document.querySelector('.ad-form-header__preview > img');
  avatarPreview.src = URL.createObjectURL(file);
};

const drawImagesPreview = (file) => {
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);

  const adFormPhotos = document.querySelector('.ad-form__photo');
  adFormPhotos.innerHTML = '';
  adFormPhotos.append(image);
};

const checkValidityAndPreview = (target, drawPreview, resetPreview, markedElementClass) => {
  const file = target.files[0];
  const matches = checkFileIsImage(file);

  if (matches) {
    drawPreview(file);
    target.setCustomValidity('');
  } else {
    resetPreview();
    target.setCustomValidity('Тип файла не поддерживается!');
  }

  drawInvalidFrame(target, document.querySelector(`.${markedElementClass}`));
};

const onAvatarInputHandler = ({ target }) => {
  checkValidityAndPreview(target, drawAvatarPreview, resetAvatarPreview, 'ad-form-header__drop-zone');
};

const onImagesInputHandler = ({ target }) => {
  checkValidityAndPreview(target, drawImagesPreview, resetImagesPreview, 'ad-form__drop-zone');
};

const setAdFormValidationHandling = (enabled) => {
  const adForm = document.querySelector('.ad-form');

  setMinPrice();

  setInputHandler(adForm.querySelector('#type'), onTypeInputHandler, enabled);
  setInputHandler(adForm.querySelector('#timein'), onTimeInputHandler, enabled);
  setInputHandler(adForm.querySelector('#timeout'), onTimeInputHandler, enabled);
  setInputHandler(adForm.querySelector('#avatar'), onAvatarInputHandler, enabled);
  setInputHandler(adForm.querySelector('#images'), onImagesInputHandler, enabled);
  setValidationHandlers(adForm.querySelector('#title'), onTitleInputHandler, onTitleInvalidHandler, enabled);
  setValidationHandlers(adForm.querySelector('#price'), onPriceInputHandler, onPriceInvalidHandler, enabled);
  setValidationHandlers(adForm.querySelector('#capacity'), onCapacityInputHandler, onCapacityInvalidHandler, enabled);
};


export { setAdFormValidationHandling };
