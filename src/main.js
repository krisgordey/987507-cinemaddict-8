import Controller from './controller.js';

const app = new Controller();
app.start();

// import API from './helpers/api';
//
// new API({
//   endPoint: `https://es8-demo-srv.appspot.com/moowle/`,
//   authorization: `Basic eo0w590ik29889addddtt`,
// }).getFilms().then((films) => console.log(films));

// const headers = new Headers();
// headers.append(`Authorization`, `Basic eo0w590ik29889addddtt`);
// fetch(`https://es8-demo-srv.appspot.com/moowle/movies`, {method: 'GET', headers})
//   .then((response) => {
//     if (response.status >= 200 && response.status < 300) {
//       return response;
//     } else {
//       throw new Error(`${response.status}: ${response.statusText}`);
//     }
//   })
//   .then((response) => console.log(response.json()))
//   .catch(err => console.log(`blet`))
