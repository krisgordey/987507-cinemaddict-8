export default (item) => `
  <a href="#${item.name}" 
  class="main-navigation__item ${item.name === `Stats` ? `main-navigation__item--additional` : ``}">
  ${item.name}
  ${item.count ? `<span class="main-navigation__item-count">${item.count}</span>` : ``}
  </a>`;
