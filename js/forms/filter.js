import { setFormInteractivity, setListener } from './utils.js';
import { closeMapPopup, drawDebouncedSimilarMarkers } from '../map.js';


const ANY_VALUE = 'any';

const LOW_PRICE = 'low';
const MIDDLE_PRICE = 'middle';
const HIGH_PRICE  = 'high';

const PriceLevel = {
  LOW: { MAX: 10000 },
  MIDDLE: { MIN: 10000, MAX: 50000 },
  HIGH: { MIN: 50000 },
};


const isNumber = (number) => !isNaN(number);

const isEqualFilter = (filtratedValue, filterParameter) => {
  if (filterParameter === ANY_VALUE) {
    return true;
  }

  filterParameter = isNumber(filterParameter) ? Number(filterParameter) : filterParameter;

  return filtratedValue === filterParameter;
};

const filterType = (announcement, filterParameter) => (
  isEqualFilter(announcement.offer.type, filterParameter)
);

const filterRooms = (announcement, filterParameter) => (
  isEqualFilter(announcement.offer.rooms, filterParameter)
);

const filterGuests = (announcement, filterParameter) => (
  isEqualFilter(announcement.offer.guests, filterParameter)
);

const filterPrice = (announcement, filterParameter) => {
  const price = announcement.offer.price;

  switch (filterParameter) {
    case ANY_VALUE:
      return true;
    case MIDDLE_PRICE:
      return price >= PriceLevel.MIDDLE.MIN
        && price <= PriceLevel.MIDDLE.MAX;
    case LOW_PRICE:
      return price < PriceLevel.LOW.MAX;
    case HIGH_PRICE:
      return price > PriceLevel.HIGH.MIN;
    default:
      return false;
  }
};

const filterFeatures = (announcement, filterParameters) => {
  const features = announcement.offer.features;

  return filterParameters.every((parameter) => features ? features.includes(parameter) : false);
};

const getHousingFeaturesParameters = (filterForm) => {
  const featureInputs = filterForm.querySelectorAll('#housing-features input:checked');

  return [...featureInputs].map((featureInput) => featureInput.value);
};

const filterAnnouncement = (filters, filterParameters, announcement) => {
  for (const [filterName, filter] of Object.entries(filters)) {
    if (!filter(announcement, filterParameters[filterName])) {
      return false;
    }
  }

  return true;
};

const createAnnouncementsFilter = () => {
  const filters = {
    type: filterType,
    price: filterPrice,
    rooms: filterRooms,
    guests: filterGuests,
    features: filterFeatures,
  };

  const filterForm = document.querySelector('.map__filters');
  const filterParameters = {
    type: filterForm.querySelector('#housing-type').value,
    price: filterForm.querySelector('#housing-price').value,
    rooms: filterForm.querySelector('#housing-rooms').value,
    guests: filterForm.querySelector('#housing-guests').value,
    features: getHousingFeaturesParameters(filterForm),
  };

  return (announcements, maxElements) => {
    const similarAnnouncements = [];

    for (const announcement of announcements) {
      if (filterAnnouncement(filters, filterParameters, announcement)) {
        similarAnnouncements.push(announcement);
      }

      if (similarAnnouncements.length >= maxElements) {
        break;
      }
    }

    return similarAnnouncements;
  };
};

const onChangeFilterHandler = () => {
  closeMapPopup();
  drawDebouncedSimilarMarkers();
};

const setFiltersHandling = (enabled) => {
  const filterElements = document.querySelectorAll('.map__filter, .map__features');
  filterElements.forEach((filterElement) => (
    setListener(filterElement, 'input', onChangeFilterHandler, enabled)
  ));
};

const setFilterInteractivity = (enabled) => {
  setFormInteractivity('map__filters', '.map__filter, .map__features', enabled);
  setFiltersHandling(true);
};


export { setFilterInteractivity, createAnnouncementsFilter };
