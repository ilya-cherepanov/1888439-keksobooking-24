const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const LOCATION_PRECISION = 5;


const MIN_USER_ID = 1;
const MAX_USER_ID = 10;


const ANNOUNCEMENT_COUNT = 10;


const ALL_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_TYPES = [
  'hotel',
  'flat',
  'house',
  'bungalow',
  'palace',
];
const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const OFFER_TITLES = [
  'Сити Отель',
  'Гостевой Дом Гала Люкс',
  'Парадиз',
  'Ирбис',
  'Sunflower',
];
const OFFER_DESCRIPTIONS = [
  'Все классически оформленные номера располагают телевизором с плоским экраном, кондиционером и CD-плеером. В собственных ванных комнатах с душем предоставляется фен и бесплатные туалетно-косметические принадлежности. Кроме того, предлагаются услуги прачечной и гладильной.',
  'Отель с бесплатным Wi-Fi. На территории обустроена бесплатная частная парковка. Все номера оснащены телевизором. Стойка регистрации работает круглосуточно. Постояльцы могут пользоваться сауной и принадлежностями для барбекю. В окрестностях популярны велосипедные и пешие прогулки.',
  'Номера отеля с панорамным видом на пейзажный город или пруд оформлены в современном стиле. В числе удобств телевизор и сейф. По прибытии гостям предоставляется бутилированная минеральная вода. Ванная комната укомплектована феном, тапочками и бесплатными туалетно-косметическими принадлежностями. В номерах можно воспользоваться бесплатным Wi-Fi. Также в числе удобств выбор подушек. В распоряжении гостей отеля хорошо развитая инфраструктура: отделение банка, почта, магазины, спа-центр, фитнес-центр и камера хранения багажа.',
  'Этот отель, оформленный в стиле ренессанс, в 10 минутах ходьбы от красивого парка и в 10 минутах езды на метро от Кремля. К услугам гостей атриум со стеклянной крышей и неограниченный доступ к бассейну, сауне, паровой бане и тренажерному залу. На всей территории работает бесплатный Wi-Fi. Номера отеля с местом для работы оснащены телевизором со спутниковым телевидением и принадлежностями для чая/кофе. В современной ванной комнате предоставляются бесплатные туалетно-косметические принадлежности, тапочки и фен.',
  'В отеле к услугам гостей крытый бассейн, полностью оборудованный тренажерный зал и сауна. Гостям предоставляются бесплатный Wi-Fi на всей территории и бесплатная частная парковка. Светлые номера отеля оборудованы кондиционером и телевизором со спутниковыми каналами. К услугам гостей балкон и собственная ванная комната. Во всех люксах имеется спальня и отдельная гостиная с комфортабельным диваном. Каждое утро в светлом современном лобби-баре сервируют завтрак «шведский стол». В любое время суток в этом лобби-баре гости могут заказать блюда и напитки, посмотреть фильмы, бесплатно воспользоваться высокоскоростным Wi-Fi и даже организовать встречу.',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_PRICE = 100;
const MAX_PRICE = 10000;
const MAX_ROOMS = 20;
const MAX_GUESTS = 10;


const getRandomInt = (from, to) => {
  if (from > to) {
    [to, from] = [from, to];
  } else if (from === to) {
    return from;
  }

  return Math.floor(Math.random() * (to - from + 1)) + from;
};

const getRandomFixedPoint = (from, to, digits) => {
  const significantFrom = Math.floor(from * (10 ** digits));
  const significantTo = Math.floor(to * (10 ** digits));

  return getRandomInt(significantFrom, significantTo) / (10 ** digits);
};

const createLocation = () => ({
  lat: getRandomFixedPoint(MIN_LATITUDE, MAX_LATITUDE, LOCATION_PRECISION),
  lng: getRandomFixedPoint(MIN_LONGITUDE, MAX_LONGITUDE, LOCATION_PRECISION),
});

const createAuthor = (userId) => {
  const trimmedUserId = Math.max(MIN_USER_ID, Math.min(userId, MAX_USER_ID));

  const avatarId = `0${trimmedUserId}`.slice(-2);

  return {
    avatar: `img/avatars/user${avatarId}.png`,
  };
};

const getRandomArrayElements = (elementsNumber, arr) => {
  if (elementsNumber >= arr.length) {
    return [...arr];
  } else if (elementsNumber <= 0) {
    return [];
  }

  const availableFeatures = [...arr];

  return Array.from(
    { length: elementsNumber },
    () => availableFeatures.splice(getRandomInt(0, availableFeatures.length - 1), 1)[0],
  );
};

const getOneRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const createOffer = (location) => ({
  title: getOneRandomArrayElement(OFFER_TITLES),
  address: `${location.lat}, ${location.lng}`,
  price: getRandomInt(MIN_PRICE, MAX_PRICE),
  type: getOneRandomArrayElement(OFFER_TYPES),
  rooms: getRandomInt(1, MAX_ROOMS),
  guests: getRandomInt(1, MAX_GUESTS),
  checkin: getOneRandomArrayElement(CHECKIN_TIMES),
  checkout: getOneRandomArrayElement(CHECKOUT_TIMES),
  features: getRandomArrayElements(getRandomInt(0, ALL_FEATURES.length), ALL_FEATURES),
  description: getOneRandomArrayElement(OFFER_DESCRIPTIONS),
  photos: getRandomArrayElements(getRandomInt(0, PHOTOS.length), PHOTOS),
});

const createAnnouncement = (userId) => {
  const location = createLocation();

  return {
    author: createAuthor(userId),
    offer: createOffer(location),
    location,
  };
};


// eslint-disable-next-line no-unused-vars
const announcements = Array.from(
  { length: ANNOUNCEMENT_COUNT },
  (value, index) => createAnnouncement(index + 1),
);
