import { WEATHER_BASE_URL, WEATHER_API_KEY } from './config.js';

async function getWeather() {
  const response = await fetch(
    `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=auto:ip`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
}

export { getWeather };
