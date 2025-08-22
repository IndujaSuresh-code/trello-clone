import React, { useState, useEffect } from 'react';
import './DetailedCard.scss';
import CheckBox from '../CheckBox/CheckBox';
import MoveCardModal from '../MoveCardModal';
import type { ListData, Comment } from '../../../types';
<<<<<<< HEAD
import { updateCard } from '../../../services/cardService';
import { getComments, createComment, updateComment, deleteComment } from '../../../services/commentService';

interface DetailedCardProps {
  onClose: (updatedState: { description: string; comments: Comment[]; isWatching: boolean; text: string }) => void;
  onMove?: (targetListId: string, position: number) => void;
  cardId: string;
=======

interface DetailedCardProps {
  onClose: (updatedState: { description: string, comments: Comment[], isWatching: boolean }) => void;
  onMove?: (targetListId: string, position: number) => void;
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
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
<<<<<<< HEAD
  cardId,
=======
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  cardTitle,
  isCompleted,
  onToggleComplete,
  listTitle,
  currentListId,
  cardPosition,
  lists,
<<<<<<< HEAD
  boardTitle = 'My Trello board',
=======
  boardTitle = "My Trello board",
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
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

<<<<<<< HEAD
  // Sync description with initialDescription
  useEffect(() => setDescription(initialDescription), [initialDescription]);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(cardId);
        setSavedComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [cardId]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  const handleDescriptionSave = async () => {
    try {
      const updatedCard = await updateCard(currentListId, cardId, { description });
      setDescription(updatedCard.description || '');
      setIsDescriptionEditing(false);
    } catch {
      setDescription(initialDescription);
      setIsDescriptionEditing(false);
    }
=======
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
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  };

  const handleDescriptionCancel = () => {
    setDescription(initialDescription);
    setIsDescriptionEditing(false);
  };

<<<<<<< HEAD
  const handleEditDescription = () => setIsDescriptionEditing(true);
=======
  const handleEditDescription = () => {
    setIsDescriptionEditing(true);
  };
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setIsCommentEditing(e.target.value.length > 0);
  };

<<<<<<< HEAD
  const handleCommentSave = async () => {
    if (!comment.trim()) return;
    try {
      const newComment = await createComment(cardId, { text: comment });
      setSavedComments((prev) => [...prev, newComment]);
      setComment('');
      setIsCommentEditing(false);
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(cardId, commentId);
      //filter out all elements that do not match the deleted comment id
      setSavedComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
=======
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
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.text);
  };

<<<<<<< HEAD
  const handleSaveEditedComment = async (commentId: string) => {
    try {
      const updatedComment = await updateComment(cardId, commentId, { text: editedCommentText });
      setSavedComments((prev) => prev.map((c) => (c.id === commentId ? updatedComment : c)));
      setEditingCommentId(null);
      setEditedCommentText('');
    } catch (error) {
      console.error('Error saving edited comment:', error);
    }
=======
  const handleSaveEditedComment = (commentId: string) => {
    setSavedComments(savedComments.map(comment =>
      comment.id === commentId ? { ...comment, text: editedCommentText } : comment
    ));
    setEditingCommentId(null);
    setEditedCommentText('');
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText('');
  };

<<<<<<< HEAD
  const handleToggleWatch = async () => {
    try {
      const newWatchingState = !isWatching;
      await updateCard(currentListId, cardId, { isWatching: newWatchingState });
      setIsWatching(newWatchingState);
    } catch (error) {
      console.error('Error toggling watch state:', error);
    }
=======
  const handleToggleWatch = () => {
    setIsWatching(!isWatching);
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete(e);
  };

  const handleMoveCard = (targetListId: string, position: number) => {
<<<<<<< HEAD
    onMove?.(targetListId, position);
    setShowMoveModal(false);
  };

  const formatTimeAgo = (time?: string | number | Date) => {
    if (!time) return 'Just now';
    const date = new Date(time);
    if (isNaN(date.getTime())) return 'Just now';
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    const years = Math.floor(months / 12);
    return `${years} years ago`;
  };

  const handleClose = () => onClose({ description, comments: savedComments, isWatching, text: cardTitle });
=======
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
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd

  return (
    <div className="detailed-card-overlay">
      <div className="detailed-card-modal">
        <div className="detailed-card-header">
<<<<<<< HEAD
          <button className="close-button" onClick={handleClose}>✕</button>
        </div>

        <div className="detailed-card-body">
          <div className="left-panel">
            <div className="card-list-dropdown" onClick={() => setShowMoveModal(true)}>
              <span className="dropdown-title">{listTitle}</span>
              <img src="src/assets/icons/down.png" alt="dropdown arrow" className="dropdown-arrow" />
            </div>

=======
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
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
            <h2 className="card-title-modal">
              <CheckBox isCompleted={isCompleted} onClick={handleCheckboxClick} />
              {cardTitle}
            </h2>

<<<<<<< HEAD
=======
        

>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
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
<<<<<<< HEAD
                {!isDescriptionEditing && description && (
=======
                {description && !isDescriptionEditing && (
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                  <button className="edit-button" onClick={handleEditDescription}>Edit</button>
                )}
              </div>

              {isDescriptionEditing || !description ? (
                <>
                  <textarea
                    placeholder="Add a more detailed description..."
                    value={description}
                    onChange={handleDescriptionChange}
<<<<<<< HEAD
                  />
=======
                  ></textarea>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                  <div className="description-actions">
                    <button className="save-button" onClick={handleDescriptionSave}>Save</button>
                    <button className="cancel-button" onClick={handleDescriptionCancel}>Cancel</button>
                    <a href="#" className="formatting-help-link">Formatting help</a>
                  </div>
                </>
              ) : (
<<<<<<< HEAD
                <div className="saved-description" onClick={handleEditDescription}>{description}</div>
              )}
            </div>
          </div>

=======
                <div className="saved-description" onClick={handleEditDescription}>
                  {description}
                </div>
              )}
            </div>
          </div>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
          <div className="right-panel">
            <div className="comments-section">
              <div className="comments-header">
                <h3>Comments and activity</h3>
                <button className="show-details-button">Show details</button>
              </div>
<<<<<<< HEAD

=======
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
              <div className="comment-input-container">
                <textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={handleCommentChange}
<<<<<<< HEAD
                />
=======
                ></textarea>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                {isCommentEditing && (
                  <div className="comment-actions">
                    <button className="save-button" onClick={handleCommentSave}>Save</button>
                    <label>
<<<<<<< HEAD
                      <input type="checkbox" checked={isWatching} onChange={handleToggleWatch} /> Watch
=======
                      <input type="checkbox" checked={isWatching} onChange={handleToggleWatch} />
                      Watch
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                    </label>
                  </div>
                )}
              </div>

              <div className="comments-activity-scroll-container">
                <div className="activity-feed">
<<<<<<< HEAD
                  {savedComments.map((c) => (
                    <div key={c.id} className="activity-item">
                      <div className="user-avatar">I</div>
                      <div className="activity-info">
                        <div className="comment-meta">
                          <strong>{c.author || 'Unknown'}</strong>
                          <span className="activity-time">{formatTimeAgo(c.time)}</span>
                        </div>

                        {editingCommentId === c.id ? (
=======
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
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                          <>
                            <textarea
                              className="edit-comment-textarea"
                              value={editedCommentText}
                              onChange={(e) => setEditedCommentText(e.target.value)}
                            />
                            <div className="edit-comment-actions">
<<<<<<< HEAD
                              <button className="save-button" onClick={() => handleSaveEditedComment(c.id)}>Save</button>
=======
                              <button className="save-button" onClick={() => handleSaveEditedComment(savedComment.id)}>Save</button>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                              <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                          </>
                        ) : (
                          <>
<<<<<<< HEAD
                            <p className="comment-text-content">{c.text}</p>
                            <div className="comment-actions-links">
                              <button onClick={() => handleEditComment(c)}>Edit</button>
                              <span className="divider">·</span>
                              <button onClick={() => handleDeleteComment(c.id)}>Delete</button>
=======
                            <p className="comment-text-content">{savedComment.text}</p>
                            <div className="comment-actions-links">
                              <button onClick={() => handleEditComment(savedComment)}>Edit</button>
                              <span className="divider">·</span>
                              <button onClick={() => handleDeleteComment(savedComment.id)}>Delete</button>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
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
<<<<<<< HEAD
                <span className="activity-time">37 minutes ago</span>
=======
                <span className="action-time">37 minutes ago</span>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
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

<<<<<<< HEAD
export default DetailedCard;
=======
export default DetailedCard;
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
