import { ACTORS_BASE_URL, ACTORS_API_KEY } from './config.js';

async function fetchRandomActor() {
  const response = await fetch(
    `${ACTORS_BASE_URL}/week?language=en-US&api_key=${ACTORS_API_KEY}`
  );

  if (!response.ok) {
    //Это проверка необходимa для того, чтобы fetch() правильно среагировал на статус кода 404, который, технически, не является ошибкой, но для клиента – это неуспешный результат.
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.results;
}

export { fetchRandomActor };
