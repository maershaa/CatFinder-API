import { ACTORS_IMG_BASE_URL } from '../api/config.js';

const createWidgetModal = ({ name, profile_path }) => {
  return `    
      <div class="movie-modal__content">
        <span class="movie-modal__close movie-modal__close">&times;</span>
        <p class="movie-modal__title">Your actor: <span> ${name} </span></p>
        <img class="movie-modal__img" src="${
          ACTORS_IMG_BASE_URL + profile_path
        }" alt="Actor">

   </div>`;
};

export { createWidgetModal };
