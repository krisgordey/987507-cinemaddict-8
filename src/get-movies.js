import generateMovie from './generate-movie.js';

export default (count) => {
  return new Array(count).fill(null).map(() => generateMovie());
};
