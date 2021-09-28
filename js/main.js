const getRandomInt = function(from, to) {
  if (from > to) {
    [to, from] = [from, to];
  } else if (from === to) {
    return from;
  }

  return Math.floor(Math.random() * (to - from + 1)) + from;
};

getRandomInt(10, 20);

const getRandomFixedPoint = function(from, to, digits) {
  const significantFrom = Math.floor(from * (10 ** digits));
  const significantTo = Math.floor(to * (10 ** digits));

  return getRandomInt(significantFrom, significantTo) / (10 ** digits);
};

getRandomFixedPoint(1.5, 1.6, 2);
