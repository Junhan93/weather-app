const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// define paths for Express config
const pathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs'); // express is looking for default 'views' directory
app.set('views', viewsPath); // custom directory for express
hbs.registerPartials(partialsPath); // in .hbs file, {{>}} no space in-between curly braces

// setup static directory to serve
app.use(express.static(pathDirectory)); // this links to index.html

app.get('/', (req, res) => {
    // (view to render, object that I want my view to access)
    res.render('index', {
        title: 'Weather',
        description: 'Use this site to search for a forecast',
        name: 'Junhan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        description: 'A very accurate weather forecast app',
        name: 'Junhan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'A list of services for you',
        name: 'Junhan'
    });
});

app.get('/weather', (req, res) => {
    const location = req.query.address;

    if (!location) {
        return res.send({
            error: 'Please provide an address'
        });
    }
    geocode(location, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            console.log(error);
        }
        // callback chaining
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                res.send({error: 'Unable to find location. Try another search.'});
            } else {
                const weather = {
                    forecast: forecastData,
                    location: location
                }
                res.send(weather);
            }
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    errorMsg = 'Help article not found';
    res.render('error', {
        error: errorMsg
    });
});

// this error route has to come last because express its going to look for a match synchronously
app.get('*', (req, res) => {
    errorMsg = 'Not found';
    res.render('error', {
        name: 'Junhan',
        error: errorMsg
    });
});



app.listen(3000, () => {
    console.log('Server is running on port: 3000');
});
