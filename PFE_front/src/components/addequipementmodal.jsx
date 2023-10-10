import React, { useState } from "react";
import "./addequipementmodal.css"
import axios from "axios";

const AddEquipmentModal = ({isOpen, onClose, token, data, setLandingPageData}) => {
  const [equipmentData, setEquipmentData] = useState({
    name: "",
    model: null,
    image:null,
    serialNumber: "",
    installationDate: "",
    lastMaintenanceDate: null,
    currentHealth: "",
    garantie : null,
    failureHistory: [], 
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Ensure the installationDate follows the format YYYY-MM-DD
    if (name === 'installationDate' || name === 'lastMaintenanceDate' ) {
      const formattedDate = formatDate(value);
      setEquipmentData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setEquipmentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    // Pad single digits with leading zeros
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  };
  
  // Rest of the component remains unchanged
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setEquipmentData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleAddEquipment = () => {

    const formData = new FormData();
    formData.append("name", equipmentData.name);
    formData.append("equipementmodel", equipmentData.model);
    formData.append("image", equipmentData.image);
    formData.append("serialnumber", equipmentData.serialNumber);
    formData.append("dateinstallation", equipmentData.installationDate);
    formData.append("datelastmaintenance", equipmentData.lastMaintenanceDate);
    formData.append("currenthealth", equipmentData.currentHealth);
    formData.append("garantie", equipmentData.garantie);

    // Send a POST request using Axios
    axios
      .post("http://localhost:8000/api/equipement/add/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLandingPageData(prevData => ({
          ...prevData,
          UserGallery: [...prevData.UserGallery, equipmentData]
        }));

        console.log("Equipment added successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error adding equipment:", error);
      });
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  if (!isOpen) return null;  
  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="container" id="addequipement" onClick={handleContentClick}>
        <div className="container2">
            <div className="section-title">
                <h2>Add New Equipement</h2>
            </div>
            <form>
            <h3 style={{ marginTop: "0px", marginBottom: "0px" }}>Key Equipment Attributes :</h3>
            <label> Name :</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={equipmentData.name}
                onChange={handleInputChange}
                required
            />
            <label>Model:</label>
            <select
              name="model"
              value={equipmentData.model}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Model</option>
              {data.map((model) => (
                <option key={model.idequipementmodel} value={model.idequipementmodel}>
                  {model.type+" "+ model.make+" "+ model.model}
                </option>
              ))}
            </select>
            <label> Serial Number :</label>
            <input
                type="text"
                name="serialNumber"
                placeholder="Serial Number"
                value={equipmentData.serialNumber}
                onChange={handleInputChange}
                required
            />
            <label> Installation Date :</label>
            <input
                type="date"
                name="installationDate"
                placeholder="Installation Date"
                value={equipmentData.installationDate}
                onChange={handleInputChange}
            />
            <label> Last Maintenance Date :</label>
            <input
                type="date"
                name="lastMaintenanceDate"
                placeholder="Last Maintenance Date"
                value={equipmentData.lastMaintenanceDate}
                onChange={handleInputChange}
            />
            <label>Current Health:</label>
            <select
                name="currentHealth"
                value={equipmentData.currentHealth}
                onChange={handleInputChange}
                required
            >
                <option value="">Select Current Health</option>
                <option value="warning">Warning</option>
                <option value="good">Good</option>
                <option value="critical">Critical</option>
            </select>
            <label> Garantie Information :</label>
            <input
                type="text"
                name="garantie"
                placeholder="Garantie Information"
                value={equipmentData.garantie}
                onChange={handleInputChange}
            />

            <label>Image :</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />

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
                onClick={handleAddEquipment}
                >
                Add Equipement
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddEquipmentModal;
