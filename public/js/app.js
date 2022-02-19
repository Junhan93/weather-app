// fetch random words
// let url = 'http://puzzle.mead.io/puzzle';
let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?access_token=pk.eyJ1IjoianVuaGFuOTMiLCJhIjoiY2t6cWgybWR0MDc4cTJvcWt4eHN2Ym5iNyJ9.9btGxLOws931l84IQ4J0PA';
let forecastURL = 'http://api.weatherstack.com/current?access_key=1d5bf1086bdf6c4d249e5ad9de19c0c6&query=';

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#address');
const messageTwo = document.querySelector('#forecast');
const errorMessage = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent refresh browser
    messageOne.textContent = '';
    messageTwo.textContent = '';
    errorMessage.textContent = '';
    const address = search.value;

    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.style.color = 'Red';
                errorMessage.textContent = data.error;
            } else {
                messageOne.textContent = 'Loading forecast information...';
                setTimeout(() => {
                    search.value = '';
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }, 2000);
            }
        })
    });
});
