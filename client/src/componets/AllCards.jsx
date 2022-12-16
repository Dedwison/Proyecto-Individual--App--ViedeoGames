import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { Link } from "react-router-dom";
import { getVideogames } from "../actions";
import Paginado from "./Paginado";
import Styles from "./AllCards.module.css";

export default function AllCards() {
  //pedido estado de redux
  let estadoVideogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  let currentVideoGames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <>
      <div>
        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
        <div className={Styles.wraper}>
          {currentVideoGames.length > 0 ? (
            currentVideoGames.map((vg) => (
              <div className={Styles.upHover}>
                <Link
                  className={Styles.underline}
                  key={vg.id}
                  to={`/videogames/${vg.id}`}
                >
                  <Card
                    className={Styles.card}
                    image={vg.image ? vg.image : "https://bit.ly/3LBQsrf"}
                    name={vg.name}
                    genre={
                      vg.created ? vg.genres.map((el) => el.name) : vg.genres
                    }
                    id={vg.id}
                    key={vg.id}
                  />
                </Link>
              </div>
            ))
          ) : (
            <h2>Loading</h2>
          )}
        </div>
      </div>
    </>
  );
}
