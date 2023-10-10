import React from "react";

export const Features = (props) => {
  return (
    <div id="features" className="text-center">
      <div className="container" style={{width: "80%"}}>
        <div className="section-title">
          <h2>New Equipement</h2>
        </div>
        <div className="container">
          <div className="row">
              <div className="about-text">
                <h3 style={{marginBottom: "20px"}}>Key Equipment Attributes</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      {props.data
                        ? props.data.features1.map((d, i) => (
                            <li key={`${d}-${i}`}>{d}</li>
                          ))
                        : "loading"}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      {props.data
                        ? props.data.features2.map((d, i) => (
                            <li key={`${d}-${i}`}> {d}</li>
                          ))
                        : "loading"}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
              {" "}
              <button className="btn btn-custom btn-lg" onClick={props.onAddEquipmentClick}>
                Add New Equipment
              </button>
              </div>
          </div>
    </div>
  );
};
