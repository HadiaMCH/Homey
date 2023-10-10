import { useState } from "react";
import React from "react";
import "./equipmentmodal.css";
import AddMoreData from "./addmoredata.jsx"

const EquipmentModal = ({ isOpen, onClose, modalData, token, isDataProvider}) => {
   
  const [isAddMoreDataModal, setIsAddMoreDataModal] = useState(false); 

  const handleContentClick = (event) => {
    event.stopPropagation();
  };
 
  const onAddMoreData = () => {
    setIsAddMoreDataModal(true);
  };

  const handleCloseAddMoreDataModal = () => {
    setIsAddMoreDataModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
      <div id="about" className="modal-content" onClick={handleContentClick} style={{width:"50%"}}>
        <div className="row" style={{width:"90%"}}>
          <div className="col-md-6" style={{borderRight:"1px solid black"}}>
            <div className="modal-text">
              <h2>{modalData.type}</h2>
              <h3>{modalData.model}</h3>
              <div style={{paddingLeft:"25%", margin:"10px"}}>
                <img src={"http://localhost:8000"+modalData.image} className="modal-image" alt={modalData.type + modalData.make + modalData.model} style={{width: "50%"}}/>
              </div>
              <h4>Manufacturer or brand : {modalData.make}</h4>
              <h4>Patterns of usage : {modalData.usagepatterns}</h4>
              <h4>Physical location : {modalData.locations}</h4>
              <h2>      </h2>   

              {modalData.manualfile !== null && (
                <div className="failure-list">
                  <h3>Manual Instruction:</h3>
                  <a href={"http://localhost:8000"+modalData.manualfile} target="_blank" rel="noopener noreferrer">
                    View Manual Instruction
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6" style={{paddingLeft:"5%"}}>
            <h3>Equipements locations arround the world</h3>
            <a href="https://maps.google.com/" target="_blank">
              <img src="img/maps.png" alt="Map" />
            </a>
            <h4>Failure frequency : 1 failure per year{modalData.failure_frequency}</h4>
            <h4>20% of our users own equipements of this model</h4>
            {token && isDataProvider ? (
              <button className="btn btn-custom btn-lg" onClick={onAddMoreData} style={{marginLeft: "30%"}}>
                Add More Data
              </button>
            ):(
              null
            )}
          </div>
        </div>
      </div>
    </div>

    {isAddMoreDataModal && (
          <AddMoreData
            isOpen={isAddMoreDataModal} 
            onClose={handleCloseAddMoreDataModal}
            token={token}
          />
        )}
    </>
  );
};

export default EquipmentModal;