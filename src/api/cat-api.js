import { CAT_API_BASE_URL, CAT_API_KEY } from './config.js';

async function fetchBreeds() {
  const response = await fetch(
    `${CAT_API_BASE_URL}/breeds?api_key=${CAT_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchCatByBreed(breedId) {
  const response = await fetch(
    `${CAT_API_BASE_URL}/images/search?breed_ids=${breedId}&limit=1&has_breeds=true&api_key=${CAT_API_KEY}`
    // `${CAT_API_BASE_URL}/breeds/${breedId}?api_key=${CAT_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export { fetchBreeds, fetchCatByBreed };
