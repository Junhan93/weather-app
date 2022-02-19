const request = require('request');

// abstraction callback
const geocode = (address, callback) => {
    // call the callback once we have the lat and lon

    const access_token = 'pk.eyJ1IjoianVuaGFuOTMiLCJhIjoiY2t6cWgybWR0MDc4cTJvcWt4eHN2Ym5iNyJ9.9btGxLOws931l84IQ4J0PA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${access_token}`;

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            let error = 'Unable to connect to location services!';
            callback(error, undefined);
        } else if (body.features.length === 0) {
            let error = 'Unable to find location. Try another search.';
            callback(error, undefined);
        } else {
            const { center, place_name } = body.features[0];
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location: place_name
            });
        }
    })
}

module.exports = geocode;
