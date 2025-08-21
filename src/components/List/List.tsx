import React, { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card/Card';
import AddCardButton from './Button/AddCardButton';
import './List.scss';
import ListAction from './ListAction';
import CopyListModal from './CopyListModal';
import ArchiveAllCardsModal from './ArchiveAllCardsModal';
import type { Comment, CardData, ListData } from '../../types'; // Type-only import

interface ListProps {
  id: string;
  title: string;
  initialCards: CardData[];
  listColor: string;
  lists: ListData[];
  onArchiveList: (listId: string) => void;
  onCopyList: (listId: string, newName: string) => void;
  onMoveCard?: (cardId: string, sourceListId: string, targetListId: string, position: number) => void;
  boardTitle?: string;
}

const List: React.FC<ListProps> = ({ 
  id, 
  title, 
  initialCards, 
  listColor,
  lists,
  onArchiveList, 
  onCopyList,
  onMoveCard,
  boardTitle
}) => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showArchiveAllModal, setShowArchiveAllModal] = useState(false);

  // Sync cards with initialCards for drag-and-drop updates
  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setListTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddCard = (newTitle: string) => {
    const newCard: CardData = {
      id: `card-${Date.now()}`,
      text: newTitle,
      isCompleted: false,
      description: '', 
      comments: [],
      isWatching: false,
    };
    setCards([...cards, newCard]);
  };

  const handleArchiveCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleUpdateCardState = (cardId: string, updatedState: { text?: string, description?: string, comments?: Comment[], isWatching?: boolean }) => {
    setCards(cards.map(card =>
      card.id === cardId ? {
        ...card,
        ...updatedState,
      } : card
    ));
  };

  const handleMoveCard = (cardId: string, targetListId: string, position: number) => {
    if (onMoveCard) {
      onMoveCard(cardId, id, targetListId, position);
    }
  };
  
  const handleArchiveAllCards = () => {
    setCards([]);
  };

  const handleShowCopyModal = () => {
    setShowCopyModal(true);
  };

  const handleCopyList = (newName: string) => {
    onCopyList(id, newName);
    setShowCopyModal(false);
  };

  const handleCloseCopyModal = () => {
    setShowCopyModal(false);
  };

  const handleShowArchiveAllModal = () => {
    setShowArchiveAllModal(true);
  };

  const handleConfirmArchiveAllCards = () => {
    handleArchiveAllCards();
    setShowArchiveAllModal(false);
  };

  const handleCloseArchiveAllModal = () => {
    setShowArchiveAllModal(false);
  };

  return (
    <div
      className={`list-container ${isCollapsed ? 'collapsed' : ''}`}
      style={{ backgroundColor: listColor }}
    >
      <div className="list-header">
        {isEditingTitle && !isCollapsed ? (
          <textarea
            className="list-title-textarea"
            value={listTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <h2 className="list-title" onClick={!isCollapsed ? handleTitleClick : undefined}>
            {listTitle}
          </h2>
        )}

        <div className="list-header-icons">
          <img
            src="src/assets/icons/collapse.png"
            alt="collapse"
            className="collapse-icon"
            onClick={handleCollapseClick}
          />
        </div>

        {!isCollapsed && (
          <div className="list-action-container">
            {showCopyModal ? (
              <CopyListModal
                title={listTitle}
                onClose={handleCloseCopyModal}
                onCopy={handleCopyList}
              />
            ) : showArchiveAllModal ? (
              <ArchiveAllCardsModal
                onClose={handleCloseArchiveAllModal}
                onConfirm={handleConfirmArchiveAllCards}
              />
            ) : (
              <ListAction 
                onAddCard={() => handleAddCard("New Card")}
                onCopyList={handleShowCopyModal}
                onArchiveList={() => onArchiveList(id)}
                onArchiveAllCards={handleShowArchiveAllModal}
              />
            )}
          </div>
        )}
      </div>

      {!isCollapsed && (
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              className="card-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  id={card.id}
                  index={index}
                  text={card.text}
                  listTitle={listTitle}
                  currentListId={id}
                  lists={lists}
                  onArchive={handleArchiveCard}
                  onSave={(cardId, newText) => handleUpdateCardState(cardId, { text: newText })}
                  onMove={handleMoveCard}
                  hasDescription={card.description.length > 0} 
                  description={card.description} 
                  comments={card.comments}
                  isWatching={card.isWatching}
                  onUpdateCardState={(updatedState) => handleUpdateCardState(card.id, updatedState)}
                  boardTitle={boardTitle}
                />
              ))}
              {provided.placeholder}
              <AddCardButton onAddCard={handleAddCard} />
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default List;