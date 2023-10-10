import React from "react";
import "./image.css";

export const UserImage = ({ equipment, onOpenUserModal }) => {
  const handleClick = () => {
    onOpenUserModal(
      equipment         
    );
  };

  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        <a href={`#Equipement-${equipment.id}`} className="link-button" onClick={handleClick}>
          <div className="hover-text">
            <h4>{equipment.name}</h4>
            <h4>{equipment.equipementmodel.make}</h4>
            <h4>{equipment.equipementmodel.model}</h4>
            <h4>{equipment.serialnumber}</h4>
          </div>
          <img src={"http://localhost:8000"+equipment.image}className="img-responsive" alt={equipment.name + equipment.equipementmodel.make + equipment.equipementmodel.model} />
        </a>
      </div>
    </div>
  );
};
