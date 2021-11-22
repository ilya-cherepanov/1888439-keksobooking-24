import { AdForm } from './form-dom.js';
import {
  createValidationHandlers,
  setInputHandler,
  setValidationHandlers
} from '../utils/validation.js';
import {
  resetAvatarPreview,
  resetImagesPreview,
  drawInvalidFrame,
  setMinPrice
} from './utils.js';


const IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const OFFER_IMAGE_PREVIEW_SIZE = '70';

const RoomsToCapacity = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
};


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
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(`Цена для выбранного типа жилья должна быть больше ${priceInput.min}!`);
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity(`Цена должна быть меньше ${priceInput.max}!`);
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Цена обязательна для заполнения!');
  } else {
    priceInput.setCustomValidity('');
  }

  drawInvalidFrame(priceInput);
};

const printCapacitySelectValidity = (capacitySelect, roomsSelect) => {
  roomsSelect = roomsSelect || AdForm.ROOM_NUMBER_SELECT;

  if (!RoomsToCapacity[roomsSelect.value].includes(capacitySelect.value)) {
    capacitySelect.setCustomValidity('Количество мест не соответствует числу комнат!');
  } else {
    capacitySelect.setCustomValidity('');
  }

  drawInvalidFrame(capacitySelect);
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

  if (AdForm.PRICE_INPUT.value) {
    AdForm.PRICE_INPUT.reportValidity();
  }
};

const onRoomNumberInputHandler = ({ target }) => {
  printCapacitySelectValidity(AdForm.CAPACITY_SELECT, target);
  AdForm.CAPACITY_SELECT.reportValidity();
};

const onTimeInputHandler = ({ target }) => {
  AdForm.TIME_IN_SELECT.value = AdForm.TIME_OUT_SELECT.value = target.value;
};

const checkFileIsImage = (file) => {
  const fileName = file.name.toLowerCase();

  return IMAGE_TYPES.some((imageType) => (
    fileName.endsWith(imageType)
  ));
};

const drawAvatarPreview = (file) => {
  AdForm.AVATAR_PREVIEW_ELEMENT.src = URL.createObjectURL(file);
};

const drawImagesPreview = (file) => {
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);
  image.width = OFFER_IMAGE_PREVIEW_SIZE;

  AdForm.IMAGES_PREVIEW_ELEMENT.innerHTML = '';
  AdForm.IMAGES_PREVIEW_ELEMENT.append(image);
};

const checkValidityAndPreview = (target, drawPreview, resetPreview, markedElement) => {
  const file = target.files[0];
  const matches = checkFileIsImage(file);

  if (matches) {
    drawPreview(file);
    target.setCustomValidity('');
  } else {
    resetPreview();
    target.setCustomValidity('Тип файла не поддерживается!');
  }

  target.reportValidity();
  drawInvalidFrame(target, markedElement);
};

const onAvatarInputHandler = ({ target }) => {
  checkValidityAndPreview(target, drawAvatarPreview, resetAvatarPreview, AdForm.AVATAR_DROP_ZONE_ELEMENT);
};

const onImagesInputHandler = ({ target }) => {
  checkValidityAndPreview(target, drawImagesPreview, resetImagesPreview, AdForm.IMAGES_DROP_ZONE_ELEMENT);
};

const setAdFormValidationHandling = (enabled) => {
  setMinPrice();

  setInputHandler(AdForm.TYPE_SELECT, onTypeInputHandler, enabled);
  setInputHandler(AdForm.TIME_IN_SELECT, onTimeInputHandler, enabled);
  setInputHandler(AdForm.TIME_OUT_SELECT, onTimeInputHandler, enabled);
  setInputHandler(AdForm.AVATAR_INPUT, onAvatarInputHandler, enabled);
  setInputHandler(AdForm.IMAGES_INPUT, onImagesInputHandler, enabled);
  setInputHandler(AdForm.ROOM_NUMBER_SELECT, onRoomNumberInputHandler, enabled);
  setValidationHandlers(AdForm.TITLE_INPUT, onTitleInputHandler, onTitleInvalidHandler, enabled);
  setValidationHandlers(AdForm.PRICE_INPUT, onPriceInputHandler, onPriceInvalidHandler, enabled);
  setValidationHandlers(AdForm.CAPACITY_SELECT, onCapacityInputHandler, onCapacityInvalidHandler, enabled);
};


export { setAdFormValidationHandling };
