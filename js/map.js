import { getFilledCard } from './card.js';
import { setAdFormAddress } from './forms/utils.js';


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


const initMap = (mapId, onMapLoadedHandler) => {
  const map = L.map(mapId)
    .on('load', onMapLoadedHandler)
    .setView({
      lat: TOKIO_LAT,
      lng: TOKIO_LNG,
    }, MAP_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  return map;
};

const createMarker = (lat, lng, isMain = false) => (
  L.marker(
    {
      lat,
      lng,
    },
    {
      icon: isMain ? MAIN_ICON : SECONDARY_ICON,
      draggable: isMain,
    },
  )
);

const drawSimilarMarkers = (map, announcements) => {
  announcements.forEach((announcement) => {
    const { lat, lng } = announcement.location;
    const pinMarker = createMarker(lat, lng);

    pinMarker.addTo(map);
    pinMarker.bindPopup(getFilledCard(announcement));
  });
};

const onMainPinMoveendHandler = ({ target }) => {
  const { lat, lng } = target.getLatLng();
  setAdFormAddress(lat, lng);
};

const drawMap = (onMapLoadedHandler) => {
  const map = initMap('map-canvas', onMapLoadedHandler);

  const mainPinMaker = createMarker(TOKIO_LAT, TOKIO_LNG, true);
  mainPinMaker.addTo(map);
  setAdFormAddress(TOKIO_LAT, TOKIO_LNG);

  mainPinMaker.on('moveend', onMainPinMoveendHandler);
  return map;
};


export {
  drawMap,
  drawSimilarMarkers
};
