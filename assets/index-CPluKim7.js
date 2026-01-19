(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const t of i.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&a(t)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();var G=Object.defineProperty,j=(o,s,e)=>s in o?G(o,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[s]=e,h=(o,s,e)=>j(o,typeof s!="symbol"?s+"":s,e);function E(o){const s=new Event("change");o.dispatchEvent(s)}function q(o){const s=new Event("input");o.dispatchEvent(s)}class R{constructor(s,e={}){h(this,"el"),h(this,"config"),h(this,"localization"),h(this,"state"),h(this,"options"),h(this,"groups"),h(this,"uxEl"),h(this,"uxBody"),h(this,"uxSearchInput"),h(this,"uxSearchOverlay"),h(this,"uxClearButton"),h(this,"uxSelectAll"),this.el=s,this.config={isSearchable:this.el.dataset.isSearchable!==void 0?this.el.dataset.isSearchable==="true":e.isSearchable??!1,isSearchFocus:this.el.dataset.isSearchFocus!==void 0?this.el.dataset.isSearchFocus==="true":e.isSearchFocus??!1,searchName:this.el.dataset.searchName!==void 0?this.el.dataset.searchName:e.searchName??"",isDisplaySelectedItems:this.el.dataset.isDisplaySelectedItems!==void 0?this.el.dataset.isDisplaySelectedItems==="true":e.isDisplaySelectedItems??!1,isGroupOptions:this.el.dataset.isGroupOptions!==void 0?this.el.dataset.isGroupOptions==="true":e.isGroupOptions??!1,hideOnClear:this.el.dataset.hideOnClear!==void 0?this.el.dataset.hideOnClear==="true":e.hideOnClear??!0,hideOnSelect:this.el.dataset.hideOnSelect!==void 0?this.el.dataset.hideOnSelect==="true":e.hideOnSelect??!1,optionStyle:this.el.dataset.optionStyle??e.optionStyle??"default",closeButton:this.el.dataset.closeButton!==void 0?this.el.dataset.closeButton==="true":e.closeButton??!0,selectAllOption:this.el.dataset.selectAllOption!==void 0?this.el.dataset.selectAllOption==="true":e.selectAllOption??!1},this.localization={placeholder:this.el.dataset.placeholder??e.placeholder??"Select an option",searchText:this.el.dataset.searchText??e.searchText??"Search",emptySearchText:this.el.dataset.emptySearchText??e.emptySearchText??"No results found",clearText:this.el.dataset.clearText??e.clearText??"Clear option(s)",selectedText:this.el.dataset.selectedText??e.selectedText??"Selected:",selectAllText:this.el.dataset.selectAllText??e.selectAllText??"Select all"},this.state={multiple:this.el.multiple,disabled:this.el.disabled,isAllSelected:!1},this.options=this.extractOptions(),this.groups=this.extractGroups(),this.uxEl=this.create(),this.setSelectState(),this.bindEvents()}extractOptions(s=!1){const e=this.el.options,a=this.config.isGroupOptions,n=[];for(const i of e){if(i.value==="")continue;let t="empty";a&&i.dataset.uxSelectGroup&&(t=i.dataset.uxSelectGroup);let l;s&&(l=this.uxEl.querySelector(`.ux-select-group__elem[data-value='${i.value}']`));let d,r;this.config.optionStyle==="image"&&i.dataset.imageSrc?d={src:i.dataset.imageSrc,srcset:i.dataset.imageSrcset??void 0,alt:i.dataset.imageAlt??"",width:i.dataset.imageWidth?Number(i.dataset.imageWidth):24,height:i.dataset.imageHeight?Number(i.dataset.imageHeight):24}:this.config.optionStyle==="image"&&i.dataset.svgSrc&&(r={src:i.dataset.svgSrc,width:i.dataset.svgWidth?Number(i.dataset.svgWidth):24,height:i.dataset.svgHeight?Number(i.dataset.svgHeight):24}),n.push({attributes:{selected:i.selected,disabled:i.disabled,group:t},data:{text:i.textContent?i.textContent.trim():"",value:i.value,selectedDisplayText:i.dataset.selectedDisplayText},image:d,svg:r,element:i,uxOption:l})}return n}extractGroups(){const s=this.el.options,e=this.config.isGroupOptions,a=new Set;for(const n of s){if(n.value==="")continue;let i="empty";e&&n.dataset.uxSelectGroup&&(i=n.dataset.uxSelectGroup),a.add(i)}return Array.from(a)}setSelectState(){const s=this.uxEl.querySelector(".ux-select__title"),e=this.options.reduce((a,n)=>(n.attributes.selected&&a.push(n.data.selectedDisplayText||n.data.text),a),[]);if(e.length>0?(e.length===1?s.textContent=e[0]:this.state.multiple&&(s.textContent=this.config.isDisplaySelectedItems?e.join(", "):`${this.localization.selectedText} ${e.length}`),this.uxEl.classList.add("-filled")):(s.textContent=this.localization.placeholder,this.uxEl.classList.remove("-filled")),this.config.isGroupOptions)for(const a of this.groups){const n=this.uxEl.querySelector(`[data-ux-group="${a}"]`);if(!n)continue;const i=n.querySelector(".ux-select-group__list");if(!i)continue;const t=Array.from(i.querySelectorAll(".ux-select-group__elem")).every(l=>{l.classList.contains("-disabled")});n.classList.toggle("-disabled",t)}if(this.uxSelectAll){this.uxSelectAll.querySelector(".ux-select-select-all__checkbox")?.classList.remove("-null","-all","-some");const a=this.options.every(t=>t.attributes.selected),n=this.options.some(t=>t.attributes.selected);this.state.isAllSelected=a;let i="-null";a?i="-all":n&&(i="-some"),this.uxSelectAll.querySelector(".ux-select-select-all__checkbox")?.classList.add(i)}}createGroupElement(s){const e=document.createElement("div");if(e.classList.add("ux-select__group","ux-select-group"),e.dataset.uxGroup=s,s==="empty")e.classList.add("-empty");else{const n=document.createElement("div");n.classList.add("ux-select-group__title"),n.textContent=s,e.appendChild(n)}const a=document.createElement("ul");return a.classList.add("ux-select-group__list"),e.appendChild(a),e}createGroupAndOptions(){const s=document.createElement("div");if(s.classList.add("ux-select__dropdown"),this.state.multiple&&this.config.selectAllOption){const i=document.createElement("div");i.classList.add("ux-select__select-all");const t=document.createElement("div");t.classList.add("ux-select-select-all__checkbox");const l=document.createElement("div");l.classList.add("ux-select-select-all__text"),l.textContent=this.localization.selectAllText,i.append(t,l),this.uxSelectAll=i,this.uxSelectAll.addEventListener("click",this.onClickSelectAll.bind(this)),s.appendChild(i)}const e=document.createDocumentFragment(),a={};for(const i of this.groups){const t=this.createGroupElement(i);e.appendChild(t),a[i]=document.createDocumentFragment()}s.appendChild(e);for(const i of this.options){const t=document.createElement("li");if(t.classList.add("ux-select-group__elem"),t.dataset.value=i.data.value,t.textContent=i.data.text,i.attributes.selected&&t.classList.add("-selected"),i.attributes.disabled&&t.classList.add("-disabled"),this.config.optionStyle==="image"&&i.image){const l=document.createElement("img");l.classList.add("ux-select-group-elem__image"),l.src=i.image.src,l.width=i.image.width,l.height=i.image.height,l.alt=i.image.alt,i.image.srcset&&(l.srcset=`${i.image.src} 1x, ${i.image.srcset} 2x`),t.appendChild(l)}if(this.config.optionStyle==="image"&&i.svg){const l=document.createElementNS("http://www.w3.org/2000/svg","svg"),d=document.createElementNS("http://www.w3.org/2000/svg","use");l.classList.add("ux-select-group-elem__image"),l.setAttribute("viewBox",`0 0 ${String(i.svg.width)} ${String(i.svg.height)}`),l.setAttribute("width",String(i.svg.width)),l.setAttribute("height",String(i.svg.height)),d.setAttribute("href",i.svg.src),l.appendChild(d),t.appendChild(l)}t.addEventListener("click",this.onClickOption.bind(this)),a[i.attributes.group].appendChild(t),i.uxOption=t}for(const i of this.groups){const t=a[i],l=s.querySelector(`[data-ux-group="${i}"] .ux-select-group__list`);l&&l.appendChild(t)}if(!this.uxBody)throw new Error("uxBody is undefined");const n=this.config.isSearchable?1:0;this.uxBody.childNodes[n]?this.uxBody.replaceChild(s,this.uxBody.childNodes[n]):this.uxBody.appendChild(s)}create(){const s=document.createElement("div");s.classList.add("ux-select__head");const e=document.createElement("div");if(e.classList.add("ux-select__title"),e.textContent=this.localization.placeholder,s.appendChild(e),this.config.closeButton){const t=document.createElement("button");t.type="button",t.classList.add("ux-select__clear"),t.title=this.localization.clearText,this.uxClearButton=t,s.appendChild(t)}const a=document.createElement("div");if(a.classList.add("ux-select__body"),this.uxBody=a,this.config.isSearchable){const t=document.createElement("div");t.classList.add("ux-select__search");const l=document.createElement("input");l.type="search",this.config.searchName&&(l.name=this.config.searchName),l.classList.add("ux-select-search__input"),l.placeholder=this.localization.searchText,this.uxSearchInput=l;const d=document.createElement("div");d.classList.add("ux-select-search__overlay"),d.textContent=this.localization.emptySearchText,this.uxSearchOverlay=d,t.appendChild(l),t.appendChild(d),a.appendChild(t)}this.createGroupAndOptions();const n=document.createElement("div"),i=["ux-select",this.el.classList];return this.state.multiple&&i.push("-multiple"),this.state.disabled&&i.push("-disabled"),this.config.optionStyle!=="default"&&i.push(`-${this.config.optionStyle}`),n.className=i.join(" "),n.append(s,a),this.el.style.display="none",this.el.insertAdjacentElement("afterend",n),this.el.nextElementSibling}enable(){this.state.disabled&&(this.el.disabled=!1,this.uxEl.classList.remove("-disabled"),this.state.disabled=!1)}disable(){this.state.disabled||(this.el.disabled=!0,this.uxEl.classList.add("-disabled"),this.state.disabled=!0)}update(s=!0){const e=JSON.stringify(this.options);this.options=this.extractOptions(!0),this.groups=this.extractGroups(),e!==JSON.stringify(this.options)&&this.createGroupAndOptions(),this.setSelectState(),this.el.disabled?this.disable():this.enable(),s&&E(this.el)}clear(){for(const s of this.options)s.attributes.selected&&(s.attributes.selected=!1,s.element.selected=!1,s.uxOption&&s.uxOption.classList.remove("-selected"));this.setSelectState(),E(this.el)}destroy(){this.uxEl.remove(),this.el.style.display=""}getSelectedValues(){return[...this.options].filter(s=>s.attributes.selected).map(s=>s.data.value)}onToggleShown(s){s.preventDefault();const e=s.target;if(!this.state.disabled&&!(this.uxClearButton&&s.target===this.uxClearButton)&&!(this.uxBody&&this.uxBody.contains(e))){if(this.uxEl.classList.contains("-shown")){this.uxEl.classList.remove("-shown");return}this.uxEl.classList.add("-shown"),this.config.isSearchable&&this.uxSearchInput&&(this.uxSearchInput.value="",this.uxSearchInput.dispatchEvent(new Event("input")),this.config.isSearchFocus&&this.uxSearchInput.focus())}}onClickOutside(s){const e=s.target;this.uxEl.contains(e)||this.uxEl.classList.remove("-shown")}onClickClear(s){if(s.preventDefault(),!this.state.disabled)return this.config.hideOnClear&&this.uxEl.classList.remove("-shown"),this.clear()}onClickSelectAll(s){s.preventDefault();const e=this.options.every(a=>a.attributes.selected);for(const a of this.options)a.attributes.disabled||(a.attributes.selected=!e,a.element.selected=!e,a.uxOption?.classList.toggle("-selected",!e));return this.config.hideOnSelect&&this.uxEl.classList.remove("-shown"),this.update()}onClickOption(s){s.preventDefault();const e=s.target;if(!e.classList.contains("-disabled")&&!(!this.state.multiple&&e.classList.contains("-selected"))){if(this.state.multiple){s.stopPropagation();const a=this.options.find(n=>n.uxOption===e);a&&a.uxOption&&(a.attributes.selected=!a.attributes.selected,a.element.selected=a.attributes.selected,a.uxOption.classList.toggle("-selected"))}else for(const a of this.options){const n=a.uxOption===e;a.attributes.selected=n,a.element.selected=n,a.uxOption&&a.uxOption.classList.toggle("-selected",n)}return this.config.hideOnSelect&&this.uxEl.classList.remove("-shown"),this.update()}}onSearch(s){if(s.target===null)return;const e=r=>r.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),a=s.target,n=e(a.value),i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),t=this.uxEl.querySelectorAll(".ux-select-group");if(n===""){for(const r of this.options)r.uxOption&&(r.uxOption.style.display="");if(this.config.isGroupOptions)for(const r of t)r.style.display="";this.uxSearchOverlay&&(this.uxSearchOverlay.style.display="none"),this.uxSelectAll&&(this.uxSelectAll.style.display="flex");return}const l=new RegExp(i),d=this.options.some(r=>l.test(e(r.data.text)));for(const r of this.options){const c=l.test(e(r.data.text));r.uxOption&&(r.uxOption.style.display=c?"":"none")}if(this.config.isGroupOptions)for(const r of t){r.style.display="";const c=r.querySelector(".ux-select-group__list");c&&(r.style.display=c.clientHeight!==0?"":"none")}this.uxSearchOverlay&&(this.uxSearchOverlay.style.display=d?"none":"block"),this.uxSelectAll&&(this.uxSelectAll.style.display=d?"flex":"none"),q(this.el)}bindEvents(){this.uxEl.addEventListener("click",this.onToggleShown.bind(this)),this.uxClearButton&&this.uxClearButton.addEventListener("click",this.onClickClear.bind(this)),window.addEventListener("click",this.onClickOutside.bind(this)),this.config.isSearchable&&this.uxSearchInput&&this.uxSearchInput.addEventListener("input",this.onSearch.bind(this))}}const D=o=>{const{location:s,current:e}=o;return`  
   <div class="weather__header">
    <h2 class="weather__location">${s.name}, ${s.country}</h2>
    <p class="weather__time">${s.localtime}</p>
  </div>

  <div class="weather__main">
    <img
      class="weather__icon"
      src="${e.condition.icon}"
      alt="${e.condition.text}"
      loading="lazy"
    />
    <p class="weather__condition">${e.condition.text}</p>
  </div>

  <div class="weather__temp">
    <p class="weather__value">t: ${e.temp_c}°C</p>
    <p class="weather__feels">
      Feels like: <span>${e.feelslike_c}°C</span>
    </p>
  </div>`},W=o=>o.map(s=>`<option value=${s.id} > ${s.name} </option>`).join("");function p(o,s=5){let e="";for(let a=1;a<=s;a++)a<=o?e+='<span class="dot dot-colored"></span>':e+='<span class="dot"></span>';return e}const H=({name:o,description:s,origin:e,temperament:a,adaptability:n,affection_level:i,child_friendly:t,dog_friendly:l,energy_level:d,health_issues:r,shedding_level:c,intelligence:u,social_needs:f},m)=>`
<h2 class="cat-name">${o}</h2>

  <div class="cat-content">
    <!-- Левая колонка -->
    <section class="cat-main">
      <img
        class="cat-image"
         src="${m}" 
        alt="${o}"
        loading="lazy"
      />

      <p class="cat-description">${s}</p>

      <p class="cat-origin">
        <span class="label">Origin:</span> ${e}
      </p>

      <p class="cat-temperament">
        <span class="label">Temperament:</span> ${a}
      </p>
    </section>

    <!-- Правая колонка -->
    <section class="cat-traits">
      <h3 class="traits-title">${o}’s Traits</h3>

      <dl class="traits-list">
        <div class="trait">
          <dt class="trait-text">Adaptability</dt>
          <dd>${p(n)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Affection level</dt>
          <dd>${p(i)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Good with children</dt>
          <dd>${p(t)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Good with dogs</dt>
          <dd>${p(l)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Energy level</dt>
          <dd>${p(d)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Health issues</dt>
          <dd>${p(r)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Shedding</dt>
          <dd>${p(c)}</dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Intelligence</dt>
          <dd>${p(u)} </dd>
        </div>

        <div class="trait">
          <dt class="trait-text">Social needs</dt>
          <dd>${p(f)}</dd>
        </div>
      </dl>
    </section>
  </div>


`,O="https://api.thecatapi.com/v1",T="live_kpBCAEiYDNSXr8p6TyrL3iCarAqaBZrYB8A97aRdBRuqNXPj9oRMvv6QdeqN0sqC",z="https://api.themoviedb.org/3",S="49c416b2e76f980e3c56d2487a50c779",L="https://image.tmdb.org/t/p/w500",A="https://api.themoviedb.org/3/person",U="https://api.weatherapi.com/v1",V="11847d1f4edf4f85a8584116261501",Y="/CatFinder-API/assets/posterPlaceholder-C1tuoyDE.png",K="/CatFinder-API/assets/actorPlaceholder-b03a_tCZ.png",J=(o,s)=>{const{id:e,name:a,profile_path:n,birthday:i,deathday:t,place_of_birth:l,popularity:d,biography:r}=o;return`    
  <div class="movie-modal__content" data-actor-id="${e}">
    <button
      class="movie-modal__close"
      type="button"
      aria-label="Close modal"
    >
      &times;
    </button>

    <h2 class="movie-modal__title">${a}</h2>

    <!-- TOP LAYOUT -->
    <div class="movie-modal__layout">
      <!-- LEFT COLUMN -->
      <aside class="movie-modal__sidebar">
        <img
          class="movie-modal__img"
          src="${n?L+n:K}"
          alt="Photo of ${a}"
          loading="lazy"
        />

        <div class="movie-modal__info">
          <p>
            <strong>Birthday:</strong> ${i||"—"}
            ${t?` | <strong>Deathday:</strong> ${t}`:""}
          </p>

          <p>
            <strong>Place of birth:</strong>
            ${l||"—"}
          </p>

          <p>
            <strong>Popularity:</strong> ${d.toFixed(1)}
          </p>
        </div>
      </aside>

      <!-- RIGHT COLUMN -->
      <section class="movie-modal__biography">
        <h3>Biography</h3>
        <p>${r||"Biography not available."}</p>
      </section>
    </div>

    <!-- FILMOGRAPHY -->
    <section class="movie-modal__filmography">
      <h3>Filmography</h3>

      <ul class="known-for__list">
        ${s.cast.map(c=>`
              <li class="known-for__item">
                <img
                  class="known-for__img"
                  src="${c.poster_path?L+c.poster_path:Y}"
                  alt="${c.title}"
                  loading="lazy"
                />
                <p class="known-for__title">${c.title}</p>
                <p class="known-for__rating">⭐ ${c.vote_average.toFixed(1)}</p>
              </li>
            `).join("")}
      </ul>
    </section>
  </div>

   `};async function Q(){const o=await fetch(`${U}/current.json?key=${V}&q=auto:ip`);if(!o.ok)throw new Error(o.status);return o.json()}async function X(){const o=await fetch(`${O}/breeds?api_key=${T}`);if(!o.ok)throw new Error(o.statusText);return o.json()}async function Z(o){const s=await fetch(`${O}/images/search?breed_ids=${o}&limit=1&has_breeds=true&api_key=${T}`);if(!s.ok)throw new Error(s.statusText);return s.json()}async function tt(){const o=await fetch(`${z}/person/popular?api_key=${S}&page=6`);if(!o.ok)throw new Error(o.statusText);const s=await o.json();return console.log("fetchRandomActor",s.results),s.results}async function et(o){const s=await fetch(`${A}/${o}?api_key=${S}`);if(!s.ok)throw new Error(s.statusText);return await s.json()}async function st(o){const s=await fetch(`${A}/${o}/movie_credits?api_key=${S}`);if(!s.ok)throw new Error(s.statusText);return s.json()}const it=o=>Math.floor(Math.random()*o);async function ot(){const o=await tt(),s=it(o.length);return o[s]}const $={pageLoader:document.querySelector(".page-loader"),sectionLoader:document.querySelector(".section-loader"),selectEl:document.querySelector(".breed-select-js"),catCardEl:document.querySelector(".cat-card-js"),catInfoEl:document.querySelector(".cat-wrapper-js"),weatherSideBarEl:document.querySelector(".weather-sideBar-js"),movieWidget:document.querySelector(".movie-widget-js"),movieModal:document.querySelector(".movie-overlay-js")},{pageLoader:k,sectionLoader:N,catCardEl:B,catInfoEl:M,movieWidget:I,movieModal:x}=$;function at(){k.classList.remove("hidden"),I.classList.add("is-loading")}function nt(){k.classList.add("hidden"),I.classList.remove("is-loading")}function lt(){console.log("showCatLoader called"),N.classList.remove("hidden"),M.classList.add("is-loading")}function rt(){console.log("hideCatLoader called"),N.classList.add("hidden"),M.classList.remove("is-loading")}function ct(){B.classList.remove("hidden")}function dt(){B.classList.add("hidden")}function ut(){console.log("showMovieModal called"),x.classList.add("is-open")}function ht(){console.log("hideMovieModal called"),x.classList.remove("is-open"),x.innerHTML=""}function pt(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var v={exports:{}};var ft=v.exports,C;function mt(){return C||(C=1,(function(o){(function(s,e){o.exports?o.exports=e():s.Toastify=e()})(ft,function(s){var e=function(t){return new e.lib.init(t)},a="1.12.0";e.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},e.lib=e.prototype={toastify:a,constructor:e,init:function(t){return t||(t={}),this.options={},this.toastElement=null,this.options.text=t.text||e.defaults.text,this.options.node=t.node||e.defaults.node,this.options.duration=t.duration===0?0:t.duration||e.defaults.duration,this.options.selector=t.selector||e.defaults.selector,this.options.callback=t.callback||e.defaults.callback,this.options.destination=t.destination||e.defaults.destination,this.options.newWindow=t.newWindow||e.defaults.newWindow,this.options.close=t.close||e.defaults.close,this.options.gravity=t.gravity==="bottom"?"toastify-bottom":e.defaults.gravity,this.options.positionLeft=t.positionLeft||e.defaults.positionLeft,this.options.position=t.position||e.defaults.position,this.options.backgroundColor=t.backgroundColor||e.defaults.backgroundColor,this.options.avatar=t.avatar||e.defaults.avatar,this.options.className=t.className||e.defaults.className,this.options.stopOnFocus=t.stopOnFocus===void 0?e.defaults.stopOnFocus:t.stopOnFocus,this.options.onClick=t.onClick||e.defaults.onClick,this.options.offset=t.offset||e.defaults.offset,this.options.escapeMarkup=t.escapeMarkup!==void 0?t.escapeMarkup:e.defaults.escapeMarkup,this.options.ariaLive=t.ariaLive||e.defaults.ariaLive,this.options.style=t.style||e.defaults.style,t.backgroundColor&&(this.options.style.background=t.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var t=document.createElement("div");t.className="toastify on "+this.options.className,this.options.position?t.className+=" toastify-"+this.options.position:this.options.positionLeft===!0?(t.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):t.className+=" toastify-right",t.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');for(var l in this.options.style)t.style[l]=this.options.style[l];if(this.options.ariaLive&&t.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)t.appendChild(this.options.node);else if(this.options.escapeMarkup?t.innerText=this.options.text:t.innerHTML=this.options.text,this.options.avatar!==""){var d=document.createElement("img");d.src=this.options.avatar,d.className="toastify-avatar",this.options.position=="left"||this.options.positionLeft===!0?t.appendChild(d):t.insertAdjacentElement("afterbegin",d)}if(this.options.close===!0){var r=document.createElement("button");r.type="button",r.setAttribute("aria-label","Close"),r.className="toast-close",r.innerHTML="&#10006;",r.addEventListener("click",(function(g){g.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}).bind(this));var c=window.innerWidth>0?window.innerWidth:screen.width;(this.options.position=="left"||this.options.positionLeft===!0)&&c>360?t.insertAdjacentElement("afterbegin",r):t.appendChild(r)}if(this.options.stopOnFocus&&this.options.duration>0){var u=this;t.addEventListener("mouseover",function(g){window.clearTimeout(t.timeOutValue)}),t.addEventListener("mouseleave",function(){t.timeOutValue=window.setTimeout(function(){u.removeElement(t)},u.options.duration)})}if(typeof this.options.destination<"u"&&t.addEventListener("click",(function(g){g.stopPropagation(),this.options.newWindow===!0?window.open(this.options.destination,"_blank"):window.location=this.options.destination}).bind(this)),typeof this.options.onClick=="function"&&typeof this.options.destination>"u"&&t.addEventListener("click",(function(g){g.stopPropagation(),this.options.onClick()}).bind(this)),typeof this.options.offset=="object"){var f=n("x",this.options),m=n("y",this.options),y=this.options.position=="left"?f:"-"+f,F=this.options.gravity=="toastify-top"?m:"-"+m;t.style.transform="translate("+y+","+F+")"}return t},showToast:function(){this.toastElement=this.buildToast();var t;if(typeof this.options.selector=="string"?t=document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||typeof ShadowRoot<"u"&&this.options.selector instanceof ShadowRoot?t=this.options.selector:t=document.body,!t)throw"Root element is not defined";var l=e.defaults.oldestFirst?t.firstChild:t.lastChild;return t.insertBefore(this.toastElement,l),e.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout((function(){this.removeElement(this.toastElement)}).bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(t){t.className=t.className.replace(" on",""),window.setTimeout((function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),t.parentNode&&t.parentNode.removeChild(t),this.options.callback.call(t),e.reposition()}).bind(this),400)}},e.reposition=function(){for(var t={top:15,bottom:15},l={top:15,bottom:15},d={top:15,bottom:15},r=document.getElementsByClassName("toastify"),c,u=0;u<r.length;u++){i(r[u],"toastify-top")===!0?c="toastify-top":c="toastify-bottom";var f=r[u].offsetHeight;c=c.substr(9,c.length-1);var m=15,y=window.innerWidth>0?window.innerWidth:screen.width;y<=360?(r[u].style[c]=d[c]+"px",d[c]+=f+m):i(r[u],"toastify-left")===!0?(r[u].style[c]=t[c]+"px",t[c]+=f+m):(r[u].style[c]=l[c]+"px",l[c]+=f+m)}return this};function n(t,l){return l.offset[t]?isNaN(l.offset[t])?l.offset[t]:l.offset[t]+"px":"0px"}function i(t,l){return!t||typeof l!="string"?!1:!!(t.className&&t.className.trim().split(/\s+/gi).indexOf(l)>-1)}return e.lib.init.prototype=e.lib,e})})(v)),v.exports}var gt=mt();const vt=pt(gt);function _(o,s="error"){const e={error:"linear-gradient(to right, #ff5f6d, #ffc371)",success:"linear-gradient(to right, #4a90e2, #7bb8f5)",info:"linear-gradient(to right, #50c878, #8fe3a0)"};vt({text:o,close:!0,style:{background:e[s]||e.info},duration:4e3}).showToast()}const{selectEl:b,catInfoEl:P,weatherSideBarEl:yt,movieWidget:xt,movieModal:w}=$;async function bt(){at();try{const[o,s]=await Promise.all([X(),Q()]);b.innerHTML=W(o);yt.innerHTML=D(s);new R(b,{optionStyle:"radio",hideOnSelect:!0})}catch(o){_(`Initialization error: ${o.message}`)}finally{nt(),dt()}}bt();b.addEventListener("change",wt);async function wt(o){P.innerHTML="";const s=o.target.value;s&&St(s)}async function St(o){try{ct(),lt();const s=await Z(o),e=s[0].breeds[0],a=s[0].url;if(!e)throw new Error("No cat data");const n=H(e,a);P.insertAdjacentHTML("beforeend",n)}catch(s){_(`Error loading breed information:${s.message}`),console.error("Ошибка загрузки информации о породе:",s.message)}finally{rt()}}xt.addEventListener("click",async()=>{try{const o=await ot(),s=await et(o.id),e=await st(o.id);w.innerHTML=J(s,e),ut()}catch(o){_(`Error loading widget: ${o.message}`),console.error("Ошибка загрузки виджета:",o.message)}});w.addEventListener("click",o=>{(o.target.classList.contains("movie-modal__close")||o.target===w)&&ht()});
