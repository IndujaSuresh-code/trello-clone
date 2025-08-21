import { create } from 'zustand';
import type { ListData, CardData, Comment } from '../types';

// Define the state interface
interface TrelloState {
  lists: ListData[];
  moveCard: (sourceListId: string, destinationListId: string, sourceIndex: number, destinationIndex: number) => void;
  updateCard: (listId: string, cardId: string, updatedState: { description?: string, comments?: Comment[], isWatching?: boolean }) => void;
  addCard: (listId: string, text: string) => void;
  archiveCard: (listId: string, cardId: string) => void;
  addList: (title: string) => void;
}

// Initial state data
const initialLists: ListData[] = [
  {
    id: 'list-1',
    title: 'To Do',
    listColor: '#EB5A46',
    cards: [
      {
        id: 'card-1',
        text: 'Write a blog post about React hooks',
        isCompleted: false,
        description: 'This post should cover useState, useEffect, and useContext with practical examples.',
        comments: [
          {
            id: 'comment-1',
            text: 'Remember to include a code snippet for a custom hook!',
            author: 'You',
            time: new Date(),
          },
        ],
        isWatching: true,
      },
      {
        id: 'card-2',
        text: 'Design a new logo for the project',
        isCompleted: false,
        description: '',
        comments: [],
        isWatching: false,
      },
    ],
  },
  {
    id: 'list-2',
    title: 'In Progress',
    listColor: '#5BA4CF',
    cards: [],
  },
  {
    id: 'list-3',
    title: 'Done',
    listColor: '#51E898',
    cards: [],
  },
];

// Create the Zustand store
export const useTrelloStore = create<TrelloState>((set) => ({
  lists: initialLists,

  moveCard: (sourceListId, destinationListId, sourceIndex, destinationIndex) => {
    set((state) => {
      const newLists = [...state.lists];
      const sourceList = newLists.find(list => list.id === sourceListId);
      const destinationList = newLists.find(list => list.id === destinationListId);

      if (!sourceList || !destinationList) return state;

      const [movedCard] = sourceList.cards.splice(sourceIndex, 1);
      destinationList.cards.splice(destinationIndex, 0, movedCard);

      return { lists: newLists };
    });
  },

  updateCard: (listId, cardId, updatedState) => {
    set((state) => {
      const newLists = state.lists.map(list => {
        if (list.id === listId) {
          const updatedCards = list.cards.map(card => {
            if (card.id === cardId) {
              return { ...card, ...updatedState };
            }
            return card;
          });
          return { ...list, cards: updatedCards };
        }
        return list;
      });
      return { lists: newLists };
    });
  },

  addCard: (listId, text) => {
    set((state) => {
      const newLists = [...state.lists];
      const targetList = newLists.find(list => list.id === listId);
      if (!targetList) return state;

      const newCard: CardData = {
        id: `card-${Date.now()}`,
        text,
        isCompleted: false,
        description: '',
        comments: [],
        isWatching: false,
      };
      targetList.cards.push(newCard);
      return { lists: newLists };
    });
  },

  archiveCard: (listId, cardId) => {
    set((state) => {
      const newLists = state.lists.map(list => {
        if (list.id === listId) {
          const updatedCards = list.cards.filter(card => card.id !== cardId);
          return { ...list, cards: updatedCards };
        }
        return list;
      });
      return { lists: newLists };
    });
  },

  addList: (title) => {
    set((state) => {
      const newList: ListData = {
        id: `list-${Date.now()}`,
        title,
        listColor: '#BDC3C7',
        cards: [],
      };
      return { lists: [...state.lists, newList] };
    });
  },
}));