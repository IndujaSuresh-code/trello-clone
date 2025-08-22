//The useState hook allows you to add state to a functional component. 
//State is data that changes over time and affects the rendering of the component. 
//The useEffect handles side effects .A side effect is anything that affects something outside the component's scope, 
//like fetching data from an API
import React, { useState, useEffect } from 'react';
//useEffect - run code when something changes
import { Draggable } from 'react-beautiful-dnd';
import CheckBox from '../CheckBox/CheckBox';
import EditCardButton from '../Button/EditCardButton';
import SaveButton from '../Button/SaveButton';
import CloseButton from '../Button/CloseButton';
import './Card.scss';
import DetailedCard from './DetailedCard';
import type { ListData, Comment } from '../../../types';
import { updateCard } from '../../../services/cardService';
interface CardProps {
  id: string;
  index: number;
  text: string;
  listTitle: string;
  currentListId: string;
  lists: ListData[];//needed for moving cards between lists
  onArchive: (cardId: string) => void;
  onSave: (id: string, newText: string) => void; //callback when user saves an edit
  onMove?: (cardId: string, targetListId: string, position: number) => void;
  hasDescription: boolean;
  description: string;
  comments: Comment[];
  isWatching: boolean;
  onUpdateCardState: (//callback to sync state when detailed view changes something
    cardId: string,
    updatedState: { description?: string; comments?: Comment[]; isWatching?: boolean; text?: string }
  ) => void;
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
  comments = [],
  isWatching,
  onUpdateCardState,
  boardTitle,
}) => {
  //state variables
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [tooltip, setTooltip] = useState('');
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  //run when comments or id changes
  useEffect(() => {
    console.log(`Card ${id} comments:`, comments);
  }, [comments, id]);

  useEffect(() => {
    setEditedText(text ?? '');
  }, [text]);

  //Opens detailed view unless you’re editing
  const handleCardClick = () => {
    if (!isEditing) setIsDetailedViewOpen(true);
  };

  const handleCloseDetailedView = (updatedState: {
    description: string;
    comments: Comment[];
    isWatching: boolean;
    text: string;
  }) => {
    console.log('Card: Received updated state from DetailedCard:', updatedState);
    //update and close
    onUpdateCardState(id, updatedState);
    setIsDetailedViewOpen(false);
  };

  const handleMoveCard = (targetListId: string, position: number) => {
    if (onMove) onMove(id, targetListId, position);
    setIsDetailedViewOpen(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    //prevent an event from bubbling up the DOM tree
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveClick = async (e: React.MouseEvent) => {
    //when i click save , the detailed view should not open
    e.stopPropagation();
    //This handler returns a Promise<void> because it awaits an async 
    //operation (saving to backend)
    try {
      await updateCard(currentListId, id, { text: editedText }); //backend update
      onSave(id, editedText); //notify parent of change
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedText(text ?? '');
    setIsEditing(false);
  };

  const handleCheckboxClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      //await ensures you don’t update UI until the server confirms
      await updateCard(currentListId, id, { isCompleted: !isCompleted });
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error('Error updating card completion state:', error);
    }
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArchive(id);
  };

  const showTooltip = (message: string) => {
    setTooltip(message);
    setIsTooltipVisible(true);
  };
  const hideTooltip = () => setIsTooltipVisible(false);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        //outer div = draggable container. It enables DnD functionality.
        <div
          className="card-wrapper"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
          //add checkbox when its clicked and enable diting
            className={`card ${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
            onClick={handleCardClick}
          >
            {!isEditing ? (
              <>
                <CheckBox onClick={handleCheckboxClick} isCompleted={isCompleted} />
                <p className="card-text">{editedText}</p>
                <div className="card-actions">
                  <EditCardButton onClick={handleEditClick} />
                </div>

                {(hasDescription || comments.length > 0 || isWatching) && (
                  <div className="card-icons-container">
                    {isWatching && (
                      <div
                        className="card-icon"
                        onMouseEnter={() => showTooltip('You are watching this card.')}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-eye">
                          <img src="src/assets/icons/watch.png" alt="watch" />
                        </span>
                      </div>
                    )}
                    {hasDescription && (
                      <div
                        className="card-icon"
                        onMouseEnter={() => showTooltip('This card has a description.')}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-desc">
                          <img src="src/assets/icons/description.png" alt="description" />
                        </span>
                      </div>
                    )}
                    {comments.length > 0 && (
                      <div
                        className="card-icon"
                        onMouseEnter={() => showTooltip('Comments')}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-comment">
                          <img src="src/assets/icons/comment.png" alt="comment" />
                        </span>
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
                  <CloseButton onClose={handleCancelClick} />
                </div>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="edit-card-menu">
              <button
                onClick={() => {
                  setIsDetailedViewOpen(true);
                  setIsEditing(false);
                }}
              >
                Open card
              </button>
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
              cardId={id}
              cardTitle={editedText}
              isCompleted={isCompleted}
              onToggleComplete={handleCheckboxClick}
              listTitle={listTitle}
              currentListId={currentListId}
              cardPosition={index}
              lists={lists}
              boardTitle={boardTitle || 'My Trello board'}
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