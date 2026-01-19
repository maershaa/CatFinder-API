// https://swapi.py4e.com/ - The Star Wars API: SWAPI
// https://api.privatbank.ua/#p24/exchange - Курси валют ПриватБанку - PrivatBank API
// https://thecatapi.com/ - The Cat API

import './style.css';
import './components/Loader/Loader.css';

import UxSelect from 'ux-select/dist/js/ux-select.es.js';
import 'ux-select/dist/css/ux-select.css';

import { createWeatherMarkup } from './templates/weatherTemplate.js';
import { createCatSelectMarkup } from './templates/catSelectTemplate';
import { createCatCardMarkup } from './templates/catCardTemplate.js';
import { createWidgetModal } from './templates/widgetTemplate.js';

import { getWeather } from './api/weather-api.js';
import { fetchBreeds, fetchCatByBreed } from './api/cat-api.js';

import { getActorForQuiz } from './components/ActorWidget/ActorWidget.js';
import { refs } from './utils/refs.js';
import { showToast } from './utils/showToast.js';

const {
  pageLoader,
  sectionLoader,
  selectEl,
  catInfoEl,
  weatherSideBarEl,
  movieWidget,
  movieModal,
} = refs;

function showPageLoader() {
  pageLoader.classList.remove('hidden');
  movieWidget.classList.add('is-loading');
}

function hidePageLoader() {
  pageLoader.classList.add('hidden');
  movieWidget.classList.remove('is-loading');
}

function showCatLoader() {
  console.log('showCatLoader called');
  sectionLoader.classList.remove('hidden');
  catInfoEl.classList.add('is-loading');
}

function hideCatLoader() {
  console.log('hideCatLoader called');
  sectionLoader.classList.add('hidden');
  catInfoEl.classList.remove('is-loading');
}

async function initApp() {
  showPageLoader();
  try {
    const [catsBreeds, weather] = await Promise.all([
      fetchBreeds(),
      getWeather(),
    ]);

    selectEl.innerHTML = createCatSelectMarkup(catsBreeds); //!!!почему не insertAdjacentHTML?
    weatherSideBarEl.innerHTML = createWeatherMarkup(weather); //!!!почему не insertAdjacentHTML?

    new UxSelect(selectEl, {
      optionStyle: 'radio',
      hideOnSelect: true, //скрыть после выбора опции
    });
  } catch (error) {
    showToast(`Initialization error: ${error.message}`);
  } finally {
    hidePageLoader();
  }
}

initApp();

selectEl.addEventListener('change', onChangeSelect);

async function onChangeSelect(evt) {
  catInfoEl.innerHTML = '';
  const selectedBreedId = evt.target.value;
  if (!selectedBreedId) return;
  renderCatsInfo(selectedBreedId);
}

async function renderCatsInfo(id) {
  try {
    showCatLoader();
    const data = await fetchCatByBreed(id);
    const cat = data[0].breeds[0];
    const catImg = data[0].url;
    if (!cat) throw new Error('No cat data');
    const catMarkup = createCatCardMarkup(cat, catImg);
    catInfoEl.insertAdjacentHTML('beforeend', catMarkup);
  } catch (error) {
    showToast(`Error loading breed information:${error.message}`);
    console.error('Ошибка загрузки информации о породе:', error.message);
  } finally {
    hideCatLoader();
  }
}

// Actor Quiz виджет

movieWidget.addEventListener('click', async () => {
  try {
    const actor = await getActorForQuiz();
    movieModal.innerHTML = createWidgetModal(actor);
    movieModal.style.display = 'block';
  } catch (error) {
    showToast(`Error loading widget: ${error.message}`);
    console.error('Ошибка загрузки виджета:', error.message);
  }
});

// --- Делегирование клика по модалке для закрытия ---
movieModal.addEventListener('click', evt => {
  if (evt.target.classList.contains('movie-modal__close')) {
    movieModal.style.display = 'none';
  }
});

// function createDots(value, max = 5) {
//   return Array.from({ length: max }, (_, i) => {
//     const isActive = i < value;
//     return `<span class="dot ${isActive ? 'dot--active' : ''}"></span>`;
//   }).join('');
// }

// !async function renderWeather() {
//   try {
//     const dataWeather = await getWeather();
//     const weatherMarkup = createWeatherMarkup(dataWeather);

//     weatherSideBarEl.insertAdjacentHTML('beforeend', weatherMarkup);
//   } catch (error) {
//     showToast(`Error loading weather: ${error.message}`);

//     console.error('Ошибка загрузки погоды:', error.message);
//   }
// }

// !renderWeather();

// Коты
//! async function renderCatsSelect() {
//   try {
//     const catsData = await fetchBreeds();
//     const catSelectMarkup = createCatSelectMarkup(catsData);
//     selectEl.insertAdjacentHTML('beforeend', catSelectMarkup);
//     new UxSelect(selectEl, {
//       optionStyle: 'radio',
//       hideOnSelect: true, //скрыть после выбора опции
//     });
//   } catch (error) {
//     showToast(`Error loading breed: ${error.message}`);
//     console.error('Ошибка загрузки породы:', error.message);
//   }
// }
// !renderCatsSelect();
