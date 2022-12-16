import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../actions";
import Styles from "./Detail.module.css";

export default function Detail() {
  let myVideogame = [];
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearDetail());
  }, []);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  myVideogame = useSelector((state) => state.detail);
  console.log(myVideogame);
  return (
    <div>
      {myVideogame.length != 0 ? (
        <div>
          <h1 className={Styles.h1}>{myVideogame.name}</h1>
          <img
            src={
              myVideogame.image ? myVideogame.image : "https://bit.ly/3LBQsrf"
            }
            alt="img game"
            width="700px"
            height="500px"
          />
          <h3 className={Styles.plataformas}>
            Plataformas: {myVideogame.platforms.join(" ")}
          </h3>
          <h2 className={Styles.generos}>
            Géneros:{" "}
            {myVideogame.created === true
              ? myVideogame.genres.map((el) => el.name).join(" ")
              : myVideogame.genres.join(" ")}
          </h2>
          <h3 className={Styles.rating}>Rating: {myVideogame.rating}</h3>
          {myVideogame.created && <p>Creado por: {myVideogame.creadoPor}</p>}
          <h4 className={Styles.fecha}>
            Fecha de lanzamiento:{" "}
            <span className={Styles.date}>{myVideogame.releasedDate}</span>
          </h4>
          <div className={Styles.description}>
            <p>DESCRIPCIÓN: {myVideogame.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Regresar</button>
      </Link>
    </div>
  );
}
