import React, { useState, useEffect } from "react";
import { UserImage } from "./userimage";
import CommentSection from "./commentsection";
import axios from "axios";

export const UserGallery = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userEquipments, setUserEquipments] = useState([]);
  const itemsPerPage = 6; // Number of items to display per page
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = props.token;  
        const response = await axios.get('http://localhost:8000/api/equipement/equipement-list/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log(response.data)
        setUserEquipments(response.data);
        props.setLandingPageData(prevData => {
            return { ...prevData, UserGallery: response.data };
        });
      } catch (error) {
        console.error('Error fetching user equipments:', error);
      }
    };

    fetchData();
  }, []);


  const totalPages = Math.ceil(userEquipments.length / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div id="yourgallery" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Your equipments gallery</h2>
          <p>
            Explore Your diverse equipment gallery, featuring a wide array of
            advanced machinery for failure prediction
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items" style={{ marginRight:"15%",marginLeft:"15%"}}>
            {userEquipments.length > 0 ? (
              userEquipments.slice(startIndex, endIndex).map((d, i) => (
                <div key={`${d.type}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                  <UserImage equipment={d} onOpenUserModal={props.onOpenUserModal} />
                  <CommentSection equipment={d} token={props.token}/>
                </div>
              ))
            ) : (
              <p>No equipment found.</p>
            )}
          </div>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
