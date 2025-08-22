import React, { useState, useEffect } from 'react';
import './DetailedCard.scss';
import CheckBox from '../CheckBox/CheckBox';
import MoveCardModal from '../MoveCardModal';
import { Card as CardModel } from '../../../models/Card';
import { Comment as CommentModel } from '../../../models/Comment';
import { List as ListModel } from '../../../models/List';
import { updateCard } from '../../../services/cardService';
import { getComments, createComment, updateComment, deleteComment } from '../../../services/commentService';
import { formatTimeAgo } from '../../../utils/time'; 

interface DetailedCardProps {
  onClose: (updatedState: Partial<CardModel>) => void;
  onMove?: (targetListId: string, position: number) => void;
  cardId: string;
  cardTitle: string;
  isCompleted: boolean;
  onToggleComplete: (e: React.MouseEvent) => void;
  listTitle: string;
  currentListId: string;
  cardPosition: number;
  lists: ListModel[];
  boardTitle?: string;
  initialDescription: string;
  initialComments: CommentModel[];
  initialIsWatching: boolean;
}

const DetailedCard: React.FC<DetailedCardProps> = ({
  onClose,
  onMove,
  cardId,
  cardTitle,
  isCompleted,
  onToggleComplete,
  listTitle,
  currentListId,
  cardPosition,
  lists,
  boardTitle = 'My Trello board',
  initialDescription,
  initialComments,
  initialIsWatching
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [comment, setComment] = useState('');
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [isWatching, setIsWatching] = useState(initialIsWatching);
  const [savedComments, setSavedComments] = useState<CommentModel[]>(initialComments);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [showMoveModal, setShowMoveModal] = useState(false);

  useEffect(() => setDescription(initialDescription), [initialDescription]);

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
  };
  const handleDescriptionCancel = () => { setDescription(initialDescription); setIsDescriptionEditing(false); };
  const handleEditDescription = () => setIsDescriptionEditing(true);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setIsCommentEditing(e.target.value.length > 0);
  };
  const handleCommentSave = async () => {
    if (!comment.trim()) return;
    try {
      const newComment = await createComment(cardId, { text: comment });
      setSavedComments((prev) => [...prev, newComment]);
      setComment('');
      setIsCommentEditing(false);
    } catch (error) { console.error('Error saving comment:', error); }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(cardId, commentId);
      setSavedComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) { console.error('Error deleting comment:', error); }
  };

  const handleEditComment = (c: CommentModel) => { setEditingCommentId(c.id); setEditedCommentText(c.text); };
  const handleSaveEditedComment = async (commentId: string) => {
    try {
      const updatedComment = await updateComment(cardId, commentId, { text: editedCommentText });
      setSavedComments((prev) => prev.map((c) => (c.id === commentId ? updatedComment : c)));
      setEditingCommentId(null);
      setEditedCommentText('');
    } catch (error) { console.error('Error saving edited comment:', error); }
  };
  const handleCancelEdit = () => { setEditingCommentId(null); setEditedCommentText(''); };
  const handleToggleWatch = async () => { try { const newState = !isWatching; await updateCard(currentListId, cardId, { isWatching: newState }); setIsWatching(newState); } catch (error) { console.error(error); } };
  const handleCheckboxClick = (e: React.MouseEvent) => { e.stopPropagation(); onToggleComplete(e); };
  const handleMoveCard = (targetListId: string, position: number) => { onMove?.(targetListId, position); setShowMoveModal(false); };
  const handleClose = () => onClose({ description, comments: savedComments, isWatching, text: cardTitle });

  return (
    <div className="detailed-card-overlay">
      <div className="detailed-card-modal">
        {/* Header */}
        <div className="detailed-card-header">
          <button className="close-button" onClick={handleClose}>✕</button>
        </div>
        {/* Body */}
        <div className="detailed-card-body">
          <div className="left-panel">
            <div className="card-list-dropdown" onClick={() => setShowMoveModal(true)}>
              <span className="dropdown-title">{listTitle}</span>
              <img src="src/assets/icons/down.png" alt="dropdown arrow" className="dropdown-arrow" />
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
                {!isDescriptionEditing && description && <button className="edit-button" onClick={handleEditDescription}>Edit</button>}
              </div>

              {isDescriptionEditing || !description ? (
                <>
                  <textarea
                    placeholder="Add a more detailed description..."
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <div className="description-actions">
                    <button className="save-button" onClick={handleDescriptionSave}>Save</button>
                    <button className="cancel-button" onClick={handleDescriptionCancel}>Cancel</button>
                    <a href="#" className="formatting-help-link">Formatting help</a>
                  </div>
                </>
              ) : (
                <div className="saved-description" onClick={handleEditDescription}>{description}</div>
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
                <textarea placeholder="Write a comment..." value={comment} onChange={handleCommentChange} />
                {isCommentEditing && (
                  <div className="comment-actions">
                    <button className="save-button" onClick={handleCommentSave}>Save</button>
                    <label>
                      <input type="checkbox" checked={isWatching} onChange={handleToggleWatch} /> Watch
                    </label>
                  </div>
                )}
              </div>

              <div className="comments-activity-scroll-container">
                <div className="activity-feed">
                  {savedComments.map((c) => (
                    <div key={c.id} className="activity-item">
                      <div className="user-avatar">I</div>
                      <div className="activity-info">
                        <div className="comment-meta">
                          <strong>{c.author || 'Unknown'}</strong>
                          <span className="activity-time">{formatTimeAgo(c.time)}</span>
                        </div>

                        {editingCommentId === c.id ? (
                          <>
                            <textarea
                              className="edit-comment-textarea"
                              value={editedCommentText}
                              onChange={(e) => setEditedCommentText(e.target.value)}
                            />
                            <div className="edit-comment-actions">
                              <button className="save-button" onClick={() => handleSaveEditedComment(c.id)}>Save</button>
                              <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="comment-text-content">{c.text}</p>
                            <div className="comment-actions-links">
                              <button onClick={() => handleEditComment(c)}>Edit</button>
                              <span className="divider">·</span>
                              <button onClick={() => handleDeleteComment(c.id)}>Delete</button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
