import {
  ACTORS_BASE_URL,
  ACTORS_API_KEY,
  ACTOR_DETAILS_URL,
} from './config.js';

async function fetchRandomActor() {
  const response = await fetch(
    `${ACTORS_BASE_URL}/person/popular?api_key=${ACTORS_API_KEY}&page=6`
  );

  if (!response.ok) {
    //Это проверка необходимa для того, чтобы fetch() правильно среагировал на статус кода 404, который, технически, не является ошибкой, но для клиента – это неуспешный результат.
    throw new Error(response.statusText);
  }
  const data = await response.json();
  console.log('fetchRandomActor', data.results);
  return data.results;
}

// https://api.themoviedb.org/3/person/{person_id}
// https://developer.themoviedb.org/reference/person-details

async function fetchActorInfo(actor_id) {
  const response = await fetch(
    `${ACTOR_DETAILS_URL}/${actor_id}?api_key=${ACTORS_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}
async function fetchFilmsByActor(actor_id) {
  const response = await fetch(
    `${ACTOR_DETAILS_URL}/${actor_id}/movie_credits?api_key=${ACTORS_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.json();
  return data;
}

export { fetchRandomActor, fetchActorInfo, fetchFilmsByActor };
