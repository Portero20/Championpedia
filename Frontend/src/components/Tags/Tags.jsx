import "../Create-Article/_createArticle.scss";

import React from "react";

const Tags = ({ showValue, article }) => {
  return (
    <div className="inputsEtiquetas">
      <label className="agregarEtiqueta">Agregar etiquetas</label>
      <input
        type="text"
        placeholder="Escribe las etiquetas..."
        className="inputComas"
        name="tags"
        id="tags"
        defaultValue={showValue ? article.tags : null}
      />

      <div className="tooltip-container">
        <i className="fa-solid fa-circle-info questionIcon"></i>

        <span className="tooltip">
          No te olvides de separar con comas.
        </span>
      </div>
    </div>
  );
};

export default Tags;
