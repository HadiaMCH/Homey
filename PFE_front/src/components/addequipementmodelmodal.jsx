import React, { useState, useRef } from "react";
import "./addequipementmodal.css"
import axios from "axios";

const AddEquipmentModelModal = ({isOpen, onClose,token}) => {

  const [equipmentmodelData, setEquipmentmodelData] = useState({
    type: "",
    make: "",
    model: "",
    image:null,
    usagePatterns: "",
    locations: "",
    manualFile: null,
    failureFrequency:"",
  });

  const handleManualFileChange = (event) => {
    setEquipmentmodelData((prevData) => ({
      ...prevData,
      manualFile: event.target.files[0],
    }));
  };

  const manualFileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEquipmentmodelData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddModel = () => {
    const formData = new FormData();

    formData.append('type', equipmentmodelData.type);
    formData.append('make', equipmentmodelData.make);
    formData.append('model', equipmentmodelData.model);
    formData.append('usagepatterns', equipmentmodelData.usagePatterns);
    formData.append('locations', equipmentmodelData.locations);
    formData.append('manualfile', equipmentmodelData.manualFile);
    formData.append('image', equipmentmodelData.image);
    formData.append('failure_frequency', equipmentmodelData.failureFrequency);
  
    axios
    .post("http://localhost:8000/api/equipementmodel/equipement_model/create/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => {
        console.log('Equipment model added successfully!', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error adding equipment model:', error);
        onClose();
      });
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setEquipmentmodelData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  if (!isOpen) return null;  
  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="container" id="addequipement" onClick={handleContentClick}>
        <div className="container2">
            <div className="section-title">
                <h2>Add New Equipement Model</h2>
            </div>
            <form>
            <h3 style={{ marginTop: "0px", marginBottom: "0px" }}>Key Equipment Model Attributes :</h3>
            <label> Type :</label>
            <input
                type="text"
                name="type"
                placeholder="Type"
                value={equipmentmodelData.type}
                onChange={handleInputChange}
                required
            />
            <label> Make :</label>
            <input
                type="text"
                name="make"
                placeholder="Make"
                value={equipmentmodelData.make}
                onChange={handleInputChange}
                required
            />
            <label> Model :</label>
            <input
                type="text"
                name="model"
                placeholder="Model"
                value={equipmentmodelData.model}
                onChange={handleInputChange}
                required
            />
            <label> Usage Patterns :</label>
            <input
                type="text"
                name="usagePatterns"
                placeholder="Usage Patterns"
                value={equipmentmodelData.usagePatterns}
                onChange={handleInputChange}
                required
            />
            <label> Location :</label>
            <input
                type="text"
                name="locations"
                placeholder="Locations"
                value={equipmentmodelData.locations}
                onChange={handleInputChange}
                required
            />
            <label>Image :</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {/* Additional input fields for manuel */}
            <div className="input-container" style={{display: "block", width: "100%"}}>
                <label>Manual Instruction :</label>
                <input
                  type="file"
                  name="manual"
                  accept=".pdf, .jpg, .jpeg, .png"
                  ref={manualFileInputRef}
                  onChange={handleManualFileChange}
                  required
                />
              </div>
            <div className="button-container">
                <button
                type="button"
                className="btn btn-custom btn-lg"
                onClick={onClose}
                >
                Cancel
                </button>

                <button
                type="button"
                className="btn btn-custom btn-lg"
                onClick={handleAddModel}
                >
                Add Equipement model
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddEquipmentModelModal;
