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


export {
  getRandomInt,
  getRandomFixedPoint,
  getRandomArrayElements,
  getOneRandomArrayElement
};
