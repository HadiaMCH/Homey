import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { UserGallery } from "./components/usergallery";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import { Features } from "./components/features";
import JsonData from "./data/data.json";
import LoginModal from "./components/loginmodal";
import EquipmentModal from "./components/equipmentmodal";
import UserEquipmentModal from "./components/userequipmentmodal";
import AddEquipmentModal from "./components/addequipementmodal"; 
import ProfileModal from "./components/profilemodal";
import { ChatProvider } from './components/chatprovider';
import ChatContainer from './components/chatcontainer';
import {FeaturesModel} from './components/featuresmodel';
import AddEquipmentModelModal from './components/addequipementmodelmodal';

import "./App.css";
import axios from "axios";

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 
  const [token, setToken] = useState(null);
  const [isDataProvider, setIsDataProvider] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [usermodalData, setUserModalData] = useState(null);
  const [isAddEquipmentModalOpen, setIsAddEquipmentModalOpen] = useState(false);
  const [isAddEquipmentModelModalOpen, setIsAddEquipmentModelModalOpen] = useState(false);
 
  const [isYourGallery, setIsYourGallery] = useState(true);

  useEffect(() => {
    setLandingPageData(JsonData);

    // Fetch equipment data from the backend
    axios.get("http://localhost:8000/api/equipementmodel/getequipementmodellist/")
      .then(response => {
        const equipmentData = response.data;
        console.log(response.data)
        setLandingPageData(prevData => {
          return { ...prevData, Gallery: equipmentData };
      });
      })
      .catch(error => {
        console.error("Error fetching equipment data:", error);
      });  
      
    // Fetch feedback from the backend
    axios.get("http://localhost:8000/api/feedback/recent-selected-feedback/")
      .then(response => {
        setLandingPageData(prevData => {
          return { ...prevData, Testimonials: response.data };
      });
      })
      .catch(error => {
        console.error("Error fetching equipment data:", error);
      });  
  }, []);

const handleUserLogout = () => {

  axios.post('http://localhost:8000/api/authentication/logout/',
      {},{
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log('Logout successful');
        setToken(null);        
      } else {
        console.error('Logout failed');
      }
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
};


  const handleOpenModal = (equipmentmodel) => {
    setModalData(equipmentmodel);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  const handleOpenUserModal = (equipment) => {
    setUserModalData(equipment);
  };

  const handleCloseUserModal = () => {
    setUserModalData(null);
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleAddEquipmentClick = () => {
    setIsAddEquipmentModalOpen(true);
  };

  const handleCloseAddEquipmentModal = () => {
    setIsAddEquipmentModalOpen(false);
  };

  const handleAddEquipmentModelClick = () => {
    setIsAddEquipmentModelModalOpen(true);
  };

  const handleCloseAddEquipmentModelModal = () => {
    setIsAddEquipmentModelModalOpen(false);
  };

  return (
      <div>
        <Navigation
          token={token}
          onSignInClick={() => setIsLoginModalOpen(true)}
          onLogoutClick={handleUserLogout}
          onProfileClick={handleOpenProfileModal}
          isAdmin={isAdmin}
          setIsYourGallery={setIsYourGallery}
        />
        {!isAdmin ? (
          token!==null  ? (
            <>    
              <div className="container-global">
                <div className="col-xs-12 col-md-9 element-container">
                  {isYourGallery ? (
                    <>
                    <UserGallery token={token} 
                      onOpenUserModal={handleOpenUserModal} 
                      isDataProvider={isDataProvider}
                      setLandingPageData={setLandingPageData}
                      />

                    <Features token={token} data={landingPageData.Features} onAddEquipmentClick={handleAddEquipmentClick} />
                    <Contact data={landingPageData.Contact} token={token} />
                    </>
                  ):(
                    <>
                      <Gallery data={landingPageData.Gallery} onOpenModal={handleOpenModal} token={token}/>
                      
                      {isDataProvider ? (
                        <FeaturesModel token={token} 
                        data={landingPageData.FeaturesModel} 
                        onAddEquipmentModelClick={handleAddEquipmentModelClick}  
                        />
                      ) : (
                        null
                      )}

                      <Contact data={landingPageData.Contact} token={token} />

                    </>
                  )}
                      
                      
                </div>
                <div className="col-xs-12 col-md-3 chat-container" style={{paddingLeft:"0px", paddingRight:"0px", 
                paddingTop:'80px', position: 'fixed', top: 0, right: 0, bottom: 0 }}>
                  <ChatProvider>  
                    <ChatContainer token={token}/>
                  </ChatProvider>
                </div>
              </div>
            </>
          ) : (
            <>
              <Header data={landingPageData.Header} onSignInClick={() => setIsLoginModalOpen(true)} />
              <About data={landingPageData.About} />
              <Services data={landingPageData.Services} />
              <Gallery data={landingPageData.Gallery} onOpenModal={handleOpenModal} token={token}/>
              <Testimonials data={landingPageData.Testimonials} />
            </>
          )
        ):(
          null   
        )}
        
        {isLoginModalOpen && (
          <LoginModal
            onClose={() => setIsLoginModalOpen(false)}
            setToken={setToken}
            isDataProvider={isDataProvider}
            setIsDataProvider={setIsDataProvider}
            setIsAdmin={setIsAdmin}
          />
        )}

        {isProfileModalOpen && (
          <ProfileModal
            onClose={handleCloseProfileModal}
            token={token}
            isDataProvider={isDataProvider}
            setIsDataProvider={setIsDataProvider}
          />
        )}

        <EquipmentModal
          isOpen={modalData !== null}
          onClose={handleCloseModal}
          modalData={modalData}
          token={token}
          isDataProvider={isDataProvider}
        />

        <UserEquipmentModal
          isOpen={usermodalData !== null}
          onClose={handleCloseUserModal}
          usermodalData={usermodalData}
          setUserModalData={setUserModalData}
          token={token}
          setLandingPageData={setLandingPageData}
        />

        <AddEquipmentModal 
          isOpen={isAddEquipmentModalOpen} 
          onClose={handleCloseAddEquipmentModal}
          token={token}
          data={landingPageData.Gallery}
          setLandingPageData={setLandingPageData}/>

        <AddEquipmentModelModal 
          isOpen={isAddEquipmentModelModalOpen} 
          onClose={handleCloseAddEquipmentModelModal}
          isDataProvider={isDataProvider}
          token={token}/>

      </div>
  );
};

export default App;