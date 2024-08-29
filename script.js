const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weather-info');
const searchButton = document.getElementById('search-button');
const detectLocationButton = document.getElementById('detect-location');

// Function to fetch weather data
async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    displayWeatherData(data);
}

// Function to display weather data
function displayWeatherData(data) {
    weatherInfo.innerHTML = '';
    data.list.slice(0, 5).forEach((day) => {
        const date = new Date(day.dt_txt).toLocaleDateString();
        const temp = day.main.temp;
        const description = day.weather[0].description;
        
        const weatherDay = document.createElement('div');
        weatherDay.classList.add('weather-day');
        weatherDay.innerHTML = `
            <h3>${date}</h3>
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${description}</p>
        `;
        weatherInfo.appendChild(weatherDay);
    });
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = document.getElementById('location-input').value;
    if (city) {
        getWeatherData(city);
    }
});

// Function to detect user's location
function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            displayWeatherData(data);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Event listener for detect location button
detectLocationButton.addEventListener('click', detectLocation);
