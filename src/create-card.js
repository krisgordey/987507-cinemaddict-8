export default (cardData, noControls) => `<article class="film-card ${noControls ? `film-card--no-controls` : ``}">
          <h3 class="film-card__title">${cardData.title}</h3>
          <p class="film-card__rating">${cardData.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${cardData.year}</span>
            <span class="film-card__duration">${cardData.duration}</span>
            <span class="film-card__genre">${cardData.genre}</span>
          </p>
          <img src="${cardData.picture}" alt="" class="film-card__poster">
          <p class="film-card__description">${cardData.desc}</p>
          <button class="film-card__comments">${cardData.comments} comments</button>

          ${!noControls ? `<form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>` : ``}
        </article>`;
