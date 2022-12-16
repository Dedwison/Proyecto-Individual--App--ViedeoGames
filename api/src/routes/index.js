const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const morgan = require("morgan");
const { API_KEY } = process.env;

const router = express.Router();

router.use(express.json());
router.use(morgan("dev"));

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  let arrayRes = [];
  for (let i = 1; i < 4; i++) {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}&page_size=40`;
    arrayRes.push(axios.get(url));
  }
  const res = await Promise.all(arrayRes);
  const data = res.map((res) => res.data.results);
  const apiInfo = data.flat();
  let objRes = apiInfo.map((game) => {
    return {
      id: game.id,
      name: game.name,
      releasedDate: game.released,
      rating: game.rating,
      platforms: game.parent_platforms.map((el) => el.platform.name),
      genres: game.genres.map((el) => el.name),
      image: game.short_screenshots[0].image,
    };
  });
  return objRes;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

const getAllVideoGames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const validateNewGame = (newGame) => {
  const { name, description, rating, platforms } = newGame;

  if (!name || !description || !platforms)
    throw Error("Faltan parametros necesarios");
  if (typeof description !== "string")
    throw Error("la descripcion debe ser en formato texto");
  if (typeof name !== "string")
    throw Error("el nombre debe ser en formato texto");
  if (rating < 1 || rating > 5)
    throw Error("rating debe ser un número entre 1 y 5");
  return true;
};

router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  let gameId2 = {};

  try {
    if (id.length < 6) {
      let url = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      gameId2 = {
        id: url.data.id,
        name: url.data.name,
        releasedDate: url.data.released,
        rating: url.data.rating,
        platforms: url.data.parent_platforms.map((el) => el.platform.name),
        genres: url.data.genres.map((el) => el.name),
        image: url.data.background_image,
        description: url.data.description_raw,
      };
      res.status(200).json(gameId2);
    } else {
      gameId2 = await Videogame.findByPk(id, {
        include: {
          model: Genre,
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
      }).then((results) => results.dataValues);
      res.status(200).json(gameId2);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  try {
    let gamesList = await getAllVideoGames();
    if (name) {
      let searchName = gamesList.filter((game) =>
        game.name.toLowerCase().includes(name.toLocaleLowerCase())
      );
      searchName.length
        ? res.status(200).send(searchName)
        : res
            .status(404)
            .send(`No se encontró ningun videojuego con el nombre: ${name}`);
    } else {
      res.status(200).send(gamesList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/genres", async (req, res) => {
  try {
    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres);
  } catch (error) {
    console.log(error);
    res.json({ msj: error.messsage });
  }
});

router.post("/videogames", async (req, res) => {
  let { name, description, rating, platforms, image, genres, genresId } =
    req.body;
  const allGenres = await Genre.findAll();
  const genreDataValue = allGenres.map((g) => g.dataValues);
  rating = parseFloat(rating);
  genresId = [];
  for (const el of genres) {
    let searchElement = genreDataValue.find((gn) => gn.name === el);
    genresId.push(searchElement.id);
  }
  const newGame = { name, description, rating, image, platforms };
  try {
    if (validateNewGame(newGame)) {
      newGame.name = newGame.name.toLocaleLowerCase();
      let gameCreated = await Videogame.create({ ...newGame });

      if (gameCreated) {
        await gameCreated.setGenres(genresId);
        const newGame = await Videogame.findByPk(gameCreated.id, {
          include: Genre,
        });
        return res.send(newGame);
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ msj: error.message });
  }
});

module.exports = router;
