//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Genre } = require("./src/db.js");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, PORT } = process.env;

const loadGenres = () => {
  axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((response) => {
      let genreList = response.data.results.map((gn) => {
        const genre = {
          id: gn.id,
          name: gn.name,
        };
        return genre;
      });
      Genre.bulkCreate(genreList);
    });
};

// Syncing all the models at once.
conn.sync({ force: true, alter: false }).then(async () => {
  await loadGenres();
  // console.log(genreList);
  server.listen(PORT, () => {
    console.log("%s listening at ", PORT); // eslint-disable-line no-console
  });
});
