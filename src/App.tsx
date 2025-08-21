// App.tsx
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd'; // Type-only import
import NavbarTop from './components/Navbar/NavbarTop';
import NavbarBottom from './components/Navbar/NavbarBottom';
import DownTab from './components/DownTab/DownTab';
import List from './components/List/List';
import AddAnotherList from './components/List/AddAnotherList';
import './App.css';
import type {ListData } from './types'; // Type-only import for shared types

function App() {
  const [lists, setLists] = useState<ListData[]>([
    {
      id: 'list-1',
      title: 'k',
      listColor: '#000',
      cards: [
        { id: 'card-1', text: 'Start using Trello', isCompleted: false, description: '', comments: [], isWatching: false },
        { id: 'card-2', text: 'hi', isCompleted: true, description: '', comments: [], isWatching: false },
        { id: 'card-3', text: 'kk', isCompleted: false, description: '', comments: [], isWatching: false },
      ],
    },
    {
      id: 'list-2',
      title: 'This Week',
      listColor: '#000',
      cards: [],
    },
    {
      id: 'list-3',
      title: 'Later',
      listColor: '#000',
      cards: [],
    },
  ]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      const listToUpdate = lists.find(list => list.id === source.droppableId);
      if (listToUpdate) {
        const newCards = [...listToUpdate.cards];
        const [removed] = newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, removed);
        
        setLists(lists.map(list => 
          list.id === source.droppableId ? { ...list, cards: newCards } : list
        ));
      }
    } else {
      // Moving between different lists
      const sourceList = lists.find(list => list.id === source.droppableId);
      const destinationList = lists.find(list => list.id === destination.droppableId);
      
      if (sourceList && destinationList) {
        const newSourceCards = [...sourceList.cards];
        const newDestinationCards = [...destinationList.cards];
        const [movedCard] = newSourceCards.splice(source.index, 1);
        newDestinationCards.splice(destination.index, 0, movedCard);

        setLists(lists.map(list => {
          if (list.id === source.droppableId) {
            return { ...list, cards: newSourceCards };
          }
          if (list.id === destination.droppableId) {
            return { ...list, cards: newDestinationCards };
          }
          return list;
        }));
      }
    }
  };

  const handleMoveCard = (cardId: string, sourceListId: string, targetListId: string, position: number) => {
    const sourceList = lists.find(list => list.id === sourceListId);
    const targetList = lists.find(list => list.id === targetListId);
    
    if (!sourceList || !targetList) return;

    // Find the card to move
    const cardToMove = sourceList.cards.find(card => card.id === cardId);
    if (!cardToMove) return;

    // Remove card from source list
    const newSourceCards = sourceList.cards.filter(card => card.id !== cardId);
    
    // Add card to target list at specified position
    const newTargetCards = [...targetList.cards];
    newTargetCards.splice(position, 0, cardToMove);

    // Update the lists state
    setLists(lists.map(list => {
      if (list.id === sourceListId) {
        return { ...list, cards: newSourceCards };
      }
      if (list.id === targetListId) {
        return { ...list, cards: newTargetCards };
      }
      return list;
    }));
  };

  const handleAddList = () => {
    const newList: ListData = {
      id: `list-${Date.now()}`,
      title: 'New List',
      listColor: '#000',
      cards: [],
    };
    setLists([...lists, newList]);
  };

  const handleArchiveList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const handleCopyList = (listId: string, newName: string) => {
    const listToCopy = lists.find(list => list.id === listId);
    if (listToCopy) {
      const copiedList: ListData = {
        id: `list-${Date.now()}`,
        title: newName,
        listColor: listToCopy.listColor,
        cards: listToCopy.cards.map(card => ({ ...card, id: `card-${Date.now()}-${Math.random()}` })),
      };
      setLists([...lists, copiedList]);
    }
  };

  return (
    <div className="app-container">
      <NavbarTop />
      <NavbarBottom />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container">
          {lists.map((list) => (
            <List 
              key={list.id} 
              id={list.id} 
              title={list.title} 
              initialCards={list.cards} 
              listColor={list.listColor}
              lists={lists}
              onArchiveList={handleArchiveList}
              onCopyList={handleCopyList}
              onMoveCard={handleMoveCard}
              boardTitle="My Trello board"
            />
          ))}
          <AddAnotherList onAddList={handleAddList} />
        </div>
      </DragDropContext>
      <DownTab />
    </div>
  );
}

export default App;