import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CheckBox from '../CheckBox/CheckBox';
import EditCardButton from '../Button/EditCardButton';
import SaveButton from '../Button/SaveButton';
import CloseButton from '../Button/CloseButton';
import './Card.scss';
import DetailedCard from './DetailedCard';
import type { ListData, Comment } from '../../../types';// Import shared types

interface CardProps {
  id: string;
  index: number;
  text: string;
  listTitle: string;
  currentListId: string;
  lists: ListData[];
  onArchive: (id: string) => void;
  onSave: (id: string, newText: string) => void;
  onMove?: (cardId: string, targetListId: string, position: number) => void;
  hasDescription: boolean;
  description: string;
  comments: Comment[];
  isWatching: boolean;
  onUpdateCardState: (updatedState: { description?: string, comments?: Comment[], isWatching?: boolean }) => void;
  boardTitle?: string;
}

const Card: React.FC<CardProps> = ({ 
  id, 
  index, 
  text, 
  listTitle,
  currentListId,
  lists,
  onArchive, 
  onSave,
  onMove,
  hasDescription,
  description,
  comments,
  isWatching,
  onUpdateCardState,
  boardTitle
}) => {
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [tooltip, setTooltip] = useState('');
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleCardClick = () => {
    if (!isEditing) setIsDetailedViewOpen(true);
  };

  const handleCloseDetailedView = (updatedState: { description: string, comments: Comment[], isWatching: boolean }) => {
    onUpdateCardState({
      description: updatedState.description,
      comments: updatedState.comments,
      isWatching: updatedState.isWatching,
    });
    setIsDetailedViewOpen(false);
  };

  const handleMoveCard = (targetListId: string, position: number) => {
    if (onMove) {
      onMove(id, targetListId, position);
    }
    setIsDetailedViewOpen(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave(id, editedText);
    setIsEditing(false);
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedText(text);
    setIsEditing(false);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArchive(id);
  };

  const showTooltip = (message: string) => {
    setTooltip(message);
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="card-wrapper"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`card ${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
            onClick={handleCardClick}
          >
            {!isEditing ? (
              <>
                <CheckBox onClick={handleCheckboxClick} isCompleted={isCompleted} />
                <p className="card-text">{text}</p>
                <div className="card-actions">
                  <EditCardButton onClick={handleEditClick} />
                </div>
                {(hasDescription || comments.length > 0 || isWatching) && (
                  <div className="card-icons-container">
                    {isWatching && (
                      <div
                        className="card-icon"
                        onMouseEnter={() => showTooltip("You are watching this card.")}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-eye"><img src="src/assets/icons/watch.png" alt="watch" /></span>
                      </div>
                    )}
                    {hasDescription && (
                      <div
                        className="card-icon"
                        onMouseEnter={() => showTooltip("This card has a description.")}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-desc"><img src="src/assets/icons/description.png" alt="description" /></span>
                      </div>
                    )}
                    {comments.length > 0 && (
                      <div
                        className="card-icon"
                        onMouseEnter={() => showTooltip("Comments")}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-comment"><img src="src/assets/icons/comment.png" alt="comment" /></span>
                        <span className="comment-count">{comments.length}</span>
                      </div>
                    )}
                    {isTooltipVisible && <div className="tooltip">{tooltip}</div>}
                  </div>
                )}
              </>
            ) : (
              <div className="card-content-editing">
                <textarea
                  className="card-text-input"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  autoFocus
                />
                <div className="card-edit-buttons">
                  <SaveButton onClick={handleSaveClick} />
                  <CloseButton onClose={handleCancelClick} /> {/* Fixed prop name */}
                </div>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="edit-card-menu">
              <button onClick={() => { setIsDetailedViewOpen(true); setIsEditing(false); }}>Open card</button>
              <button>Edit labels</button>
              <button>Change members</button>
              <button>Change cover</button>
              <button>Edit dates</button>
              <button>Move</button>
              <button>Copy card</button>
              <button>Copy link</button>
              <button>Mirror</button>
              <button onClick={handleArchiveClick}>Archive</button>
            </div>
          )}

          {isDetailedViewOpen && (
            <DetailedCard 
              onClose={handleCloseDetailedView}
              onMove={handleMoveCard}
              cardTitle={text}
              isCompleted={isCompleted}
              onToggleComplete={handleCheckboxClick}
              listTitle={listTitle}
              currentListId={currentListId}
              cardPosition={index}
              lists={lists}
              boardTitle={boardTitle || "My Trello board"}
              initialDescription={description}
              initialComments={comments}
              initialIsWatching={isWatching}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;