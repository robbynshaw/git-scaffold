module.exports = function (isTesting) {
  var urls = require('./urls.js')(isTesting);
  var plants = require('./plants.js')(urls);
  return plants;
};
