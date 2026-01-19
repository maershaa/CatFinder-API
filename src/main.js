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
import { fetchActorInfo, fetchFilmsByActor } from './api/movie-api.js';

import { getActorForQuiz } from './components/ActorWidget/ActorWidget.js';

import { refs } from './utils/refs.js';
import {
  showPageLoader,
  hidePageLoader,
  showCatLoader,
  hideCatLoader,
  showCatCard,
  hideCatCard,
  showMovieModal,
  hideMovieModal,
} from './utils/heplers.js';

import { showToast } from './utils/showToast.js';

const { selectEl, catInfoEl, weatherSideBarEl, movieWidget, movieModal } = refs;

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
    hideCatCard();
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
    showCatCard();
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

movieWidget.addEventListener('click', async () => {
  try {
    const actor = await getActorForQuiz();
    const actorInfo = await fetchActorInfo(actor.id);
    const actorFilms = await fetchFilmsByActor(actor.id);
    movieModal.innerHTML = createWidgetModal(actorInfo, actorFilms);
    showMovieModal();
  } catch (error) {
    showToast(`Error loading widget: ${error.message}`);
    console.error('Ошибка загрузки виджета:', error.message);
  }
});

// --- Делегирование клика по модалке для закрытия ---
movieModal.addEventListener('click', evt => {
  if (
    evt.target.classList.contains('movie-modal__close') ||
    evt.target === movieModal
  ) {
    hideMovieModal();
  }
});
