import { setFormInteractivity, setListener } from './utils.js';
import { closeMapPopup, drawDebouncedSimilarMarkers } from '../map.js';


const isNumber = (number) => !isNaN(number);

const isEqualFilter = (filtratedValue, filterParameter) => {
  if (filterParameter === 'any') {
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
    case 'any':
      return true;
    case 'middle':
      return price >= 10000 && price <= 50000;
    case 'low':
      return price < 10000;
    case 'high':
      return price > 50000;
    default:
      return false;
  }
};

const filterFeatures = (announcement, filterParameters) => {
  const features = announcement.offer.features;

  return filterParameters.every((parameter) => features ? features.includes(parameter) : false);
};

const getHousingFeaturesParameters = () => {
  const featureInputs = document.querySelectorAll('#housing-features input:checked');

  return [...featureInputs].map((featureInput) => featureInput.value);
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
    features: getHousingFeaturesParameters(),
  };

  return (announcements, maxElements) => {
    const similarAnnouncements = announcements.filter((announcement) => {
      for (const [filterName, filter] of Object.entries(filters)) {
        if (!filter(announcement, filterParameters[filterName])) {
          return false;
        }
      }

      return true;
    });

    return similarAnnouncements.slice(0, maxElements);
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
