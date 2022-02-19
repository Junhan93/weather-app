const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const access_token = '1d5bf1086bdf6c4d249e5ad9de19c0c6';
    const url = `http://api.weatherstack.com/current?access_key=${access_token}&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const { weather_descriptions, feelslike } = body.current;
            callback(undefined, weather_descriptions[0] + ' weather that feels like ' + feelslike + " degree celcius.");
        }
    })
}

module.exports = forecast;
