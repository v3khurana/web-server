const request = require("postman-request");

const geocode = (address, callback) => {
  const mapBoxURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidmtodXJhbmEiLCJhIjoiY2tsdGdhbm03MHBkZjJ2cDNycG84Z21ydiJ9.K6X471FyPcQozeTxuUCAcA";

  request({ url: mapBoxURL, json: true }, (error, response) => {
    if (error) {
      //callback("Unable to access mapbox service");
      callback("Unable to access mapbox service", undefined);
    } else if (response.body.features.length === 0) {
      //callback("Invalid input");
      callback("Invalid input", undefined);
    } else {
      callback(undefined, {
        Latitude: response.body.features[0].geometry.coordinates[0],
        Longitude: response.body.features[0].geometry.coordinates[1],
      });
    }
  });
};

module.exports = geocode;