document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    getWeatherBtn.addEventListener('click', () => {
        const cityName = cityInput.value.trim();

        if (cityName === '') {
            weatherInfo.innerHTML = '<p class="text-danger">Please enter a city name.</p>';
            return;
        }

        getWeather(cityName)
            .then(displayWeather)
            .catch(error => {
                weatherInfo.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
            });
    });

    function getWeather(city) {
        const apiKey = '0dce36d9557944ea98f5c6999a305a22'; // Replace with your actual API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found.');
                }
                return response.json();
            });
            
    }

    function displayWeather(data) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;

        const weatherHtml = `
            <p><strong>Weather:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
        `;

        weatherInfo.innerHTML = weatherHtml;
    }
});
