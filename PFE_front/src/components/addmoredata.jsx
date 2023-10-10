import React, { useState, useRef } from "react";
import "./addequipementmodal.css"
import axios from "axios";

const AddMoreData = ({isOpen, onClose,token}) => {

  const [equipmentmodelData, setEquipmentmodelData] = useState({
    moreData: null,
  });

  const handleMoreDataChange = (event) => {
    setEquipmentmodelData((prevData) => ({
      ...prevData,
      moreData: event.target.files[0],
    }));
  };

  const moreDataInputRef = useRef(null);

  const handleAddModel = () => {
    const formData = new FormData();
    formData.append('moredata', equipmentmodelData.manualFile);
    console.log('More Data added successfully!');
    onClose();
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };


  if (!isOpen) return null;  
  return (
    <>
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="container" id="addequipement" onClick={handleContentClick} style={{ width: "35%"}}>
        <div className="container2">
            <div className="section-title" style={{marginBottom: "10px"}}>
                <h2>Add More Data </h2>
            </div>
            <form>

            {/* Additional input fields for manuel */}
            <div className="input-container" style={{display: "block", width: "100%"}}>
                <label>Add here your file :</label>
                <input
                  type="file"
                  name="moreData"
                  accept=".csv"
                  ref={moreDataInputRef}
                  onChange={handleMoreDataChange}
                  required
                />
            </div>
            <div className="button-container">
              <button
                type="button"
                className="btn btn-custom btn-lg"
                onClick={onClose}
                style={{margin: "10px 0"}}>
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-custom btn-lg"
                onClick={handleAddModel}
                style={{margin: "10px 0"}}
              >
                Add
              </button>
            </div>
            </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddMoreData;
