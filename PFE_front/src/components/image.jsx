import React from "react";
import "./image.css";

export const Image = ({ equipment, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(
      equipment
    );
  };

  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        <a href={`#Equipement-${equipment.id}`} className="link-button" onClick={handleClick}>
          <div className="hover-text">
            <h4>{equipment.type}</h4>
            <h4>{equipment.make}</h4>
            <h4>{equipment.model}</h4>
          </div>
          <img src={"http://localhost:8000"+equipment.image} className="img-responsive" alt={equipment.type + equipment.make + equipment.model} />
        </a>
      </div>
    </div>
  );
};
