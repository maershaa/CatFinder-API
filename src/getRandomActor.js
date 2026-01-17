// https://developer.themoviedb.org/docs/getting-started - TMDB
// https://developer.themoviedb.org/docs/image-basics - документация о картинках
// https://developer.themoviedb.org/reference/trending-people - документация о trending people
const ACTORS_BASE_URL = 'https://api.themoviedb.org/3/trending/person';
const ACTORS_API_KEY = '49c416b2e76f980e3c56d2487a50c779';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function getRandomActor() {
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

async function getActorForQuiz() {
  const actorsArr = await getRandomActor();
  return actorsArr[getRandomIndex(actorsArr.length)];
}

const getRandomIndex = max => {
  return Math.floor(Math.random() * max);
};

const createWidgetModal = ({ name, profile_path }) => {
  return `    
      <div class="movie-modal__content">
        <span class="movie-modal__close movie-modal__close">&times;</span>
        <p class="movie-modal__title">Your actor: <span> ${name} </span></p>
        <img class="movie-modal__img" src="${
          IMG_BASE_URL + profile_path
        }" alt="Actor">

   </div>`;
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

export { getActorForQuiz, createWidgetModal };
