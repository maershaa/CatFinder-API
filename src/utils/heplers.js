import { refs } from './refs.js';

const {
  pageLoader,
  sectionLoader,
  catCardEl,
  catInfoEl,
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

function showCatCard() {
  catCardEl.classList.remove('hidden');
}
function hideCatCard() {
  catCardEl.classList.add('hidden');
}

function showMovieModal() {
  console.log('showMovieModal called');
  movieModal.classList.add('is-open');
}

function hideMovieModal() {
  console.log('hideMovieModal called');
  movieModal.classList.remove('is-open');
  movieModal.innerHTML = '';
}
export {
  showPageLoader,
  hidePageLoader,
  showCatLoader,
  hideCatLoader,
  showCatCard,
  hideCatCard,
  showMovieModal,
  hideMovieModal,
};
