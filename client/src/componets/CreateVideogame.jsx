import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres, getVideogamesNames } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import videoFondo2 from "../assets/fondo2.mp4";
import Styles from "./CreateVideogame.module.css";

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: 0,
    image: "",
    platforms: [],
    genres: [],
  });

  function validate(input) {
    let errors = {};
    if (!input.name.trim()) {
      errors.name = "El campo 'Nombre' es requerido";
    }
    if (!input.description) {
      errors.description = "Debe escribir una descripción del videojuego";
    }
    if (!input.rating) {
      errors.rating = "Debe establecer un valor entre 1 y 5";
    }
    if (!input.genres.length) {
      errors.genres = "Debe seleccionar uno o más géneros";
    }
    if (!input.platforms.length) {
      errors.platforms =
        "Especifique en que plataforma se ejecuta el videojuego";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleBlur(e) {
    handleChange(e);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleBlurGenres(e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleBlurPlatforms(e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectGeners(e) {
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handleSelectPlatforms(e) {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== el),
    });
  }

  function handleDeletePlatforms(el) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input));
    if (Object.keys(errors).length === 0) {
      dispatch(postVideogame(input));
      alert("Viedeojuego creado");
      setInput({
        name: "",
        description: "",
        rating: 0,
        image: "",
        platforms: [],
        genres: [],
      });
      history.push("/home");
    } else {
      alert("Faltan campos por completar");
    }
  }
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  return (
    <div className={Styles.main}>
      <div className={Styles.overlay}></div>
      <video
        className={Styles.videoFondo}
        src={videoFondo2}
        autoplay="autoplay"
        loop="loop"
        preload="auto"
        muted="muted"
      />
      <div className={Styles.content}>
        <h1 className={Styles.h1}>Crear Videojuego</h1>
        <form className={Styles.form} onSubmit={(e) => handleSubmit(e)}>
          <label className={Styles.label}>Nombre:</label>
          {errors.name && <span className={Styles.error}> {errors.name}</span>}
          <input
            className={Styles.input}
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            placeholder="Ingresa el nombre"
          />
          <label className={Styles.label}>Description:</label>
          {errors.description && (
            <span className={Styles.error}> {errors.description}</span>
          )}
          <input
            className={Styles.input}
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            placeholder="Escribe la descripcion"
          />
          <label className={Styles.label}>Rarting (de 1 a 5):</label>
          <span> {input.rating}</span>
          {errors.rating && (
            <span className={Styles.error}> {errors.rating}</span>
          )}
          <input
            className={Styles.input}
            type="range"
            step="0.10"
            value={input.rating}
            name="rating"
            min="1"
            max="5"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
          />
          <label className={Styles.label}>Image:</label>
          {errors.image && (
            <span className={Styles.error}> {errors.image}</span>
          )}
          <input
            className={Styles.input}
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
          />
          <label className={Styles.label}>Genres:</label>
          {errors.genres && (
            <span className={Styles.error}> {errors.genres}</span>
          )}
          <select
            className={Styles.select}
            name="genres"
            value={input.genres}
            onChange={(e) => handleSelectGeners(e)}
            onBlur={(e) => handleBlurGenres(e)}
          >
            {genres.map((gn) => (
              <option value={gn.name}>{gn.name}</option>
            ))}
          </select>
          {input.genres.map((el) => (
            <div className={Styles.closeGenres}>
              <span>{el}</span>
              <button
                className={Styles.botonX}
                onClick={() => handleDelete(el)}
              >
                x
              </button>
            </div>
          ))}
          <label className={Styles.label}>Plataforma:</label>
          {errors.platforms && (
            <span className={Styles.error}> {errors.platforms}</span>
          )}
          <select
            className={Styles.select}
            name="platforms"
            value={input.platforms}
            onChange={(e) => handleSelectPlatforms(e)}
            onBlur={(e) => handleBlurPlatforms(e)}
          >
            <option value="Nintendo">Nintendo</option>
            <option value="Playstation">Playstation</option>
            <option value="Sega">Sega</option>
            <option value="Xbox">Xbox</option>
            <option value="Android">Android</option>
            <option value="macOS">macOS</option>
            <option value="Windows">Windows</option>
            <option value="Switch">Switch</option>
            <option value="Steam">Steam</option>
            <option value="Pc">Pc</option>
          </select>
          {input.platforms.map((el) => (
            <div className={Styles.closePlatforms}>
              <span>{el}</span>
              <button
                className={Styles.botonX}
                onClick={() => handleDeletePlatforms(el)}
              >
                x
              </button>
            </div>
          ))}
          <button className={Styles.button} type="submit">
            Crear
          </button>
          <Link to="/home">
            <button className={Styles.button}>Volver</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
