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
            const { weather_descriptions, temperature, feelslike } = body.current;
            const forecastMsg = weather_descriptions[0] + ' with a temperature of ' + temperature + '°C that feels like ' + feelslike + '°C.';
            callback(undefined, forecastMsg);
        }
    })
}

module.exports = forecast;
