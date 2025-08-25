import axios from "axios";
//converts plain JS objects from the API into typed models (Card and Comment)
import { deserialize } from "serializr";
import { API_BASE_URL } from "../routes/api";
import { CARDS } from "../routes/endpoints";
import { Card } from "../models/Card";
import { Comment } from "../models/Comment";

// Raw API response shapes
interface RawCommentResponse {
  id: number | string;
  add_comment: string;
  author: string;
  time: string;
}

interface RawCardResponse {
  id: number | string;
  title: string;
  description?: string;
  comments?: RawCommentResponse[];
  isWatching?: boolean;
  isCompleted?: boolean;
}

//Partial - all fields are optional.
//Only allows text, description, isWatching, isCompleted to be updated.
export type UpdateCardPayload = Partial<Pick<Card, "text" | "description" | "isWatching" | "isCompleted">>;

export const createCard = async (
  listId: string,
  cardData: { title: string; description: string }
  //await pauses execution until the Promise resolves.
  //newCard will then contain the actual Card object.
): Promise<Card> => {
  const response = await axios.post<{ card: RawCardResponse }>(
    `${API_BASE_URL}/${CARDS}/${listId}/card`,
    { card: cardData }
  );

  const c = response.data.card;

  return deserialize(Card, {
    id: String(c.id),
    text: c.title,
    description: c.description || cardData.description || "",
    comments: [],
    isWatching: false,
    isCompleted: false,
  });
};

export const getCards = async (listId: string): Promise<Card[]> => {
  const response = await axios.get<{ cards: RawCardResponse[] }>(`${API_BASE_URL}/${CARDS}/${listId}/card`);
  const rawCards = response.data.cards;

  return rawCards.map((c) =>
    deserialize(Card, {
      id: String(c.id),
      text: c.title,
      description: c.description || "",
      comments: (c.comments || []).map((cm) =>
        deserialize(Comment, {
          id: String(cm.id),
          text: cm.add_comment,
          author: cm.author,
          time: new Date(cm.time),
        })
      ),
      isWatching: c.isWatching || false,
      isCompleted: c.isCompleted || false,
    })
  );
};

export const getSingleCard = async (listId: string, cardId: string): Promise<Card> => {
  const response = await axios.get<{ card: RawCardResponse }>(`${API_BASE_URL}/${CARDS}/${listId}/card/${cardId}`);
  const c = response.data.card;

  return deserialize(Card, {
    id: String(c.id),
    text: c.title,
    description: c.description || "",
    comments: (c.comments || []).map((cm) =>
      deserialize(Comment, {
        id: String(cm.id),
        text: cm.add_comment,
        author: cm.author,
        time: new Date(cm.time),
      })
    ),
    isWatching: c.isWatching || false,
    isCompleted: c.isCompleted || false,
  });
};

export const updateCard = async (
  listId: string,
  cardId: string,
  updateData: UpdateCardPayload
): Promise<Card> => {
  const apiData: Partial<{ title: string; description?: string; isCompleted?: boolean; isWatching?: boolean }> = {
    ...updateData,
  };
  if (updateData.text !== undefined) apiData.title = updateData.text;

  const response = await axios.put<{ card: RawCardResponse }>(
    `${API_BASE_URL}/${CARDS}/${listId}/card/${cardId}`,
    { card: apiData }
  );

  const c = response.data.card;

  return deserialize(Card, {
    id: String(c.id),
    text: c.title || updateData.text || "",
    description: c.description || updateData.description || "",
    comments: (c.comments || []).map((cm) =>
      deserialize(Comment, {
        id: String(cm.id),
        text: cm.add_comment,
        author: cm.author,
        time: new Date(cm.time),
      })
    ),
    isWatching: c.isWatching || false,
    isCompleted: c.isCompleted || false,
  });
};

export const deleteCard = async (listId: string, cardId: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${CARDS}/${listId}/card/${cardId}`);
};
