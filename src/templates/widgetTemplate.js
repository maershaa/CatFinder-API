import { IMG_BASE_URL } from '../api/config.js';
import posterPlaceholder from '../assets/posterPlaceholder.png';
import actorPlaceholder from '../assets/actorPlaceholder.png';
const createWidgetModal = (actor, filmography) => {
  const {
    id,
    name,
    profile_path,
    birthday,
    deathday,
    place_of_birth,
    popularity: actor_popularity,
    biography,
  } = actor;

  return `    
  <div class="movie-modal__content" data-actor-id="${id}">
    <button
      class="movie-modal__close"
      type="button"
      aria-label="Close modal"
    >
      &times;
    </button>

    <h2 class="movie-modal__title">${name}</h2>

    <!-- TOP LAYOUT -->
    <div class="movie-modal__layout">
      <!-- LEFT COLUMN -->
      <aside class="movie-modal__sidebar">
        <img
          class="movie-modal__img"
          src="${profile_path ? IMG_BASE_URL + profile_path : actorPlaceholder}"
          alt="Photo of ${name}"
          loading="lazy"
        />

        <div class="movie-modal__info">
          <p>
            <strong>Birthday:</strong> ${birthday || '—'}
            ${deathday ? ` | <strong>Deathday:</strong> ${deathday}` : ''}
          </p>

          <p>
            <strong>Place of birth:</strong>
            ${place_of_birth || '—'}
          </p>

          <p>
            <strong>Popularity:</strong> ${actor_popularity.toFixed(1)}
          </p>
        </div>
      </aside>

      <!-- RIGHT COLUMN -->
      <section class="movie-modal__biography">
        <h3>Biography</h3>
        <p>${biography || 'Biography not available.'}</p>
      </section>
    </div>

    <!-- FILMOGRAPHY -->
    <section class="movie-modal__filmography">
      <h3>Filmography</h3>

      <ul class="known-for__list">
        ${filmography.cast
          .map(movie => {
            return `
              <li class="known-for__item">
                <img
                  class="known-for__img"
                  src="${
                    movie.poster_path
                      ? IMG_BASE_URL + movie.poster_path
                      : posterPlaceholder
                  }"
                  alt="${movie.title}"
                  loading="lazy"
                />
                <p class="known-for__title">${movie.title}</p>
                <p class="known-for__rating">⭐ ${movie.vote_average.toFixed(1)}</p>
              </li>
            `;
          })
          .join('')}
      </ul>
    </section>
  </div>

   `;
};

export { createWidgetModal };
