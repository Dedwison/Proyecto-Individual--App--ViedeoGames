import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllCards from "./AllCards";
import SearchBar from "./SearchBar";
import Styles from "./Home.module.css";
import {
  getVideogames,
  filterVideogamesByGenres,
  filterCreated,
  orderByName,
  getGenres,
} from "../actions";

export default function Home() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function handleClick(e) {
    dispatch(getVideogames());
  }

  function handleFilterGeners(e) {
    dispatch(filterVideogamesByGenres(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  return (
    <div>
      <div className={Styles.header}>
        <h1 className={Styles.h1}>VIDEOJUEGOS GENIALES</h1>
        <Link to="/create">
          <button className={Styles.button}>Crear videojuego</button>
        </Link>
        <button
          className={Styles.button}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recargar videojuegos
        </button>
        <div>
          <select className={Styles.select} onChange={(e) => handleSort(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            {/* <option value="rat">Rating</option> */}
          </select>
          <select
            className={Styles.select}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option value="all">Todos</option>
            <option value="api">Existentes</option>
            <option value="created">Creados</option>
          </select>
          <select
            className={Styles.select}
            onChange={(e) => handleFilterGeners(e)}
          >
            <option value="All">All</option>
            {genres.map((gn) => (
              <option value={gn.name}>{gn.name}</option>
            ))}
          </select>
        </div>
        <SearchBar />
      </div>
      <AllCards />
    </div>
  );
}
