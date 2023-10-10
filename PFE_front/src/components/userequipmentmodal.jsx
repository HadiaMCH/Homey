import React, {useState} from "react";
import "./equipmentmodal.css";
import axios from "axios";
import ManageAccessModal from "./manageaccessmodal.jsx";
import AddFailureModal from "./addFailureModal";
import AddBillModal from "./addBillModal";
import CountdownTimer from './countdown';

const UserEquipmentModal = ({ isOpen, onClose, usermodalData, setUserModalData, token, setLandingPageData }) => {

  const [manageAccessModalOpen, setManageAccessModalOpen] = useState(false);
  const [addFailureModalOpen, setAddFailureModalOpen] = useState(false);
  const [addBillModalOpen, setAddBillModalOpen] = useState(false);

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleManageAccessClick = () => {
    setManageAccessModalOpen(true);
  };

  const handleAddFailureClick = () => {
    setAddFailureModalOpen(true);
  };

  const handleAddBillClick = () => {
    setAddBillModalOpen(true);
  };


  const handleRemoveClick = () => {
      axios
        .post(
          'http://localhost:8000/api/equipement/delete-equipment/',
          { equipement_id: usermodalData.idequipement },
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('Equipment removed successfully');
  
          // Remove the equipment from landingPageData.UserGallery
          setLandingPageData(prevData => {
            const updatedGallery = prevData.UserGallery.filter(item => item.idequipement !== usermodalData.idequipement);
            return { ...prevData, UserGallery: updatedGallery };
          });
  
          onClose(); 
        })
        .catch((error) => {
          // Handle error
          console.error('Error removing equipment', error);
        });
  };

  if (!isOpen) return null;

  return (
      <>
      <div className="modal-overlay" onClick={() => { onClose();}}>
        <div id="" className="modal-content" onClick={handleContentClick} style={{width: "70%"}}>
          <div className="row" style={{width:"90%"}}>
            <div className="col-md-6" style={{borderRight:"1px solid black"}}>
              <div className="modal-text">

                <h2>{usermodalData.name}</h2>

                {usermodalData.user === "you" ? (
                  <h3>Your own this equipement</h3>
                ) : (
                  <h3>Shared by : {usermodalData.user}</h3>
                )}
                
                <img
                    src={"http://localhost:8000"+usermodalData.image}
                    className="modal-image"
                    alt={usermodalData.equipementmodel.type + usermodalData.equipementmodel.make + usermodalData.equipementmodel.model}
                    style={{paddingLeft: "20%"}}
                  />

                <h4>Manufacturer or brand : {usermodalData.equipementmodel.make}</h4>

                <h4>Model : {usermodalData.equipementmodel.model}</h4>

                <h4>Serial number : {usermodalData.serialnumber}</h4>

                <h4>Patterns of usage : {usermodalData.equipementmodel.usagepatterns}</h4>

                <h4>Physical location : {usermodalData.equipementmodel.locations}</h4>

                <h4>Installation date : {usermodalData.dateinstallation}</h4>
                
                {usermodalData.datelastmaintenance!==null ? 
                    ( <h4>Last maintenance date : {usermodalData.datelastmaintenance}</h4>
                    ) : null
                }
                
                <h4>Current health : {usermodalData.currenthealth}</h4>

                {( usermodalData.garantie !== null ? (
                  <h4>Guarantee Information : {usermodalData.garantie}</h4>
                  ) : 
                  null)
                }
            </div>
            </div>
            <div className="col-md-6" style={{paddingLeft:"50px"}}>
              <div className="modal-text">
                {usermodalData.failurehistory && (
                  <div className="failure-list">
                    <h3>Failure List:</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Date of failure</th>
                          <th>Piece that Causes the failure</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(usermodalData.failurehistory).map((key, index) => (
                          <tr key={key}>
                            <td>{usermodalData.failurehistory[key].failuredate}</td>
                            <td>{usermodalData.failurehistory[key].failurecause}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                )}

                <div className="failure-list">
                  <h3>Manual Instruction:</h3>
                    <a href={"http://localhost:8000"+usermodalData.equipementmodel.manualfile} target="_blank" rel="noopener noreferrer">
                        View Manual Instruction
                    </a>
                </div>  

                <div className="failure-list">
                  <h3>Additional bills:</h3>
                  {usermodalData.bills.map((bill, index) => (
                    <div key={index}>
                      <a href={"http://localhost:8000"+bill.billfile} target="_blank" rel="noopener noreferrer">
                        View bill File {index}.
                      </a>
                    </div>
                  ))}
                </div>

              <h3>Failure prediction :</h3>

              {usermodalData.failurestate==="red" ?(
                  <>
                  <h4 style={{color:"red"}}>Your machine will have a failure in the next 10 days</h4>
                  <CountdownTimer initialTime={usermodalData.countdowndate}/>
                  <h4 >Current risk of having this failure is : {usermodalData.failurerisk} % (will be updated in one hour)</h4>
                  </>
              ) :(
                <>
                  <h4 style={{color:"green"}}>Your machine is safe in the next 10 days</h4>
                  <h4 >Current risk of having this failure is : {usermodalData.failurerisk}% (will be updated in one hour)</h4>
                </>
              )}
              </div>
            </div>
          </div>
          {usermodalData.user === "you" ? (
                  <div className="row" style={{width:"90%"}}>
                  <div
                    className="button-row"
                    style={{ display: "flex", justifyContent: "space-between", marginTop: "60px" }}>
                      <button className="btn btn-custom btn-lg" onClick={handleRemoveClick}>
                        Remove
                      </button>
                      <button className="btn btn-custom btn-lg" onClick={handleAddFailureClick}>
                        Add failure
                      </button>
                      <button className="btn btn-custom btn-lg" onClick={handleAddBillClick}>
                        Add bill
                      </button>
                      <button className="btn btn-custom btn-lg" onClick={handleManageAccessClick}>
                        Manage access
                      </button>
                  </div>
              </div>
                ) : (
                  null
                )}
        </div>
      </div>
      
      {manageAccessModalOpen && (
        <ManageAccessModal
          isOpen={manageAccessModalOpen}
          onClose={() => setManageAccessModalOpen(false)}
          token={token}
          equipmentId={usermodalData.idequipement}
        />
      )}

      {addFailureModalOpen && (
        <AddFailureModal
          isOpen={addFailureModalOpen}
          onClose={() => setAddFailureModalOpen(false)}
          token={token}
          equipmentId={usermodalData.idequipement}
          setUserModalData={setUserModalData}
        />
      )}

      {addBillModalOpen && (
        <AddBillModal
          isOpen={addBillModalOpen}
          onClose={() => setAddBillModalOpen(false)}
          token={token}
          equipmentId={usermodalData.idequipement}
          setUserModalData={setUserModalData}
        />
      )}


  </>
  );
};

export default UserEquipmentModal;