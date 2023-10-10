import React from "react";

export const Header = (props) => {
  const { onSignInClick } = props;

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#signin"
                  className="btn btn-custom btn-lg page-scroll"
                  onClick={onSignInClick} // Open login modal on click
                >
                  Get started
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
