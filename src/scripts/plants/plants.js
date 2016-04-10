var $ = require('jquery');

module.exports = function(urls) {
  var P = {};
  P.Get = function(callback) {
    $.ajax({
      url: urls.Get
    }).done(function(data) {
      callback(data);
    });
  };
  return P;
};

