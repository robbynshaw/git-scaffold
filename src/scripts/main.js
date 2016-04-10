var isTesting = true;

var plants = require('./plants')(isTesting);

plants.Get(function(data) {
  for (var plant in data.plants) {
    console.log(data.plants[plant].name);
  }
});
