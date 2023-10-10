import { useState } from "react";
import React from "react";
import axios from "axios";

export const Contact = (props) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const clearState = () => setMessage("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let formData = {
      text: message,
    };
  
    const config = {
      headers: {
        'Authorization': `Token ${props.token}`,
      }
    };
  
    axios.post("http://localhost:8000/api/feedback/add/", formData, config)
      .then(
        (response) => {
          console.log(response.data);
          clearState();
        },
        (error) => {
          console.log(error);
        }
      );
  };
  

  return (
    <div>
      <div id="contact">
        <div className="container" style={{width: "80%"}}>
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Send Your Feedback</h2>
                <p>
                  Please provide your feedback below. We appreciate your input and will use it to improve our services. Thank you!
                </p>
              </div>
              <form name="sentMessage" onSubmit={handleSubmit}>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required 
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button className="btn btn-custom btn-lg" onClick={handleSubmit}>
                  Send Feedback
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
