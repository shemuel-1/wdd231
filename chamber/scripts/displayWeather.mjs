const weatherDiv = document.querySelector('#weatherDiv');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const forecast = document.querySelector('#forecast');
const icon = document.querySelector('#weatherIcon');

const apiKey = '904b5526ae9a41f3d298ad259050123a'
const lat = "5.554699019942336"
const long = "-0.19324008345646485"

const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`

async function apiFetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text);
        }
    } catch (error) {
        console.log(error);
    }
}

async function apiFetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text);
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    if (temperature) temperature.innerHTML = `${data.main.temp}&deg;C`;
    if (description) description.innerHTML = data.weather[0].description;
    if (icon) {
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.setAttribute('src', iconsrc);
        icon.setAttribute('alt', data.weather[0].description);
    }
}

function displayForecast(data) {
    if (!forecast || !data || !data.list || data.list.length <= 16) return;
    forecast.innerHTML = `${data.list[16].main.temp}&deg;C`;
}

apiFetchWeather();
apiFetchForecast();