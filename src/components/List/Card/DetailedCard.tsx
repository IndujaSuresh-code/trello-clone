import React, { useState, useEffect } from 'react';
import './DetailedCard.scss';
import CheckBox from '../CheckBox/CheckBox';
import MoveCardModal from '../MoveCardModal';
import type { ListData, Comment } from '../../../types';

interface DetailedCardProps {
  onClose: (updatedState: { description: string, comments: Comment[], isWatching: boolean }) => void;
  onMove?: (targetListId: string, position: number) => void;
  cardTitle: string;
  isCompleted: boolean;
  onToggleComplete: (e: React.MouseEvent) => void;
  listTitle: string;
  currentListId: string;
  cardPosition: number;
  lists: ListData[];
  boardTitle?: string;
  initialDescription: string;
  initialComments: Comment[];
  initialIsWatching: boolean;
}

const DetailedCard: React.FC<DetailedCardProps> = ({
  onClose,
  onMove,
  cardTitle,
  isCompleted,
  onToggleComplete,
  listTitle,
  currentListId,
  cardPosition,
  lists,
  boardTitle = "My Trello board",
  initialDescription,
  initialComments,
  initialIsWatching
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [comment, setComment] = useState('');
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [isWatching, setIsWatching] = useState(initialIsWatching);
  const [savedComments, setSavedComments] = useState<Comment[]>(initialComments);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [showMoveModal, setShowMoveModal] = useState(false);

  useEffect(() => {
    setDescription(initialDescription);
    setSavedComments(initialComments);
    setIsWatching(initialIsWatching);
  }, [initialDescription, initialComments, initialIsWatching]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDescriptionSave = () => {
    setIsDescriptionEditing(false);
  };

  const handleDescriptionCancel = () => {
    setDescription(initialDescription);
    setIsDescriptionEditing(false);
  };

  const handleEditDescription = () => {
    setIsDescriptionEditing(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setIsCommentEditing(e.target.value.length > 0);
  };

  const handleCommentSave = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: Date.now().toString(),
        text: comment,
        author: '22PW20 - INDUJA S',
        time: new Date(),
      };
      setSavedComments([...savedComments, newComment]);
      setComment('');
      setIsCommentEditing(false);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    setSavedComments(savedComments.filter(comment => comment.id !== commentId));
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.text);
  };

  const handleSaveEditedComment = (commentId: string) => {
    setSavedComments(savedComments.map(comment =>
      comment.id === commentId ? { ...comment, text: editedCommentText } : comment
    ));
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleToggleWatch = () => {
    setIsWatching(!isWatching);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete(e);
  };

  const handleMoveCard = (targetListId: string, position: number) => {
    if (onMove) {
      onMove(targetListId, position);
    }
    setShowMoveModal(false);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const handleClose = () => {
    onClose({
      description: description,
      comments: savedComments,
      isWatching: isWatching,
    });
  };

  return (
    <div className="detailed-card-overlay">
      <div className="detailed-card-modal">
        <div className="detailed-card-header">
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
        </div>
        <div className="detailed-card-body">
          <div className="left-panel">
            {/* NEW DROPDOWN FOR MOVING THE CARD */}
            <div className="card-list-dropdown" onClick={() => setShowMoveModal(true)}>
              <span className="dropdown-title">
                {listTitle}
              </span>
              <img 
                src="src/assets/icons/down.png" 
                alt="dropdown arrow" 
                className="dropdown-arrow" 
              />
            </div>
            <h2 className="card-title-modal">
              <CheckBox isCompleted={isCompleted} onClick={handleCheckboxClick} />
              {cardTitle}
            </h2>

        

            <div className="card-options">
              <button>+ Add</button>
              <button>Labels</button>
              <button>Dates</button>
              <button>Checklist</button>
              <button>Members</button>
            </div>

            <div className="card-description">
              <div className="description-header">
                <h3>Description</h3>
                {description && !isDescriptionEditing && (
                  <button className="edit-button" onClick={handleEditDescription}>Edit</button>
                )}
              </div>

              {isDescriptionEditing || !description ? (
                <>
                  <textarea
                    placeholder="Add a more detailed description..."
                    value={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                  <div className="description-actions">
                    <button className="save-button" onClick={handleDescriptionSave}>Save</button>
                    <button className="cancel-button" onClick={handleDescriptionCancel}>Cancel</button>
                    <a href="#" className="formatting-help-link">Formatting help</a>
                  </div>
                </>
              ) : (
                <div className="saved-description" onClick={handleEditDescription}>
                  {description}
                </div>
              )}
            </div>
          </div>
          <div className="right-panel">
            <div className="comments-section">
              <div className="comments-header">
                <h3>Comments and activity</h3>
                <button className="show-details-button">Show details</button>
              </div>
              <div className="comment-input-container">
                <textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
                {isCommentEditing && (
                  <div className="comment-actions">
                    <button className="save-button" onClick={handleCommentSave}>Save</button>
                    <label>
                      <input type="checkbox" checked={isWatching} onChange={handleToggleWatch} />
                      Watch
                    </label>
                  </div>
                )}
              </div>

              <div className="comments-activity-scroll-container">
                <div className="activity-feed">
                  {savedComments.map((savedComment) => (
                    <div key={savedComment.id} className="activity-item">
                      <div className="user-avatar">I</div>
                      <div className="activity-info">
                        <div className="comment-meta">
                          <span className="comment-author">
                            <strong>{savedComment.author}</strong>
                          </span>
                          <span className="activity-time">{formatTimeAgo(savedComment.time)}</span>
                        </div>

                        {editingCommentId === savedComment.id ? (
                          <>
                            <textarea
                              className="edit-comment-textarea"
                              value={editedCommentText}
                              onChange={(e) => setEditedCommentText(e.target.value)}
                            />
                            <div className="edit-comment-actions">
                              <button className="save-button" onClick={() => handleSaveEditedComment(savedComment.id)}>Save</button>
                              <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="comment-text-content">{savedComment.text}</p>
                            <div className="comment-actions-links">
                              <button onClick={() => handleEditComment(savedComment)}>Edit</button>
                              <span className="divider">·</span>
                              <button onClick={() => handleDeleteComment(savedComment.id)}>Delete</button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-action-log">
                <span className="action-text">
                  <strong>22PW20 - INDUJA S</strong> added this card to <strong>{listTitle}</strong>
                </span>
                <span className="action-time">37 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMoveModal && (
        <MoveCardModal
          isOpen={showMoveModal}
          onClose={() => setShowMoveModal(false)}
          onMove={handleMoveCard}
          currentListId={currentListId}
          currentListTitle={listTitle}
          currentPosition={cardPosition + 1}
          lists={lists}
          boardTitle={boardTitle}
        />
      )}
    </div>
  );
};

export default DetailedCard;