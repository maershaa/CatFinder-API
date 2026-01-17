// https://swapi.py4e.com/ - The Star Wars API: SWAPI
// https://api.privatbank.ua/#p24/exchange - Курси валют ПриватБанку - PrivatBank API
// https://thecatapi.com/ - The Cat API

import './style.css';
import { getWeather, createWeatherMarkup } from './getWeather.js';
import { getActorForQuiz, createWidgetModal } from './getRandomActor.js';
import {
  createCatSelectMarkup,
  getCats,
  createCatCardMarkup,
  getCatByBreed,
  getPhotoByBreed,
} from './getCats.js';

const selectEl = document.querySelector('.breed-select-js');
const catInfoEl = document.querySelector('.cat-card-js');

// ===================== Погода
const weatherSideBarEl = document.querySelector('.weather-sideBar-js');

const movieWidget = document.querySelector('.movie-widget-js');
const movieModal = document.querySelector('.movie-modal');

// Коты
async function renderCatsSelect() {
  try {
    const catsData = await getCats();
    const catSelectMarkup = createCatSelectMarkup(catsData);
    selectEl.insertAdjacentHTML('beforeend', catSelectMarkup);
  } catch (error) {
    console.error('Ошибка загрузки породы:', error);
  }
}
renderCatsSelect();

selectEl.addEventListener('input', onInput);

async function onInput(evt) {
  catInfoEl.innerHTML = '';
  const selectedBreedId = evt.target.value;
  // console.log('🚀 ~ onInput ~ selectedBreedId:', selectedBreedId);
  renderCatsInfo(selectedBreedId);
}

async function renderCatsInfo(id) {
  try {
    const catImg = await getPhotoByBreed(id);
    const catData = await getCatByBreed(id);

    catInfoEl.style.display = 'block';
    const catMarkup = createCatCardMarkup(catData, catImg);
    return catInfoEl.insertAdjacentHTML('beforeend', catMarkup);
  } catch (error) {
    console.error(
      'Ошибка загрузки информации о породе или загрузки изображения:',
      error
    );
  }
}

// function createDots(value, max = 5) {
//   return Array.from({ length: max }, (_, i) => {
//     const isActive = i < value;
//     return `<span class="dot ${isActive ? 'dot--active' : ''}"></span>`;
//   }).join('');
// }

// ============
async function renderWeather() {
  try {
    const dataWeather = await getWeather();
    const weatherMarkup = createWeatherMarkup(dataWeather);
    weatherSideBarEl.insertAdjacentHTML('beforeend', weatherMarkup);
  } catch (error) {
    console.error('Ошибка загрузки погоды:', error);
  }
}

renderWeather();

// Actor Quiz виджет

movieWidget.addEventListener('click', async () => {
  try {
    const actor = await getActorForQuiz();

    movieModal.innerHTML = createWidgetModal(actor);
    movieModal.style.display = 'block';
  } catch (error) {
    console.error('Ошибка загрузки виджета:', error);
  }
});

// --- Делегирование клика по модалке для закрытия ---
movieModal.addEventListener('click', evt => {
  if (evt.target.classList.contains('movie-modal__close')) {
    movieModal.style.display = 'none';
  }
});
