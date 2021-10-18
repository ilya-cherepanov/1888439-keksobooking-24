const fill = (element, stringTemplateOrValue, setter, ...values) => {
  if (typeof stringTemplateOrValue === 'function' && values.every((value) => !!value)) {
    setter(element, stringTemplateOrValue(...values));
    return;
  }

  if (stringTemplateOrValue) {
    setter(element, stringTemplateOrValue);
    return;
  }

  element.classList.add('hidden');
  element.innerHTML = '';
};

const setHTML = (element, value) => element.innerHTML = value;
const setText = (element, value) => element.textContent = value;
const setSrc = (element, value) => element.src = value;

const fillText = (element, stringTemplateOrValue, ...values) => {
  fill(element, stringTemplateOrValue, setText, ...values);
};

const fillHTML = (element, stringTemplateOrValue, ...values) => {
  fill(element, stringTemplateOrValue, setHTML, ...values);
};

const fillSrc = (element, value) => {
  fill(element, value, setSrc);
};

const fillByArray = (element, array, setter) => {
  if (array.length === 0) {
    element.classList.add('hidden');
    element.innerHTML = '';
    return;
  }

  setter(element, array);
};

const setFeatures = (featuresElement, features) => {
  const featureSelector = features
    .map((feature) => `:not(.popup__feature--${feature})`)
    .join('');

  featuresElement.querySelectorAll(featureSelector).forEach(
    (featureNode) => featureNode.remove(),
  );
};

const fillFeatures = (featuresElement, features) => {
  fillByArray(featuresElement, features, setFeatures);
};

const setPhotos = (photosElement, photos) => {
  photos.forEach((photo, index) => {
    const photoElement = photosElement.querySelector('.popup__photo[src=""]');

    if (index < photos.length - 1) {
      photosElement.appendChild(photoElement.cloneNode());
    }

    photoElement.src = photo;
  });
};

const fillPhotos = (photosElement, photos) => {
  fillByArray(photosElement, photos, setPhotos);
};


export {
  fillText,
  fillHTML,
  fillSrc,
  fillFeatures,
  fillPhotos
};
