document.addEventListener('DOMContentLoaded', () => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        }, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

document.getElementById('search-button').addEventListener('click', getWeatherByCity);

async function getWeatherByCity() {
    const city = document.getElementById('search-input').value;
    const apiKey = 'cbc0e5c8c42b5ee8b001ef2c58d229d2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('current-city').innerText = error.message;
    }
}

async function getWeatherByCoords(latitude, longitude) {
    const apiKey = 'cbc0e5c8c42b5ee8b001ef2c58d229d2';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('current-city').innerText = error.message;
    }
}

function displayWeather(data) {
    document.querySelector('.city').innerText = data.name;
    document.querySelector('.temp').innerText = Math.round(data.main.temp);
    document.querySelector('.humidity').innerText = `${data.main.humidity}%`;
    document.querySelector('.wind-speed').innerText = `${data.wind.speed} km/h`;
    document.querySelector('.precipitation').innerText = `${data.weather[0].description}`;
    document.querySelector('.current-weather img').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    const now = new Date();
    document.getElementById('day').innerText = now.toLocaleString('en-US', { weekday: 'long' });
    document.getElementById('time').innerText = now.toLocaleTimeString('en-US');
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Function to toggle between Celsius and Fahrenheit
document.getElementById('celsius').addEventListener('click', () => {
    document.querySelector('.units a').classList.remove('active');
    document.getElementById('celsius').classList.add('active');
    getWeatherByCity();
});

document.getElementById('fahrenheit').addEventListener('click', () => {
    document.querySelector('.units a').classList.remove('active');
    document.getElementById('fahrenheit').classList.add('active');
    getWeatherByCity();
});
