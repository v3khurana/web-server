const request = require("postman-request");

const forecast = (location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6c62fc8246af9647486e073b1ae897e5&query=" +
    encodeURIComponent(location);

  request({ url: url, json: true }, (error, response) => {
    //console.log(response.body.current)
    if (error) {
      callback("Unable to connect to forecast service", undefined);
    } else if (response.body.error) {
      callback("Invalid input", undefined);
    } else {
      callback(
        "It is currently " +
          response.body.current.temperature +
          " degress out. There is a " +
          response.body.current.precip +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
