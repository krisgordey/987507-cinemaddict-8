import generateMovie from './helpers/generate-movie.js';

export default (count) => {
  return new Array(count).fill(null).map(() => generateMovie());
};
