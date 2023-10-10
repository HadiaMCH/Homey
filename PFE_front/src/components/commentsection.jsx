import React, { useState, useEffect } from 'react';
import './commentsection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faListAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function CommentSection({ equipment, token }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setComments(equipment.comments);
  }, [equipment]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    // Make sure there's a new comment to submit
    if (!newComment.trim()) {
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/commentequipement/add_comment/',
        {
          text: newComment,
          equipement_associated: equipment.idequipement,
        },
        {
          headers: {
            'Authorization': `Token ${token}`
          }
        }
      );
  
      console.log(response.data)
      
      // Update the comments state to include the new comment
      setComments((prevComments) => [...prevComments, response.data]);
  
      // Clear the input field after successful submission
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  

  const toggleComments = () => {
    setShowComments(!showComments); // Inverser l'état d'affichage des commentaires
  };

  return (
    <div className="comment-section">
        <div className="comment-header">
            <h3>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h3>
            
            {/* Bouton pour afficher/masquer les commentaires */}
            <FontAwesomeIcon
                    className="icon"
                    icon={showComments ? faListAlt : faList}
                    onClick={toggleComments}
                />
            
        </div>

      {showComments && (
        // Afficher la liste complète des commentaires lorsque showComments est true
        <div>
          {console.log(token)}
           {token !== null ? (
            <>
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  placeholder="Type your comment here"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-custom btn-lg">
                  Post
                </button>
              </form>
            </>
          ) : null}

          {comments.map((comment) => (
            <div key={comment.id} className="comment-info">
              <h4>{comment.user_username}</h4>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
