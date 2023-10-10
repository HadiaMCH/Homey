import React, { useState } from "react";
import axios from "axios";

const AddFailureModal = ({
  isOpen,
  onClose,
  token,
  equipmentId,
  setUserModalData
}) => {
  const [failureDate, setFailureDate] = useState("");
  const [failureCause, setFailureCause] = useState("");

  const handleAddFailure = () => {
    const requestBody = {
      failuredate: failureDate,
      failurecause: failureCause,
      equipement: equipmentId,
    };

    axios
      .post("http://localhost:8000/api/failure/add/", requestBody, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Failure added successfully:", response.data);
        
        // Update usermodalData with the new failure
        setUserModalData(prevData => {
          const updatedFailures = {
            ...prevData.failurehistory,
            [response.data.idfailure]: {
              failuredate: failureDate,
              failurecause: failureCause
            }
          };
          return { ...prevData, failurehistory: updatedFailures };
        });

        onClose();
      })
      .catch((error) => {
        console.error("Error adding failure:", error);
      });
  };


  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content-share" style={{ width: "20%" }}>
        <h2>Add failure information</h2>
        <div>
          <label>Date of Failure:</label>
          <input
            type="date"
            value={failureDate}
            onChange={(e) => setFailureDate(e.target.value)}
          />
        </div>
        <div>
          <label>Cause of Failure:</label>
          <textarea
            value={failureCause}
            onChange={(e) => setFailureCause(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleAddFailure} style={{ alignSelf: "flex-start" }}>
            Add
          </button>
          <button onClick={onClose} style={{ alignSelf: "flex-end" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFailureModal;
