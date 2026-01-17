(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();const g="11847d1f4edf4f85a8584116261501",w="http://api.weatherapi.com/v1";async function $(){const t=await fetch(`${w}/current.json?key=${g}&q=auto:ip`);if(!t.ok)throw new Error(t.status);return t.json()}const A=t=>{const{location:e,current:r}=t;return`  
   <div class="weather__header">
    <h2 class="weather__location">${e.name}, ${e.country}</h2>
    <p class="weather__time">${e.localtime}</p>
  </div>

  <div class="weather__main">
    <img
      class="weather__icon"
      src="${r.condition.icon}"
      alt="${r.condition.text}"
      loading="lazy"
    />
    <p class="weather__condition">${r.condition.text}</p>
  </div>

  <div class="weather__temp">
    <p class="weather__value">t: ${r.temp_c}°C</p>
    <p class="weather__feels">
      Feels like: <span>${r.feelslike_c}°C</span>
    </p>
  </div>`},E="https://api.themoviedb.org/3/trending/person",S="49c416b2e76f980e3c56d2487a50c779",k="https://image.tmdb.org/t/p/w500";async function L(){const t=await fetch(`${E}/week?language=en-US&api_key=${S}`);if(!t.ok)throw new Error(t.statusText);return(await t.json()).results}async function b(){const t=await L();return t[M(t.length)]}const M=t=>Math.floor(Math.random()*t),T=({name:t,profile_path:e})=>`    
      <div class="movie-modal__content">
        <span class="movie-modal__close movie-modal__close">&times;</span>
        <p class="movie-modal__title">Your actor: <span> ${t} </span></p>
        <img class="movie-modal__img" src="${k+e}" alt="Actor">

   </div>`,d="live_kpBCAEiYDNSXr8p6TyrL3iCarAqaBZrYB8A97aRdBRuqNXPj9oRMvv6QdeqN0sqC",l="https://api.thecatapi.com/v1",C=t=>t.map(e=>`<option value=${e.id} data-id=${e.id}> ${e.name} </option>`).join("");async function j(){const t=await fetch(`${l}/breeds?api_key=${d}`);if(!t.ok)throw new Error(t.statusText);return t.json()}async function x(t){const e=await fetch(`${l}/breeds/${t}?api_key=${d}`);if(!e.ok)throw new Error(e.statusText);return e.json()}async function B(t){const e=await fetch(`${l}/images/search?breed_ids=${t}&api_key=${d}`);if(!e.ok)throw new Error((await e).status);return e.json()}const I=({name:t,description:e,origin:r,temperament:c,adaptability:a,affection_level:s,child_friendly:o,dog_friendly:p,energy_level:m,health_issues:h,shedding_level:f,intelligence:v,social_needs:_},y)=>`
  <h2 class="cat-name">${t}</h2>

  <div class="cat-content">
    <!-- Левая колонка -->
    <section class="cat-main">
      <img
        class="cat-image"
         src="${y[0].url}" 
        alt="${t}"
        loading="lazy"
      />

      <p class="cat-description">${e}</p>

      <p class="cat-origin">
        <span class="label">Origin:</span> ${r}
      </p>

      <p class="cat-temperament">
        <span class="label">Temperament:</span> ${c}
      </p>
    </section>

    <!-- Правая колонка -->
    <section class="cat-traits">
      <h3 class="traits-title">${t}’s Traits</h3>

      <dl class="traits-list">
        <div class="trait">
          <dt class="trait-text">Adaptability</dt>
          <dd>${a}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Affection level</dt>
          <dd>${s}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Good with children</dt>
          <dd>${o}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Good with dogs</dt>
          <dd>${p}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Energy level</dt>
          <dd>${m}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Health issues</dt>
          <dd>${h}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Shedding</dt>
          <dd>${f}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Intelligence</dt>
          <dd>${v}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Social needs</dt>
          <dd>${_}</dd>
        </div>
      </dl>
    </section>
  </div>
</article>
`,u=document.querySelector(".breed-select-js"),i=document.querySelector(".cat-card-js"),R=document.querySelector(".weather-sideBar-js"),q=document.querySelector(".movie-widget-js"),n=document.querySelector(".movie-modal");async function P(){try{const t=await j(),e=C(t);u.insertAdjacentHTML("beforeend",e)}catch(t){console.error("Ошибка загрузки породы:",t)}}P();u.addEventListener("input",O);async function O(t){i.innerHTML="";const e=t.target.value;H(e)}async function H(t){try{const e=await B(t),r=await x(t);i.style.display="block";const c=I(r,e);return i.insertAdjacentHTML("beforeend",c)}catch(e){console.error("Ошибка загрузки информации о породе или загрузки изображения:",e)}}async function W(){try{const t=await $(),e=A(t);R.insertAdjacentHTML("beforeend",e)}catch(t){console.error("Ошибка загрузки погоды:",t)}}W();q.addEventListener("click",async()=>{try{const t=await b();n.innerHTML=T(t),n.style.display="block"}catch(t){console.error("Ошибка загрузки виджета:",t)}});n.addEventListener("click",t=>{t.target.classList.contains("movie-modal__close")&&(n.style.display="none")});
