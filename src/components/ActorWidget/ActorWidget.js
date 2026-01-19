// https://developer.themoviedb.org/docs/getting-started - TMDB
// https://developer.themoviedb.org/docs/image-basics - документация о картинках
// https://developer.themoviedb.org/reference/trending-people - документация о trending people
import { fetchRandomActor } from '../../api/movie-api.js';

async function getActorForQuiz() {
  const actorsArr = await fetchRandomActor();
  return actorsArr[getRandomIndex(actorsArr.length)];
}

const getRandomIndex = max => {
  return Math.floor(Math.random() * max);
};

// !Потом добавить в разметку модалки.  там наужно по id актера делать запрос еще один (https://api.themoviedb.org/3/person/{person_id})
// https://developer.themoviedb.org/reference/person-details
/*   <p class="movie-modal__bio"><strong>Биография:</strong> ${biography}</p>
  <!-- Главные награды -->
  <h3>🏆 Главные награды 🏆</h3>
  <ul class="movie-modal__awards">
    <li>
      <h4>${awardName}</h4>
    </li>
    <!-- можно дублировать li для нескольких наград -->
  </ul>

  <!-- Известность за -->
  <h3>Известность за</h3>
  <ul class="movie-modal__known-for">
    <li>
      <img src="${knownForImg}" alt="${knownForTitle}" loading="lazy" style="width: 100px; height: 150px; object-fit: cover; border-radius: 6px;">
      <h4>${knownForTitle}</h4>
    </li>
    <!-- можно дублировать li для нескольких фильмов/сериалов -->
  </ul>  */

export { getActorForQuiz };
