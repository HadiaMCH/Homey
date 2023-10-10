import React, { useState } from "react";
import axios from "axios";
import "./loginmodal.css";

const LoginModal = ({
  onClose,
  setToken,
  isDataProvider,
  setIsDataProvider,
  setIsAdmin
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: null,
    email: null,
    password: null,
    address: null,
    date_naissance:null,
    role: null,
  });

  const handleToggle = () => {
    setIsLogin((prevState) => !prevState);
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/authentication/register/",
        user
      );
      
      if (response.data.message) {
        console.log(response.data.message);
        setError("");
        handleToggle();
      } else {
        if (response.data.message ==="User with this email or username already exists.") {
          setError("User with this email or username already exists.");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/authentication/login",
        user
      );
      if (response.data.token) {
        setToken(response.data.token);
        setIsDataProvider(response.data.role === "data_provider");
        setIsAdmin(response.data.role === "admin");
        setError("");
        console.log("Logged in successfully");
        onClose();

      } else {
        if (response.data.error) {
          setError("User do not exist.");
        }
      }

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };
  
  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      isDataProvider
        ? setUser({ ...user, role: "data_provider" })
        : setUser({ ...user, role: "prop_owner" });
      handleRegister(e);
    }
  };  

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="container" id="contact" onClick={handleContainerClick}>
        <div className="container2">
          <div className="section-title">
            <h2>{isLogin ? "Login" : "Register"}</h2>
          </div>
          <form name={isLogin ? "login" : "register"} onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required 
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
                {error && (
                  <p className="error-message" style={{color:"red"}} >Email or password incorrect.</p>
                )}
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required 
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  required 
                />
                <input
                  type="date"
                  placeholder="Bithday"
                  value={user.date_naissance} 
                  onChange={(e) => setUser({ ...user, date_naissance: e.target.value })}
                  required
                />
                <div className="checkbox-container">
                  <label>
                    <input
                      id="checkBoxProvider"
                      type="checkbox"
                      checked={isDataProvider}
                      onChange={() => setIsDataProvider(prevState => !prevState)}
                      style={{margin: "auto"}}
                    />
                    <span style={{width: "80%"}}>Are you a data provider?</span>
                  </label>
                </div>
                {error && (
                  <p className="error-message" style={{color:"red"}}>Email or username already exists</p>
                )}
              </>
            )}
            <button
              type="submit"
              className="btn btn-custom btn-lg"
              style={{ alignSelf: "auto" }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <p className="toggle-link" onClick={handleToggle}>
              {isLogin
                ? "Don't have an account? Create one now!"
                : "Already have an account? Sign in now!"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;