import React from "react";
import styles from "./Card.module.css";

export default function Card({ name, image, genre, key, id }) {
  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={image} alt="img not found" />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <h5 className={styles.cardGenres}>{genre.join(" ")}</h5>
      </div>
      <h1>{key}</h1>
    </div>
  );
}
