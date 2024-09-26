var _a;
(_a = document.getElementById('zipForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
    e.preventDefault();
    var zipCodeInput = document.getElementById('zipCode');
    var zipCode = zipCodeInput.value;
    var apiKey = 'e71e04d4e636ef92b7a43fb0f32549c5';
    var weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`;
    var zipApiUrl = `https://api.zippopotam.us/us/${zipCode}`;

    // Fetch weather data
    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data fetch error');
            }
            return response.json();
        })
        .then(weatherData => {
            if (weatherData.cod === '404') {
                alert('City not found. Please enter a valid zip code.');
                return;
            }
            // Fetch zip code data
            fetch(zipApiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Zip code data fetch error');
                    }
                    return response.json();
                })
                .then(zipData => {
                    var currentDate = new Date().toLocaleDateString();
                    var city = weatherData.name;
                    var state = zipData.places[0]['state abbreviation'];
                    var currentTemp = weatherData.main.temp;
                    var currentConditions = weatherData.weather[0].description;
                    var tempHiLo = `${weatherData.main.temp_max} / ${weatherData.main.temp_min}`;
                    document.getElementById('currentDate').innerText = currentDate;
                    document.getElementById('city').innerText = city;
                    document.getElementById('state').innerText = state;
                    document.getElementById('currentTemp').innerText = currentTemp;
                    document.getElementById('currentConditions').innerText = currentConditions;
                    document.getElementById('tempHiLo').innerText = tempHiLo;
                    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    document.getElementById('time').innerText = time;
                    console.log('Current conditions:', currentConditions);
                    document.getElementById('weatherData').classList.remove('hidden');
                })
                .catch(error => {
                    console.error('Error fetching zip code data:', error);
                    alert('Error fetching location data. Please try again later.');
                });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
});
