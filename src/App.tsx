import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import NavbarTop from "./components/Navbar/NavbarTop";
import NavbarBottom from "./components/Navbar/NavbarBottom";
import DownTab from "./components/DownTab/DownTab";
import List from "./components/List/List";
import AddAnotherList from "./components/List/AddAnotherList";
import "./App.css";

import { List as ListModel } from "./models/List";
import { Card as CardModel } from "./models/Card";

import { getLists, createList, deleteList} from "./services/listService";
import type{ NewListPayload } from "./services/listService";

import { getCards, createCard, deleteCard } from "./services/cardService";
import { createComment } from "./services/commentService";
//Payload = the data you send to the backend in a request.
//only include the fields you want to update.
import type{ NewCommentPayload } from "./services/commentService";

function App() {
  const [lists, setLists] = useState<ListModel[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const listsData = await getLists();
        //Promise.all() is a static method in JavaScript that takes an iterable of promises (like an array) as input and returns a single new promise.
        // This new promise fulfills when all of the input promises have successfully fulfilled, or it rejects as soon as any of the input promises have rejected.
        const listsWithCards = await Promise.all(
          listsData.map(async (list) => {
            const cardsData = await getCards(list.id);
            return { ...list, cards: cardsData };
          })
        );
        setLists(listsWithCards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllData();
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const listToUpdate = lists.find((list) => list.id === source.droppableId);
      if (!listToUpdate) return;

      const newCards = [...listToUpdate.cards];
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);

      setLists(
        lists.map((list) =>
          list.id === source.droppableId ? { ...list, cards: newCards } : list
        )
      );
    } else {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find((list) => list.id === destination.droppableId);
      if (!sourceList || !destinationList) return;

      const newSourceCards = [...sourceList.cards];
      const newDestinationCards = [...destinationList.cards];
      const [movedCard] = newSourceCards.splice(source.index, 1);
      newDestinationCards.splice(destination.index, 0, movedCard);

      setLists(
        lists.map((list) => {
          if (list.id === source.droppableId) return { ...list, cards: newSourceCards };
          if (list.id === destination.droppableId) return { ...list, cards: newDestinationCards };
          return list;
        })
      );
    }
  };

  const handleMoveCard = async (
    cardId: string,
    sourceListId: string,
    targetListId: string,
    position: number
  ) => {
    const sourceList = lists.find((list) => list.id === sourceListId);
    const targetList = lists.find((list) => list.id === targetListId);
    if (!sourceList || !targetList) return;

    const cardToMove = sourceList.cards.find((card) => card.id === cardId);
    if (!cardToMove) return;

    try {
      const newCard = await createCard(targetList.id, {
        title: cardToMove.text,
        description: cardToMove.description || "",
      });

      if (cardToMove.comments.length > 0) {
        await Promise.all(
          cardToMove.comments.map(async (comment) => {
            const payload: NewCommentPayload = { text: comment.text };
            await createComment(newCard.id, payload);
          })
        );
      }

      await deleteCard(sourceListId, cardId);

      const newSourceCards = sourceList.cards.filter((card) => card.id !== cardId);
      const newTargetCards = [...targetList.cards];
      newTargetCards.splice(position, 0, { ...cardToMove, id: newCard.id });

      setLists(
        lists.map((list) => {
          if (list.id === sourceListId) return { ...list, cards: newSourceCards };
          if (list.id === targetListId) return { ...list, cards: newTargetCards };
          return list;
        })
      );
    } catch (error) {
      console.error("Error moving card:", error);
    }
  };

  const handleAddList = async () => {
    try {
      const payload: NewListPayload = { title: "New List" };
      const createdList = await createList(payload);
      setLists([...lists, createdList]);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleArchiveList = async (listId: string) => {
    try {
      await deleteList(listId);
      setLists(lists.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Error archiving list:", error);
    }
  };

  const handleCopyList = async (listId: string, newName: string) => {
    const listToCopy = lists.find((list) => list.id === listId);
    if (!listToCopy) return;

    try {
      const newList = await createList({ title: newName });
      const copiedCards = await Promise.all(
        listToCopy.cards.map((card) =>
          createCard(newList.id, { title: card.text, description: card.description })
        )
      );

      setLists([...lists, { ...newList, cards: copiedCards }]);
    } catch (error) {
      console.error("Error copying list:", error);
    }
  };

  const handleUpdateCard = (listId: string, cardId: string, updatedCard: CardModel) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.some((card) => card.id === cardId)
                ? list.cards.map((card) => (card.id === cardId ? updatedCard : card))
                : [...list.cards, updatedCard],
            }
          : list
      )
    );
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
              onUpdateCardState={handleUpdateCard}
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
