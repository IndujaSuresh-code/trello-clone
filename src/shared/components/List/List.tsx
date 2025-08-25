import * as React from 'react';
import { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card/Card';
import AddCardButton from './Button/AddCardButton';
import './List.scss';
import ListAction from './ListAction';
import CopyListModal from './CopyListModal';
import ArchiveAllCardsModal from './ArchiveAllCardsModal';
import { Card as CardModel } from '../../../models/Card';
import { List as ListModel } from '../../../models/List';
import { createCard, deleteCard, updateCard } from '../../../services/cardService';
import { updateList } from '../../../services/listService';

type DroppableProvidedType = {
  droppableProps: React.HTMLProps<HTMLDivElement>;
  innerRef: (element: HTMLElement | null) => void;
  placeholder: React.ReactNode;
};

interface ListProps {
  id: string;
  title: string;
  initialCards: CardModel[];
  lists: ListModel[];
  onArchiveList: (listId: string) => void;
  onCopyList: (listId: string, newName: string) => void;
  onMoveCard?: (cardId: string, sourceListId: string, targetListId: string, position: number) => void;
  onUpdateCardState: (listId: string, cardId: string, updatedCard: CardModel) => void;
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
  boardTitle,
}) => {
  const [cards, setCards] = useState<CardModel[]>(initialCards ?? []);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showArchiveAllModal, setShowArchiveAllModal] = useState(false);

  useEffect(() => {
    setCards(initialCards ?? []);
  }, [initialCards]);

  const handleUpdateListTitle = async () => {
    try {
      await updateList(id, { title: listTitle });
      setIsEditingTitle(false);
    } catch (err) {
      console.error('Error updating list title:', err);
    }
  };

  const handleAddCard = async (newTitle: string) => {
    try {
      const newCard = await createCard(id, { title: newTitle, description: '' });
      setCards((prev) => {
        const updatedCards = [...prev, newCard];
        onUpdateCardState(id, newCard.id, newCard);
        return updatedCards;
      });
    } catch (err) {
      console.error('Error adding card:', err);
    }
  };

  const handleArchiveCard = async (cardId: string) => {
    try {
      await deleteCard(id, cardId);
      setCards((prev) => prev.filter(c => c.id !== cardId));
    } catch (err) {
      console.error('Error archiving card:', err);
    }
  };

  const handleSaveCard = async (cardId: string, newText: string) => {
    try {
      const updatedCard = { ...(cards.find(c => c.id === cardId) || {}), text: newText };
      await updateCard(id, cardId, updatedCard);
      setCards((prev) => prev.map(c => c.id === cardId ? { ...c, text: newText } : c));
      onUpdateCardState(id, cardId, { ...updatedCard, text: newText } as CardModel);
    } catch (err) {
      console.error('Error saving card:', err);
    }
  };

  const handleUpdateCardState = async (cardId: string, updatedState: Partial<CardModel>) => {
    try {
      const updated = await updateCard(id, cardId, updatedState);
      setCards((prev) => prev.map(c => c.id === cardId ? updated : c));
      onUpdateCardState(id, cardId, updated);
    } catch (err) {
      console.error('Error updating card:', err);
    }
  };

  const handleArchiveAllCards = async () => {
    try {
      await Promise.all(cards.map(c => deleteCard(id, c.id)));
      setCards([]);
    } catch (err) {
      console.error('Error archiving all cards:', err);
    }
  };

  const handleMoveCard = (cardId: string, targetListId: string, position: number) => {
    onMoveCard?.(cardId, id, targetListId, position);
  };

  const handleCopyList = (newName: string) => {
    onCopyList(id, newName);
    setShowCopyModal(false);
  };

  return (
    <div className={`list-container ${isCollapsed ? 'collapsed' : ''}`} style={{ backgroundColor: '#000' }}>
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
          <h2 className="list-title" onClick={!isCollapsed ? () => setIsEditingTitle(true) : undefined}>
            {listTitle}
          </h2>
        )}
        <div className="list-header-icons">
          <img
            src="/icons/collapse.png"
            alt="collapse"
            className="collapse-icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
        {!isCollapsed && (
          <div className="list-action-container">
            {showCopyModal ? (
              <CopyListModal title={listTitle} onClose={() => setShowCopyModal(false)} onCopy={handleCopyList} />
            ) : showArchiveAllModal ? (
              <ArchiveAllCardsModal
                onClose={() => setShowArchiveAllModal(false)}
                onConfirm={() => { handleArchiveAllCards(); setShowArchiveAllModal(false); }}
              />
            ) : (
              <ListAction
                onAddCard={() => handleAddCard('New Card')}
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
          {(provided: DroppableProvidedType) => (
            <div className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
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
                  onUpdateCardState={handleUpdateCardState}
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