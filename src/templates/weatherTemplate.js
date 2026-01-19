// https://www.weatherapi.com/ -  Weather API

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

export { createWeatherMarkup };
