// https://www.weatherapi.com/ -  Weather API

const WEATHER_API_KEY = '11847d1f4edf4f85a8584116261501';
const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1';

async function getWeather() {
  const response = await fetch(
    `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=auto:ip`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
}

const createWeatherMarkup = weatherData => {
  const { location, current } = weatherData;
  return `  
   <div class="weather__header">
    <h2 class="weather__location">${location.name}, ${location.country}</h2>
    <p class="weather__time">${location.localtime}</p>
  </div>

  <div class="weather__main">
    <img
      class="weather__icon"
      src="${current.condition.icon}"
      alt="${current.condition.text}"
      loading="lazy"
    />
    <p class="weather__condition">${current.condition.text}</p>
  </div>

  <div class="weather__temp">
    <p class="weather__value">t: ${current.temp_c}°C</p>
    <p class="weather__feels">
      Feels like: <span>${current.feelslike_c}°C</span>
    </p>
  </div>`;
};

export { createWeatherMarkup, getWeather };
