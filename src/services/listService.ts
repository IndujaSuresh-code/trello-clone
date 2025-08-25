import axios from "axios";
import { deserialize } from "serializr";
import { API_BASE_URL } from "../routes/api";
import { LISTS } from "../routes/endpoints";
import { List } from "../models/List";
import { Card } from "../models/Card";
import { Comment } from "../models/Comment";

// Payload interfaces
export interface NewListPayload {
  title: string;
}

export interface UpdateListPayload {
  title: string;
}

// Raw API response types
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
  isCompleted?: boolean;
  isWatching?: boolean;
  comments?: RawCommentResponse[];
}

interface RawListResponse {
  id: number | string;
  title: string;
  listColor?: string;
  cards?: RawCardResponse[];
}

// Get all lists
export const getLists = async (): Promise<List[]> => {
  const response = await axios.get<{ lists: RawListResponse[] }>(`${API_BASE_URL}/${LISTS}`);
  return response.data.lists.map((l) =>
    deserialize(List, {
      id: String(l.id),
      title: l.title,
      listColor: l.listColor || "#FFFFFF",
      cards: (l.cards || []).map((c) =>
        deserialize(Card, {
          id: String(c.id),
          text: c.title,
          description: c.description || "",
          isCompleted: c.isCompleted || false,
          isWatching: c.isWatching || false,
          comments: (c.comments || []).map((cm) =>
            deserialize(Comment, {
              id: String(cm.id),
              text: cm.add_comment,
              author: cm.author,
              time: new Date(cm.time),
            })
          ),
        })
      ),
    })
  );
};

// Get single list
export const getSingleList = async (listId: string): Promise<List> => {
  const response = await axios.get<{ list: RawListResponse }>(`${API_BASE_URL}/${LISTS}/${listId}`);
  const l = response.data.list;

  return deserialize(List, {
    id: String(l.id),
    title: l.title,
    listColor: l.listColor || "#FFFFFF",
    cards: (l.cards || []).map((c) =>
      deserialize(Card, {
        id: String(c.id),
        text: c.title,
        description: c.description || "",
        isCompleted: c.isCompleted || false,
        isWatching: c.isWatching || false,
        comments: (c.comments || []).map((cm) =>
          deserialize(Comment, {
            id: String(cm.id),
            text: cm.add_comment,
            author: cm.author,
            time: new Date(cm.time),
          })
        ),
      })
    ),
  });
};

// Create list
export const createList = async (listData: NewListPayload): Promise<List> => {
  const response = await axios.post<{ list: RawListResponse }>(`${API_BASE_URL}/${LISTS}`, { list: listData });
  const l = response.data.list;

  return deserialize(List, {
    id: String(l.id),
    title: l.title,
    listColor: l.listColor || "#FFFFFF",
    cards: [],
  });
};

// Update list
export const updateList = async (listId: string, listData: UpdateListPayload): Promise<List> => {
  const response = await axios.put<{ list: RawListResponse }>(`${API_BASE_URL}/${LISTS}/${listId}`, { list: listData });
  const l = response.data.list;

  return deserialize(List, {
    id: String(l.id),
    title: l.title,
    listColor: l.listColor || "#FFFFFF",
    cards: (l.cards || []).map((c) =>
      deserialize(Card, {
        id: String(c.id),
        text: c.title,
        description: c.description || "",
        isCompleted: c.isCompleted || false,
        isWatching: c.isWatching || false,
        comments: (c.comments || []).map((cm) =>
          deserialize(Comment, {
            id: String(cm.id),
            text: cm.add_comment,
            author: cm.author,
            time: new Date(cm.time),
          })
        ),
      })
    ),
  });
};

// Delete list
export const deleteList = async (listId: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${LISTS}/${listId}`);
};
