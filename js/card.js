import { copyTemplate } from './utils/dom.js';
import {
  fillText,
  fillHTML,
  fillSrc,
  fillFeatures,
  fillPhotos
} from './utils/fillers.js';


const getFilledCard = (announcement) => {
  const popup = copyTemplate('#card');

  const buildingRuTranslate = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель',
  };

  const { offer, author } = announcement;

  fillText(popup.querySelector('.popup__title'), offer.title);
  fillText(popup.querySelector('.popup__text--address'), offer.address);
  fillHTML(
    popup.querySelector('.popup__text--price'),
    (price) => `${price} <span>₽/ночь</span>`,
    offer.price,
  );
  fillText(popup.querySelector('.popup__type'), buildingRuTranslate[offer.type]);
  fillText(
    popup.querySelector('.popup__text--capacity'),
    (rooms, guests) => `${rooms} комнаты для ${guests} гостей`,
    offer.rooms,
    offer.guests,
  );
  fillText(
    popup.querySelector('.popup__text--time'),
    (checkin, checkout) => `Заезд после ${checkin}, выезд до ${checkout}`,
    offer.checkin,
    offer.checkout,
  );
  fillText(popup.querySelector('.popup__description'), offer.description);
  fillSrc(popup.querySelector('.popup__avatar'), author.avatar);
  fillFeatures(popup.querySelector('.popup__features'), offer.features);
  fillPhotos(popup.querySelector('.popup__photos'), offer.photos);

  return popup;
};


export { getFilledCard };
