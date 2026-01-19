import { createDots } from '../components/CatFinder/CatFinder.js';

const createCatCardMarkup = (
  {
    name,
    description,
    origin,
    temperament,
    adaptability,
    affection_level,
    child_friendly,
    dog_friendly,
    energy_level,
    health_issues,
    shedding_level,
    intelligence,
    social_needs,
  },
  url
) => {
  return `
<h2 class="cat-name">${name}</h2>

  <div class="cat-content">
    <!-- Левая колонка -->
    <section class="cat-main">
      <img
        class="cat-image"
         src="${url}" 
        alt="${name}"
        loading="lazy"
      />

      <p class="cat-description">${description}</p>

      <p class="cat-origin">
        <span class="label">Origin:</span> ${origin}
      </p>

      <p class="cat-temperament">
        <span class="label">Temperament:</span> ${temperament}
      </p>
    </section>

    <!-- Правая колонка -->
    <section class="cat-traits">
      <h3 class="traits-title">${name}’s Traits</h3>

      <dl class="traits-list">
        <div class="trait">
          <dt class="trait-text">Adaptability</dt>
          <dd>${createDots(adaptability)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Affection level</dt>
          <dd>${createDots(affection_level)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Good with children</dt>
          <dd>${createDots(child_friendly)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Good with dogs</dt>
          <dd>${createDots(dog_friendly)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Energy level</dt>
          <dd>${createDots(energy_level)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Health issues</dt>
          <dd>${createDots(health_issues)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Shedding</dt>
          <dd>${createDots(shedding_level)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Intelligence</dt>
          <dd>${createDots(intelligence)} </dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Social needs</dt>
          <dd>${createDots(social_needs)}</dd>
        </div>
      </dl>
    </section>
  </div>


`;
};

export { createCatCardMarkup };
