import { getFilledCard } from './card.js';
import { setAdFormAddress } from './forms/utils.js';
import { setAdFormInteractivity } from './forms/ad-form.js';
import { setFilterInteractivity } from './forms/filter.js';
import { loadJsonData } from './utils/api.js';


const ANNOUNCEMENT_COUNT = 10;

const TOKIO_LAT = 35.675;
const TOKIO_LNG = 139.75;
const MAP_SCALE = 13;

const MAIN_ICON_SIZE = 52;
const MAIN_ICON = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [MAIN_ICON_SIZE, MAIN_ICON_SIZE],
  iconAnchor: [MAIN_ICON_SIZE / 2, MAIN_ICON_SIZE],
});

const SECONDARY_ICON_SIZE = 40;
const SECONDARY_ICON = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [SECONDARY_ICON_SIZE, SECONDARY_ICON_SIZE],
  iconAnchor: [SECONDARY_ICON_SIZE / 2, SECONDARY_ICON_SIZE],
});

const MAIN_PIN_MARKER = createMarker(TOKIO_LAT, TOKIO_LNG, true)
  .on('moveend', onMainPinMoveendHandler);

const MAP = L.map('map-canvas')
  .on('load', onMapLoadedHandler);


const loadOSMMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(MAP);
};


// Нужен hoisting
function createMarker(lat, lng, isMain = false) {
  return L.marker(
    {
      lat,
      lng,
    },
    {
      icon: isMain ? MAIN_ICON : SECONDARY_ICON,
      draggable: isMain,
    },
  );
}

const drawSimilarMarkers = (map, announcements) => {
  announcements.forEach((announcement) => {
    const { lat, lng } = announcement.location;
    const pinMarker = createMarker(lat, lng);

    pinMarker.addTo(map);
    pinMarker.bindPopup(getFilledCard(announcement));
  });
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.querySelector('.map').prepend(alertContainer);
};

// Нужен hoisting
async function onMapLoadedHandler({ target }) {
  setAdFormInteractivity(true);

  let announcements = null;
  try {
    announcements = await loadJsonData('https://24.javascript.pages.academy/keksobooking/data');
  } catch(error) {
    showAlert('Не удалось загрузить данные. Попробуйте позже');
    return;
  }

  drawSimilarMarkers(target, announcements.slice(0, ANNOUNCEMENT_COUNT - 1));
  setFilterInteractivity(true);
}

// Нужен hoisting
function onMainPinMoveendHandler({ target }) {
  const { lat, lng } = target.getLatLng();
  setAdFormAddress(lat, lng);
}

const drawMap = () => {
  MAP.setView({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  }, MAP_SCALE);
  loadOSMMap();
  MAIN_PIN_MARKER.addTo(MAP);
  setAdFormAddress(TOKIO_LAT, TOKIO_LNG);
};

const resetMap = () => {
  MAP.closePopup();
  setAdFormAddress(TOKIO_LAT, TOKIO_LNG);
  MAIN_PIN_MARKER.setLatLng({lat: TOKIO_LAT, lng: TOKIO_LNG});
};


export {
  drawMap,
  drawSimilarMarkers,
  resetMap
};
