import React from "react";
import Styles from "./Paginado.module.css";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul className={Styles.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={Styles.active} key={number}>
              <a href="#" onClick={() => paginado(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
