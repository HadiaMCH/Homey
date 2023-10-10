import React, { useState } from "react";
import { Image } from "./image";
import CommentSectionModel from "./commentsectionmodel";
import "./gallery.css";

export const Gallery = (props) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  // Filter the equipment data based on the search keyword
  const filteredData = props.data
    ? props.data.filter(
        (d) =>
          d.type.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          d.make.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          d.model.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          d.usagepatterns.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          d.locations.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div id="gallery" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Equipment Models gallery</h2>
          <p>Discover a comprehensive range of equipment models available for failure prediction in our offerings.</p>
        </div>
        {filteredData.length > 0 ? (
        <div className="search-bar" style={{ marginRight: "5%",marginLeft: "5%"}}>
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>):(
          null
        )}
        <div className="row" style={{ marginRight: "2%",marginLeft: "2%"}}>
          <div className="portfolio-items" style={{marginLeft:"10%",marginRight:"10%"}} >
            {filteredData.length > 0 ? ( 
              filteredData.slice(startIndex, endIndex).map((d, i) => (
                <div key={`${d.type}-${i}`} className="col-sm-6 col-md-4 col-lg-4" style={{width:"27%",marginLeft:"3%",marginRight:"3%"}}> 
                  <Image equipment={d} onOpenModal={props.onOpenModal} />
                  <CommentSectionModel equipment={d} token={props.token}/>
                </div>
              ))
            ) : ( 
              <p>No equipment found.</p>
            )}
          </div>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};