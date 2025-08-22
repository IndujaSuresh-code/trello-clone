<<<<<<< HEAD
//The useState hook allows you to add state to a functional component. 
//State is data that changes over time and affects the rendering of the component. 
//The useEffect handles side effects .A side effect is anything that affects something outside the component's scope, 
//like fetching data from an API
import React, { useState, useEffect } from 'react';
//useEffect - run code when something changes
=======
import React, { useState } from 'react';
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
import { Draggable } from 'react-beautiful-dnd';
import CheckBox from '../CheckBox/CheckBox';
import EditCardButton from '../Button/EditCardButton';
import SaveButton from '../Button/SaveButton';
import CloseButton from '../Button/CloseButton';
import './Card.scss';
import DetailedCard from './DetailedCard';
<<<<<<< HEAD
import type { ListData, Comment } from '../../../types';
import { updateCard } from '../../../services/cardService';
=======
import type { ListData, Comment } from '../../../types';// Import shared types

>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
interface CardProps {
  id: string;
  index: number;
  text: string;
  listTitle: string;
  currentListId: string;
<<<<<<< HEAD
  lists: ListData[];//needed for moving cards between lists
  onArchive: (cardId: string) => void;
  onSave: (id: string, newText: string) => void; //callback when user saves an edit
=======
  lists: ListData[];
  onArchive: (id: string) => void;
  onSave: (id: string, newText: string) => void;
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  onMove?: (cardId: string, targetListId: string, position: number) => void;
  hasDescription: boolean;
  description: string;
  comments: Comment[];
  isWatching: boolean;
<<<<<<< HEAD
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
=======
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
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  onSave,
  onMove,
  hasDescription,
  description,
<<<<<<< HEAD
  comments = [],
  isWatching,
  onUpdateCardState,
  boardTitle,
}) => {
  //state variables
=======
  comments,
  isWatching,
  onUpdateCardState,
  boardTitle
}) => {
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [tooltip, setTooltip] = useState('');
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

<<<<<<< HEAD
  //run when comments or id changes
  useEffect(() => {
    console.log(`Card ${id} comments:`, comments);
  }, [comments, id]);

  useEffect(() => {
    setEditedText(text ?? '');
  }, [text]);

  //Opens detailed view unless you’re editing
=======
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  const handleCardClick = () => {
    if (!isEditing) setIsDetailedViewOpen(true);
  };

<<<<<<< HEAD
  const handleCloseDetailedView = (updatedState: {
    description: string;
    comments: Comment[];
    isWatching: boolean;
    text: string;
  }) => {
    console.log('Card: Received updated state from DetailedCard:', updatedState);
    //update and close
    onUpdateCardState(id, updatedState);
=======
  const handleCloseDetailedView = (updatedState: { description: string, comments: Comment[], isWatching: boolean }) => {
    onUpdateCardState({
      description: updatedState.description,
      comments: updatedState.comments,
      isWatching: updatedState.isWatching,
    });
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
    setIsDetailedViewOpen(false);
  };

  const handleMoveCard = (targetListId: string, position: number) => {
<<<<<<< HEAD
    if (onMove) onMove(id, targetListId, position);
=======
    if (onMove) {
      onMove(id, targetListId, position);
    }
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
    setIsDetailedViewOpen(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
<<<<<<< HEAD
    //prevent an event from bubbling up the DOM tree
=======
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
    e.stopPropagation();
    setIsEditing(true);
  };

<<<<<<< HEAD
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
=======
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave(id, editedText);
    setIsEditing(false);
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
<<<<<<< HEAD
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
=======
    setEditedText(text);
    setIsEditing(false);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArchive(id);
  };

  const showTooltip = (message: string) => {
    setTooltip(message);
    setIsTooltipVisible(true);
  };
<<<<<<< HEAD
  const hideTooltip = () => setIsTooltipVisible(false);
=======

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
<<<<<<< HEAD
        //outer div = draggable container. It enables DnD functionality.
=======
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
        <div
          className="card-wrapper"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
<<<<<<< HEAD
          //add checkbox when its clicked and enable diting
=======
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
            className={`card ${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
            onClick={handleCardClick}
          >
            {!isEditing ? (
              <>
                <CheckBox onClick={handleCheckboxClick} isCompleted={isCompleted} />
<<<<<<< HEAD
                <p className="card-text">{editedText}</p>
                <div className="card-actions">
                  <EditCardButton onClick={handleEditClick} />
                </div>

=======
                <p className="card-text">{text}</p>
                <div className="card-actions">
                  <EditCardButton onClick={handleEditClick} />
                </div>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                {(hasDescription || comments.length > 0 || isWatching) && (
                  <div className="card-icons-container">
                    {isWatching && (
                      <div
                        className="card-icon"
<<<<<<< HEAD
                        onMouseEnter={() => showTooltip('You are watching this card.')}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-eye">
                          <img src="src/assets/icons/watch.png" alt="watch" />
                        </span>
=======
                        onMouseEnter={() => showTooltip("You are watching this card.")}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-eye"><img src="src/assets/icons/watch.png" alt="watch" /></span>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                      </div>
                    )}
                    {hasDescription && (
                      <div
                        className="card-icon"
<<<<<<< HEAD
                        onMouseEnter={() => showTooltip('This card has a description.')}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-desc">
                          <img src="src/assets/icons/description.png" alt="description" />
                        </span>
=======
                        onMouseEnter={() => showTooltip("This card has a description.")}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-desc"><img src="src/assets/icons/description.png" alt="description" /></span>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                      </div>
                    )}
                    {comments.length > 0 && (
                      <div
                        className="card-icon"
<<<<<<< HEAD
                        onMouseEnter={() => showTooltip('Comments')}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-comment">
                          <img src="src/assets/icons/comment.png" alt="comment" />
                        </span>
=======
                        onMouseEnter={() => showTooltip("Comments")}
                        onMouseLeave={hideTooltip}
                      >
                        <span className="icon-comment"><img src="src/assets/icons/comment.png" alt="comment" /></span>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
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
<<<<<<< HEAD
                  <CloseButton onClose={handleCancelClick} />
=======
                  <CloseButton onClose={handleCancelClick} /> {/* Fixed prop name */}
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
                </div>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="edit-card-menu">
<<<<<<< HEAD
              <button
                onClick={() => {
                  setIsDetailedViewOpen(true);
                  setIsEditing(false);
                }}
              >
                Open card
              </button>
=======
              <button onClick={() => { setIsDetailedViewOpen(true); setIsEditing(false); }}>Open card</button>
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
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
<<<<<<< HEAD
            <DetailedCard
              onClose={handleCloseDetailedView}
              onMove={handleMoveCard}
              cardId={id}
              cardTitle={editedText}
=======
            <DetailedCard 
              onClose={handleCloseDetailedView}
              onMove={handleMoveCard}
              cardTitle={text}
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
              isCompleted={isCompleted}
              onToggleComplete={handleCheckboxClick}
              listTitle={listTitle}
              currentListId={currentListId}
              cardPosition={index}
              lists={lists}
<<<<<<< HEAD
              boardTitle={boardTitle || 'My Trello board'}
=======
              boardTitle={boardTitle || "My Trello board"}
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
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