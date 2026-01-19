// https://developer.themoviedb.org/docs/getting-started - TMDB
// https://developer.themoviedb.org/docs/image-basics - документация о картинках
// https://developer.themoviedb.org/reference/trending-people - документация о trending people
import { fetchRandomActor } from '../../api/movie-api.js';

const getRandomIndex = max => {
  return Math.floor(Math.random() * max);
};

async function getActorForQuiz() {
  const actorsArr = await fetchRandomActor();
  const randomIndex = getRandomIndex(actorsArr.length);
  const actor = actorsArr[randomIndex];
  return actor;
}

export { getActorForQuiz };
