import React, { useState, useEffect } from 'react';
import './commentsection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faListAlt } from '@fortawesome/free-solid-svg-icons';

function CommentSectionModel({ equipment, token }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setComments(equipment.comments);
  }, [equipment]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/api/commentmodel/add-comment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          text: newComment,
          equipment_model: equipment.idequipementmodel,
        }),
      });
  
      if (response.ok) {
        const newCommentObj = await response.json();
        setComments([...comments, newCommentObj]);
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error:', error);
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
              {comment.user === undefined ?(
                <h4>{comment.username}</h4>
              ):(
                <h4>{comment.user.username}</h4>
              )}
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSectionModel;
