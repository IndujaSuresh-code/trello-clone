import axios from "axios";
import { deserialize } from "serializr";
import { API_BASE_URL } from "../routes/api";
import { COMMENTS } from "../routes/endpoints";
import { Comment } from "../models/Comment";

export interface NewCommentPayload {
  text: string;
}

export interface UpdateCommentPayload {
  text: string;
}

// Raw API response shape
interface RawCommentResponse {
  id: number | string;
  add_comment: string;
  author: string;
  time: string;
}

export const createComment = async (cardId: string, commentData: NewCommentPayload): Promise<Comment> => {
  const response = await axios.post<{ comment: RawCommentResponse }>(
    `${API_BASE_URL}/${COMMENTS}/${cardId}/comment`,
    { comment: { add_comment: commentData.text } }
  );
  const cm = response.data.comment;

  return deserialize(Comment, {
    id: String(cm.id),
    text: cm.add_comment,
    author: cm.author || "Unknown",
    time: cm.time ? new Date(cm.time) : new Date(),
  });
};

export const getComments = async (cardId: string): Promise<Comment[]> => {
  const response = await axios.get<{ comments: RawCommentResponse[] }>(`${API_BASE_URL}/${COMMENTS}/${cardId}/comment`);
  const rawComments = response.data.comments;

  return rawComments.map((cm) =>
    deserialize(Comment, {
      id: String(cm.id),
      text: cm.add_comment,
      author: cm.author || "Unknown",
      time: cm.time ? new Date(cm.time) : new Date(),
    })
  );
};

export const updateComment = async (
  cardId: string,
  commentId: string,
  commentData: UpdateCommentPayload
): Promise<Comment> => {
  const response = await axios.put<{ comment: RawCommentResponse }>(
    `${API_BASE_URL}/${COMMENTS}/${cardId}/comment/${commentId}`,
    { comment: { add_comment: commentData.text } }
  );
  const cm = response.data.comment;

  return deserialize(Comment, {
    id: String(commentId),
    text: cm.add_comment,
    author: cm.author || "Unknown",
    time: cm.time ? new Date(cm.time) : new Date(),
  });
};

export const deleteComment = async (cardId: string, commentId: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${COMMENTS}/${cardId}/comment/${commentId}`);
};
