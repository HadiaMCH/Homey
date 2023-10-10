import React from "react";

export const Navigation = (props) => {
  const { token, onSignInClick, onLogoutClick,onProfileClick,isAdmin,setIsYourGallery} = props;

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand page-scroll" href="#page-top">
            Homey
          </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            {token!==null ? (
              isAdmin ? (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="#" className="page-scroll">
                      User state transition
                    </a>
                  </li>
                  <li>
                    <a href="#" className="page-scroll">
                      Adding Models
                    </a>
                  </li>
                  <li>
                    <a href="#" className="page-scroll">
                     Adding Data
                    </a>
                  </li>
                  <li>
                    <a href="#news" className="page-scroll">
                      
                    </a>
                  </li>
                  <li>
                    <a href="#logout" className="page-scroll" onClick={onLogoutClick}>
                      Log Out
                    </a>
                  </li>
                </ul>
              ):(
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <a href="#profile" className="page-scroll" onClick={onProfileClick}>
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="#yourgallery" className="page-scroll" onClick={() => setIsYourGallery(true)}>
                        Your gallery
                      </a>
                    </li>
                    <li>
                      <a href="#gallery" className="page-scroll" onClick={() => setIsYourGallery(false)}>
                        Models Gallery
                      </a>
                    </li>
                    <li>
                      <a href="#logout" className="page-scroll" onClick={onLogoutClick}>
                        Log Out
                      </a>
                    </li>
                  </ul>
              )
              ) : (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="#about" className="page-scroll">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="page-scroll">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#gallery" className="page-scroll">
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a href="" className="page-scroll">
                      
                    </a>
                  </li>
                  <li>
                    <a href="#signin" className="page-scroll" onClick={onSignInClick}>
                      Sign In
                    </a>
                  </li>
                </ul>
              )}
            
            </div>
          </div>
        </nav>
  );
};