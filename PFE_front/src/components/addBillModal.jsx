import React, { useState } from "react";
import "./manageaccessmodal.css";
import axios from "axios";

const AddBillModal = ({
  isOpen,
  onClose,
  token,
  equipmentId,
  setUserModalData,
}) => {
  const [billFile, setBillFile] = useState(null);

  const handleFileChange = (event) => {
    setBillFile(event.target.files[0]);
  };

  const handleAddSharedPerson = () => {
    const formData = new FormData();
    formData.append("equipement_id", equipmentId);
    formData.append("billfile", billFile);
  
    console.log("FormData:", formData);

    axios
      .post("http://localhost:8000/api/bill/create/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Bill file uploaded successfully:", response.data);
        // Update usermodalData with the new bill
        setUserModalData((prevData) => {
          const updatedBills = [...prevData.bills, response.data];
          return { ...prevData, bills: updatedBills };
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error uploading bill file:", error);
      });
  };
  
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content-share" style={{ width: "20%" }}>
        <h2>Add bill file</h2>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input type="file" onChange={handleFileChange} required />
          <button onClick={handleAddSharedPerson}>Add</button>
        </div>
  
        <button onClick={onClose} style={{ marginLeft: "40%" }}>
          Close
        </button>
      </div>
    </div>
  );  

};

export default AddBillModal;
