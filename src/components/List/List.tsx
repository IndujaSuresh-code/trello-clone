import React, { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card/Card';
import AddCardButton from './Button/AddCardButton';
import './List.scss';
import ListAction from './ListAction';
import CopyListModal from './CopyListModal';
import ArchiveAllCardsModal from './ArchiveAllCardsModal';
import type { Comment, CardData, ListData } from '../../types';
import {createCard, deleteCard,updateCard } from "../../services/cardService";
import { updateList } from "../../services/listService";

interface ListProps {
  id: string;
  title: string;
  initialCards: CardData[];
  listColor: string;
  lists: ListData[];
  onArchiveList: (listId: string) => void;
  onCopyList: (listId: string, newName: string) => void;
  onMoveCard?: (cardId: string, sourceListId: string, targetListId: string, position: number) => void;
  onUpdateCardState: (listId: string, cardId: string, updatedCard: CardData) => void; // Added prop
  boardTitle?: string;
}

const List: React.FC<ListProps> = ({ 
  id, 
  title, 
  initialCards, 
  lists,
  onArchiveList, 
  onCopyList,
  onMoveCard,
  onUpdateCardState,
  boardTitle
}) => {
  const [cards, setCards] = useState<CardData[]>(initialCards ?? []);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showArchiveAllModal, setShowArchiveAllModal] = useState(false);

  // Sync cards with initialCards when they change
  useEffect(() => {
    setCards(initialCards ?? []);
  }, [initialCards]);

  const handleUpdateListTitle = async () => {
    try {
      await updateList(id, { title: listTitle });
      setIsEditingTitle(false);
    } catch (err) {
      console.error("Error updating list title:", err);
    }
  };

  const handleAddCard = async (newTitle: string) => {
  try {
    const newCard = await createCard(id, { title: newTitle, description: "" });
    // Update local cards state
    setCards((prev) => {
      const updatedCards = [...prev, newCard];
      // Immediately notify parent with the updated cards
      onUpdateCardState(id, newCard.id, newCard);
      return updatedCards;
    });
  } catch (err) {
    console.error("Error adding card:", err);
  }
};

  const handleArchiveCard = async (cardId: string) => {
    try {
      await deleteCard(id, cardId);
      setCards((prev) => prev.filter(card => card.id !== cardId));
    } catch (err) {
      console.error("Error archiving card:", err);
    }
  };

  const handleSaveCard = (cardId: string, newText: string) => {
    setCards((prev) =>
      prev.map(card => card.id === cardId ? { ...card, text: newText } : card)
    );
    // Find the updated card and notify parent
    const updatedCard = cards.find(card => card.id === cardId);
    if (updatedCard) {
      onUpdateCardState(id, cardId, { ...updatedCard, text: newText });
    }
  };

  const handleUpdateCardState = async (
    cardId: string, 
    updatedState: { description?: string; comments?: Comment[]; isWatching?: boolean; text?: string }
  ) => {
    try {
      const updated = await updateCard(id, cardId, updatedState);
      setCards((prev) =>
        prev.map(card => card.id === cardId ? updated : card)
      );
      // Notify parent App component of the update
      onUpdateCardState(id, cardId, updated);
    } catch (err) {
      console.error("Error updating card:", err);
    }
  };

  const handleArchiveAllCards = async () => {
    try {
      await Promise.all(cards.map(card => deleteCard(id, card.id)));
      setCards([]);
    } catch (err) {
      console.error("Error archiving all cards:", err);
    }
  };

  const handleMoveCard = (cardId: string, targetListId: string, position: number) => {
    if (onMoveCard) {
      onMoveCard(cardId, id, targetListId, position);
    }
  };

  const handleCopyList = (newName: string) => {
    onCopyList(id, newName);
    setShowCopyModal(false);
  };

  return (
   <div
  className={`list-container ${isCollapsed ? 'collapsed' : ''}`}
  style={{ backgroundColor: '#000000' }}
>

      <div className="list-header">
        {isEditingTitle && !isCollapsed ? (
          <textarea
            className="list-title-textarea"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            onBlur={handleUpdateListTitle}
            autoFocus
          />
        ) : (
          <h2
            className="list-title"
            onClick={!isCollapsed ? () => setIsEditingTitle(true) : undefined}
          >
            {listTitle}
          </h2>
        )}
        <div className="list-header-icons">
          <img
            src="src/assets/icons/collapse.png"
            alt="collapse"
            className="collapse-icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
        {!isCollapsed && (
          <div className="list-action-container">
            {showCopyModal ? (
              <CopyListModal
                title={listTitle}
                onClose={() => setShowCopyModal(false)}
                onCopy={handleCopyList}
              />
            ) : showArchiveAllModal ? (
              <ArchiveAllCardsModal
                onClose={() => setShowArchiveAllModal(false)}
                onConfirm={() => {
                  handleArchiveAllCards();
                  setShowArchiveAllModal(false);
                }}
              />
            ) : (
              <ListAction 
                onAddCard={() => handleAddCard("New Card")}
                onCopyList={() => setShowCopyModal(true)}
                onArchiveList={() => onArchiveList(id)}
                onArchiveAllCards={() => setShowArchiveAllModal(true)}
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
                  onSave={handleSaveCard}
                  onMove={handleMoveCard}
                  hasDescription={!!card.description}
                  description={card.description}
                  comments={card.comments || []}
                  isWatching={card.isWatching || false}
                  onUpdateCardState={(cardId, updatedState) =>
                    handleUpdateCardState(cardId, updatedState)
                  }
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