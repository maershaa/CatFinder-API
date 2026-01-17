const CAT_API_KEY =
  'live_kpBCAEiYDNSXr8p6TyrL3iCarAqaBZrYB8A97aRdBRuqNXPj9oRMvv6QdeqN0sqC';
const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1';

const createCatSelectMarkup = arr => {
  return arr
    .map(
      cat => `<option value=${cat.id} data-id=${cat.id}> ${cat.name} </option>`
    )
    .join('');
};

async function getCats() {
  const response = await fetch(
    `${CAT_API_BASE_URL}/breeds?api_key=${CAT_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function getCatByBreed(breedId) {
  const response = await fetch(
    `${CAT_API_BASE_URL}/breeds/${breedId}?api_key=${CAT_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function getPhotoByBreed(breedId) {
  const response = await fetch(
    `${CAT_API_BASE_URL}/images/search?breed_ids=${breedId}&api_key=${CAT_API_KEY}`
  );
  if (!response.ok) {
    throw new Error((await response).status);
  }

  return response.json();
}

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
  img
) => {
  return `
  <h2 class="cat-name">${name}</h2>

  <div class="cat-content">
    <!-- Левая колонка -->
    <section class="cat-main">
      <img
        class="cat-image"
         src="${img[0].url}" 
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
          <dd>${adaptability}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Affection level</dt>
          <dd>${affection_level}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Good with children</dt>
          <dd>${child_friendly}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Good with dogs</dt>
          <dd>${dog_friendly}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Energy level</dt>
          <dd>${energy_level}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Health issues</dt>
          <dd>${health_issues}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Shedding</dt>
          <dd>${shedding_level}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Intelligence</dt>
          <dd>${intelligence}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Social needs</dt>
          <dd>${social_needs}</dd>
        </div>
      </dl>
    </section>
  </div>
</article>
`;
};

function colorredDots() {
  // добавлять стиль тому количеству точек которое соответствует amount
  return;
}
export {
  createCatSelectMarkup,
  getCats,
  getCatByBreed,
  createCatCardMarkup,
  getPhotoByBreed,
};
