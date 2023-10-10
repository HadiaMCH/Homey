import React, { useState } from "react";
import "./manageaccessmodal.css";
import axios from "axios";

const ManageAccessModal = ({
  isOpen,
  onClose,
  token,
  equipmentId,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [sharedWith, setSharedWith] = useState(["amina@gmail.com"]);

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleAddSharedPerson = async () => {
    if (emailInput.trim() !== "") {
      const updatedSharedWith = [...sharedWith, emailInput];
      setSharedWith(updatedSharedWith); 
  
      try {
        const response = await axios.post(
          "http://localhost:8000/api/equipement/share-add/", 
          {
            idequipement: equipmentId,
            email: emailInput,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
  
        console.log("Added shared email:", response.data);
      } catch (error) {
        console.error("Error adding shared email:", error);
      }
  
      setEmailInput("");
    }
  };
  
    

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content-share" style={{width: "20%"}}>
        <h2>Manage Access</h2>
        <div>
          <input
            type="email"
            value={emailInput}
            onChange={handleEmailInputChange}
            style={{width: "80%"}}
            required
          />
          <button onClick={handleAddSharedPerson}>Add</button>
        </div>
        <div>
          {sharedWith && sharedWith.length > 0 ? (
            <div>
              <h3>Shared With:</h3>
              <ul>
                {sharedWith.map((person, index) => (
                  <li key={index}>
                    {person}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No one has shared access yet.</p>
          )}
        </div>
        <button onClick={onClose} style={{marginLeft: "40%"}}>Close</button>
      </div>
    </div>
  );
};

export default ManageAccessModal;
