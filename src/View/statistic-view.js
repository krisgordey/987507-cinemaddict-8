import Component from "../helpers/component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import _ from 'lodash';

export default class StatisticView extends Component {
  constructor() {
    super();
    this._movies = null;

    this.isHidden = true;
    this._myChart = null;

    this._totalDuration = null;
    this._totalWatched = null;
    this._genres = null;
    this._topGenre = null;

    this.BAR_HEIGHT = 50;

    this._onFilterCase = this._onFilterCase.bind(this);
  }

  get _statisticCtx() {
    return this._element.querySelector(`.statistic__chart`);
  }

  get _statisticTextMarkup() {
    return `<li class="statistic__text-item">
              <h4 class="statistic__item-title">You watched</h4>
              <p class="statistic__item-text">${this._totalWatched} <span class="statistic__item-description">movies</span></p>
            </li>
            <li class="statistic__text-item">
              <h4 class="statistic__item-title">Total duration</h4>
              <p class="statistic__item-text">${Math.floor(moment.duration(this._totalDuration, `minutes`).asHours())} <span class="statistic__item-description">h</span> ${moment.duration(this._totalDuration, `minutes`).minutes()} <span class="statistic__item-description">m</span></p>
            </li>
            <li class="statistic__text-item">
              <h4 class="statistic__item-title">Top genre</h4>
              <p class="statistic__item-text">${this._topGenre}</p>
            </li>`;
  }

  get template() {
    return `<section class="statistic visually-hidden">
              <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>
          
              <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
                <p class="statistic__filters-description">Show stats:</p>
          
                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
                <label for="statistic-all-time" class="statistic__filters-label">All time</label>
          
                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
                <label for="statistic-today" class="statistic__filters-label">Today</label>
          
                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
                <label for="statistic-week" class="statistic__filters-label">Week</label>
          
                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
                <label for="statistic-month" class="statistic__filters-label">Month</label>
          
                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
                <label for="statistic-year" class="statistic__filters-label">Year</label>
               </form>
          
              <ul class="statistic__text-list">
              </ul>
          
              <div class="statistic__chart-wrap">
                <canvas class="statistic__chart" width="1000"></canvas>
              </div>
            </section>`;
  }

  get _chartData() {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._genres.map((it) => it[0]),
        datasets: [{
          data: this._genres.map((it) => it[1]),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        responsive: true,
        responsiveAnimationDuration: 300,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    };
  }

  set movies(movies) {
    this._movies = _.cloneDeep(movies);

    this._update(this._movies.history);
  }

  _onFilterCase(evt) {
    // Вариант с пересозданием и пересчётом высоты контейнера
    this._myChart.destroy();

    const filteredMovies = this._getFilteredMovies(evt.target.value, this._movies.history);
    this._update(filteredMovies);

    this._statisticCtx.height = this._chartData.data.labels.length * this.BAR_HEIGHT;
    this._myChart = new Chart(this._statisticCtx, this._chartData);

    // Вариант с обновлением, без подгонки по высоте
    // const filteredMovies = this._getFilteredMovies(evt.target.value, this._movies.history);
    // this._update(filteredMovies);
    //
    // this._myChart.data.labels = this._chartData.data.labels;
    // this._myChart.data.datasets.data = this._chartData.data.datasets.data;
    // this._myChart.update();
  }

  _update(movies) {
    this._totalDuration = movies.reduce((acc, movie) => acc + movie.duration, 0);
    this._totalWatched = movies.length;
    const unsortedGenresMap = movies.reduce((acc, movie) => [...acc, ...movie.genre], [])
      .reduce((acc, genre) => {
        if (acc.get(genre)) {
          acc.set(genre, acc.get(genre) + 1);
        } else {
          acc.set(genre, 1);
        }
        return acc;
      }, new Map());

    this._genres = [...unsortedGenresMap].sort((a, b) => b[1] - a[1]);
    this._topGenre = this._genres[0][0];

    this._element.querySelector(`.statistic__rank-label`).innerText = `Grand ${this._topGenre} Fan`;
    this._element.querySelector(`.statistic__text-list`).innerHTML = this._statisticTextMarkup;
  }

  _getFilteredMovies(filter, movies) {
    if (filter === `all-time`) {
      return movies;
    }
    if (filter === `today`) {
      filter = `day`;
    }
    return movies.filter((movie) => moment(movie.watchingDate).isSame(Date.now(), filter));
  }

  hideView() {
    this.isHidden = true;
    this._element.classList.add(`visually-hidden`);

    this._myChart.destroy();
  }

  showView() {
    this.isHidden = false;
    this._element.classList.remove(`visually-hidden`);

    this._statisticCtx.height = this._chartData.data.labels.length * this.BAR_HEIGHT;

    this._myChart = new Chart(this._statisticCtx, this._chartData);
  }

  addListeners() {
    this._element.addEventListener(`change`, this._onFilterCase);
  }
}
