import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profilemodal.css";

const ProfileModal = ({
  onClose,
  token,
  isDataProvider,
  setIsDataProvider
}) => {
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [editingDataProvider, setEditingDataProvider] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isCurrentPasswordMatched, setIsCurrentPasswordMatched] = useState(true);
  const [arePasswordsMatching, setArePasswordsMatching] = useState(true);

  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
    role: ""
  });
  
  useEffect(() => {
    // Fetch user data using the token
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/authentication/user-infos/", {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        const userData = response.data;
        setUser(prevData => {
          return { ...prevData, username: userData.username,email: userData.email,address: userData.address};
        });
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleSaveChanges = async () => {
    if (isDataProvider) {
      setUser(prevData => {
        return { ...prevData, role: "data_provider" };
      });
    } else {
      setUser(prevData => {
        return { ...prevData, role: "prop_owner" };
      });
    }
    try {
      const response = await axios.put(
        "http://localhost:8000/api/authentication/update-profile/",
        user,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      console.log(response.data);
      setEditingAddress(false);
      setEditingDataProvider(false);
      setEditingEmail(false);
      setEditingPassword(false);
      setEditingUsername(false);
    } catch (error) {
      console.error("Error updating user information:", error);
      onClose();
    }
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleEdit = (field) => {
    switch (field) {
      case "username":
        setEditingUsername(true);
        break;
      case "email":
        setEditingEmail(true);
        break;
      case "password":
        setEditingPassword(true);
        break;
      case "address":
        setEditingAddress(true);
        break;
      default:
        break;
    }
  };

  const handlePasswordEdit = () => {
    setEditingPassword(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsCurrentPasswordMatched(true);
    setArePasswordsMatching(true);
  };

  const validateCurrentPassword = () => {
    setIsCurrentPasswordMatched(currentPassword === user.password);
  };

  const validatePasswordsMatching = () => {
    setArePasswordsMatching(newPassword === confirmNewPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If editing password and validations pass, update the password in user
    if (editingPassword && isCurrentPasswordMatched && arePasswordsMatching) {
      setUser({ ...user, password: newPassword });
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/postEditProfile",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("User information updated successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating user information:", error);
      onClose();
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="container" id="contact" onClick={handleContentClick} style={{width: '40%', paddingBottom: '10px', paddingTop: "10px"}}>
        <div className="container2">
          <div className="section-title">
            <h2>Your Profile</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <div className="profile-info">
                {editingUsername ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                  />
                ) : (
                  <>
                    <span>{user.username}</span>
                    <i
                      className="fa fa-edit edit-icon"
                      onClick={() => handleEdit("username")}
                    ></i>
                  </>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <div className="profile-info">
                {editingEmail ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                ) : (
                  <>
                    <span>{user.email}</span>
                    <i
                      className="fa fa-edit edit-icon"
                      onClick={() => handleEdit("email")}
                    ></i>
                  </>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Address:</label>
              <div className="profile-info">
                {editingAddress ? (
                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                  />
                ) : (
                  <>
                    <span>{user.address}</span>
                    <i
                      className="fa fa-edit edit-icon"
                      onClick={() => handleEdit("address")}
                    ></i>
                  </>
                )}
              </div>
            </div>
            <div className="checkbox-container">
              <label>
                {isDataProvider
                  ? "You are a data provider"
                  : "You are not a data provider"}
              </label>
              {!editingDataProvider && (
                <i
                  className="fa fa-edit edit-icon"
                  onClick={() => setEditingDataProvider(true)}
                ></i>
              )}
            </div>
            {editingDataProvider && (
              <div className="checkbox-edit">
                <input
                  type="checkbox"
                  checked={isDataProvider}
                  onChange={() => setIsDataProvider(!isDataProvider)}
                  style={{ width: '10%' }}
                />
                <label htmlFor="checkbox" style={{width: "90%"}}>
                  Do you want to change your status?
                </label>
              </div>            
            )}
            <div className="button-container">
              <button
                type="button"
                className="btn btn-custom btn-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              { editingAddress || editingDataProvider || editingEmail || editingUsername ? (
                <button type="submit" className="btn btn-custom btn-lg" onClick={handleSaveChanges}>
                Save changes
                </button>
              ):(
                <></>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
