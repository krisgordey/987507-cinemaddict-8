const isStats = (name) => name === `Stats` ? `main-navigation__item--additional` : ``;

export default (item) => `
  <a href="#${item.name}" 
  class="main-navigation__item ${isStats(item.name)}">
  ${item.name}
  ${item.count ? `<span class="main-navigation__item-count">${item.count}</span>` : ``}
  </a>`;
