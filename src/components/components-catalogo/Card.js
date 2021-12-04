import React from "react";
import PropTypes from "prop-types";

import "./Catalogo.css";

function Card({ title, genero, imageSource, edad, description, url }) {
  return (
    <div className="cardCatalog text-center animate__animated animate__fadeInUp mb-5">
      <div className="overflowCatalog">
        <img src={imageSource} alt="a wallpaper" className="card-img-topCatalog" />
      </div>
      <div className="card-bodyCatalog text-dark">
        <h4 className="card-title">{title}</h4>
        <h5 className="card-title">{genero}</h5>
        <p>{edad}</p>
        <p className="card-textCatalog text-secondary">
          {description
            ? description
            : "No hay descripcion por el momento."}
        </p>
        <a
          href={url ? url : "#!"}
          className="btn border-0 text-light"
          style={{'background': '#11B3C9'}}
          rel="noreferrer"
        >
          Adoptar a {title}
        </a>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  genero: PropTypes.string,
  edad: PropTypes.string,
  descripcion: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

export default Card;
