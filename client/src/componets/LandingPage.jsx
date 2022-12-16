import React from "react";
import { Link } from "react-router-dom";
import videoFondo from "./LandingPage.module.css";
import videoGamers from "../assets/gamers.mp4";

export default function LandingPage() {
  return (
    <div className={videoFondo.main}>
      <div className={videoFondo.overlay}></div>
      <video
        className={videoFondo.videoBackground}
        src={videoGamers}
        autoplay="autoplay"
        loop="loop"
        preload="auto"
        muted="muted"
      />
      <div className={videoFondo.content}>
        <h1>Bienvenidos a mi website</h1>
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
