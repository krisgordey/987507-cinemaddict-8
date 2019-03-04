/**
 * Проверка: при наличии имени Stasts в элементе навигации присваивает элементу модификатор additional
 * @param {string} name
 * @return {string}
 */
const isStats = (name) => name === `Stats` ? `main-navigation__item--additional` : ``;

/**
 * Возвращает строку разметки
 * @param {object} item данные объекта элемента навигации
 * @return {string}
 */
export default (item) => `
  <a href="#${item.name}" 
  class="main-navigation__item ${isStats(item.name)}">
  ${item.name}
  ${item.count ? `<span class="main-navigation__item-count">${item.count}</span>` : ``}
  </a>`;
