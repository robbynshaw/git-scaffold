module.exports = function (isTesting) {
  var U = {};
  if (isTesting) {
    U.Get = '/testing-data/plants.json';
  } else {
    U.Get = '';
  }
  return U;
};
